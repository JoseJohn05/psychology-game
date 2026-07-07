import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import multiplayerService, { GameRoom, Player } from '../services/multiplayer'

const MultiplayerLobby = () => {
  const navigate = useNavigate()
  const [availableRooms, setAvailableRooms] = useState<GameRoom[]>([])
  const [gameType, setGameType] = useState<GameRoom['gameType']>('cognitive')
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    loadRooms()
  }, [gameType])

  const loadRooms = () => {
    const rooms = multiplayerService.getRooms(gameType)
    setAvailableRooms(rooms)
  }

  const handleCreateRoom = () => {
    if (!roomName.trim() || !playerName.trim()) return

    const room = multiplayerService.createRoom(roomName, gameType, 4)
    const player: Player = {
      id: `player-${Date.now()}`,
      username: playerName,
      score: 0,
      status: 'idle',
    }

    multiplayerService.joinRoom(room.id, player)
    navigate(`/multiplayer/room/${room.id}`)
  }

  const handleJoinRoom = (roomId: string) => {
    if (!playerName.trim()) {
      alert('Please enter your player name')
      return
    }

    const player: Player = {
      id: `player-${Date.now()}`,
      username: playerName,
      score: 0,
      status: 'idle',
    }

    const room = multiplayerService.joinRoom(roomId, player)
    if (room) {
      navigate(`/multiplayer/room/${roomId}`)
    } else {
      alert('Cannot join this room')
    }
  }

  const gameTypes = [
    { id: 'cognitive', label: '🧠 Cognitive', icon: '🧠' },
    { id: 'memory', label: '🏛️ Memory', icon: '🏛️' },
    { id: 'emotional', label: '💬 EQ', icon: '💬' },
    { id: 'pattern', label: '🔍 Pattern', icon: '🔍' },
    { id: 'battle-royale', label: '⚔️ Battle Royale', icon: '⚔️' },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-white mb-4">🎮 Multiplayer Mode</h1>
          <p className="text-xl text-white opacity-90">Challenge other players worldwide</p>
        </motion.div>

        {/* Player Name Input */}
        <motion.div
          className="glass p-6 rounded-2xl text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            type="text"
            placeholder="Enter your player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </motion.div>

        {/* Game Type Selection */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {gameTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setGameType(type.id as GameRoom['gameType'])
              }}
              className={`p-4 rounded-xl font-bold transition-all ${
                gameType === type.id
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-xs">{type.label}</div>
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Available Rooms */}
          <div className="md:col-span-2">
            <motion.h2 className="text-2xl font-bold text-white mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              📋 Available Rooms
            </motion.h2>
            <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    className="glass p-6 rounded-xl text-white hover:scale-105 transition-all cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleJoinRoom(room.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{room.name}</h3>
                        <p className="text-sm opacity-75">Created {new Date(room.createdAt).toLocaleTimeString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold bg-green-500 bg-opacity-30 px-3 py-1 rounded-full">
                          {room.players.length}/{room.maxPlayers}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {room.players.map((player) => (
                        <span key={player.id} className="text-xs bg-white bg-opacity-10 px-2 py-1 rounded">
                          {player.username}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div className="glass p-8 rounded-xl text-center text-white opacity-75" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-lg mb-4">No rooms available for this game type</p>
                  <p className="text-sm">Create a new room to get started!</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Create Room */}
          <motion.div className="glass p-6 rounded-2xl text-white h-fit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl font-bold mb-4">🆕 Create Room</h3>
            <input
              type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
            />
            <button
              onClick={handleCreateRoom}
              disabled={!roomName.trim() || !playerName.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create & Join
            </button>
            <p className="text-xs opacity-75 mt-4 text-center">
              Max 4 players per room. First player to reach 100 points wins!
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <button onClick={() => navigate('/')} className="btn-secondary">
            ← Back to Main Menu
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default MultiplayerLobby
