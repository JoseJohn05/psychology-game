import apiClient from './client'
import { LeaderboardEntry } from '../services/leaderboardService'

export interface LeaderboardResponse {
  entries: LeaderboardEntry[]
  playerRank: number
  totalPlayers: number
}

class LeaderboardAPI {
  async getGlobalLeaderboard(page: number = 1, limit: number = 10): Promise<LeaderboardResponse> {
    const response = await apiClient.get<LeaderboardResponse>('/leaderboard/global', {
      params: { page, limit },
    })
    return response.data
  }

  async getWeeklyLeaderboard(page: number = 1, limit: number = 10): Promise<LeaderboardResponse> {
    const response = await apiClient.get<LeaderboardResponse>('/leaderboard/weekly', {
      params: { page, limit },
    })
    return response.data
  }

  async getCountryLeaderboard(country: string, limit: number = 20): Promise<LeaderboardResponse> {
    const response = await apiClient.get<LeaderboardResponse>('/leaderboard/country', {
      params: { country, limit },
    })
    return response.data
  }

  async submitScore(gameType: string, score: number, level: number): Promise<any> {
    const response = await apiClient.post('/leaderboard/submit', {
      gameType,
      score,
      level,
      timestamp: new Date(),
    })
    return response.data
  }
}

export default new LeaderboardAPI()
