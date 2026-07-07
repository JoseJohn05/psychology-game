interface Player {
  id: string
  username: string
  score: number
  status: 'idle' | 'playing' | 'waiting' | 'finished'
  avatar?: string
}

interface GameRoom {
  id: string
  name: string
  gameType: 'cognitive' | 'memory' | 'emotional' | 'pattern' | 'battle-royale'
  players: Player[]
  maxPlayers: number
  status: 'waiting' | 'in-progress' | 'finished'
  createdAt: Date
  startedAt?: Date
  endedAt?: Date
}

interface GameChallenge {
  id: string
  type: string
  question: string
  options: string[]
  timeLimit: number
}

interface PlayerAnswer {
  playerId: string
  answer: number
  timeTaken: number
  score: number
}

class MultiplayerService {
  private rooms: Map<string, GameRoom> = new Map()
  private currentRoom: GameRoom | null = null
  private websocket: WebSocket | null = null
  private messageHandlers: Map<string, Function> = new Map()

  generateRoomId(): string {
    return `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  createRoom(name: string, gameType: GameRoom['gameType'], maxPlayers: number = 4): GameRoom {
    const room: GameRoom = {
      id: this.generateRoomId(),
      name,
      gameType,
      players: [],
      maxPlayers,
      status: 'waiting',
      createdAt: new Date(),
    }

    this.rooms.set(room.id, room)
    this.currentRoom = room
    return room
  }

  joinRoom(roomId: string, player: Player): GameRoom | null {
    const room = this.rooms.get(roomId)
    if (!room || room.players.length >= room.maxPlayers) {
      return null
    }

    room.players.push(player)
    this.currentRoom = room
    return room
  }

  leaveRoom(roomId: string, playerId: string): boolean {
    const room = this.rooms.get(roomId)
    if (!room) return false

    room.players = room.players.filter((p) => p.id !== playerId)
    if (room.players.length === 0) {
      this.rooms.delete(roomId)
    }
    return true
  }

  startGame(roomId: string): boolean {
    const room = this.rooms.get(roomId)
    if (!room || room.players.length < 2) {
      return false
    }

    room.status = 'in-progress'
    room.startedAt = new Date()
    room.players.forEach((p) => (p.status = 'playing'))
    return true
  }

  submitAnswer(roomId: string, answer: PlayerAnswer): void {
    const room = this.rooms.get(roomId)
    if (!room) return

    const player = room.players.find((p) => p.id === answer.playerId)
    if (player) {
      player.score += answer.score
    }
  }

  endGame(roomId: string): GameRoom | null {
    const room = this.rooms.get(roomId)
    if (!room) return null

    room.status = 'finished'
    room.endedAt = new Date()
    room.players.forEach((p) => (p.status = 'finished'))
    return room
  }

  getRoomLeaderboard(roomId: string): Player[] {
    const room = this.rooms.get(roomId)
    if (!room) return []

    return [...room.players].sort((a, b) => b.score - a.score)
  }

  getRooms(gameType?: GameRoom['gameType']): GameRoom[] {
    const rooms = Array.from(this.rooms.values())
    if (gameType) {
      return rooms.filter((r) => r.gameType === gameType && r.status === 'waiting')
    }
    return rooms.filter((r) => r.status === 'waiting')
  }

  getCurrentRoom(): GameRoom | null {
    return this.currentRoom
  }

  connectWebSocket(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.websocket = new WebSocket(url)
        this.websocket.onopen = () => resolve()
        this.websocket.onmessage = (event) => this.handleMessage(event.data)
        this.websocket.onerror = () => reject(new Error('WebSocket connection failed'))
      } catch (error) {
        reject(error)
      }
    })
  }

  sendMessage(type: string, payload: any): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({ type, payload }))
    }
  }

  onMessage(type: string, handler: Function): void {
    this.messageHandlers.set(type, handler)
  }

  private handleMessage(data: string): void {
    try {
      const { type, payload } = JSON.parse(data)
      const handler = this.messageHandlers.get(type)
      if (handler) {
        handler(payload)
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error)
    }
  }

  disconnect(): void {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
    }
  }
}

export default new MultiplayerService()
export type { Player, GameRoom, GameChallenge, PlayerAnswer }
