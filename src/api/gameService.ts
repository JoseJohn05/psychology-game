import apiClient from './client'
import { CognitiveQuestion, MemoryObject, EmotionScenario, PatternChallenge } from '../types/game'

export interface GameLevel {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  description: string
  requiredScore: number
  rewards: number
  challenges: number
}

export interface GameSession {
  id: string
  playerId: string
  gameType: string
  level: number
  difficulty: string
  startTime: Date
  endTime?: Date
  score: number
  accuracy: number
  completed: boolean
}

class GameService {
  async getCognitiveChallenges(level: number): Promise<CognitiveQuestion[]> {
    const response = await apiClient.get<CognitiveQuestion[]>('/games/cognitive', {
      params: { level },
    })
    return response.data
  }

  async getMemoryChallenges(level: number): Promise<MemoryObject[]> {
    const response = await apiClient.get<MemoryObject[]>('/games/memory', {
      params: { level },
    })
    return response.data
  }

  async getEmotionalScenarios(level: number): Promise<EmotionScenario[]> {
    const response = await apiClient.get<EmotionScenario[]>('/games/emotional', {
      params: { level },
    })
    return response.data
  }

  async getPatternChallenges(level: number): Promise<PatternChallenge[]> {
    const response = await apiClient.get<PatternChallenge[]>('/games/pattern', {
      params: { level },
    })
    return response.data
  }

  async getGameLevels(gameType: string): Promise<GameLevel[]> {
    const response = await apiClient.get<GameLevel[]>('/games/levels', {
      params: { gameType },
    })
    return response.data
  }

  async createGameSession(gameType: string, level: number): Promise<GameSession> {
    const response = await apiClient.post<GameSession>('/games/sessions', {
      gameType,
      level,
      startTime: new Date(),
    })
    return response.data
  }

  async submitGameResult(
    sessionId: string,
    score: number,
    accuracy: number,
    answers: any[]
  ): Promise<{ score: number; levelUp: boolean; achievements: string[] }> {
    const response = await apiClient.post('/games/sessions/submit', {
      sessionId,
      score,
      accuracy,
      answers,
      endTime: new Date(),
    })
    return response.data
  }

  async getGameStats(gameType: string): Promise<any> {
    const response = await apiClient.get('/games/stats', {
      params: { gameType },
    })
    return response.data
  }
}

export default new GameService()
