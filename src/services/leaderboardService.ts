import axios from 'axios'

interface LeaderboardEntry {
  rank: number
  playerId: string
  username: string
  totalScore: number
  level: number
  gamesPlayed: number
  averageEQ: number
  timestamp: Date
  country?: string
  avatar?: string
}

interface PlayerRanking {
  globalRank: number
  weeklyRank: number
  monthlyRank: number
  entries: LeaderboardEntry[]
}

class LeaderboardService {
  private baseURL = process.env.REACT_APP_API_URL || 'https://api.mindmaze.local'
  private mockData: LeaderboardEntry[] = [
    {
      rank: 1,
      playerId: 'player-001',
      username: 'MindMaster_Alex',
      totalScore: 5420,
      level: 28,
      gamesPlayed: 156,
      averageEQ: 89,
      timestamp: new Date(Date.now() - 86400000),
      country: '🇺🇸 USA',
    },
    {
      rank: 2,
      playerId: 'player-002',
      username: 'CognitiveNinja',
      totalScore: 5180,
      level: 26,
      gamesPlayed: 142,
      averageEQ: 85,
      timestamp: new Date(Date.now() - 172800000),
      country: '🇬🇧 UK',
    },
    {
      rank: 3,
      playerId: 'player-003',
      username: 'EQ_Champion',
      totalScore: 4950,
      level: 24,
      gamesPlayed: 138,
      averageEQ: 92,
      timestamp: new Date(Date.now() - 259200000),
      country: '🇨🇦 Canada',
    },
    {
      rank: 4,
      playerId: 'player-004',
      username: 'PatternPro',
      totalScore: 4720,
      level: 22,
      gamesPlayed: 131,
      averageEQ: 78,
      timestamp: new Date(Date.now() - 345600000),
      country: '🇦🇺 Australia',
    },
    {
      rank: 5,
      playerId: 'player-005',
      username: 'MemoryMaven',
      totalScore: 4580,
      level: 21,
      gamesPlayed: 128,
      averageEQ: 81,
      timestamp: new Date(Date.now() - 432000000),
      country: '🇩🇪 Germany',
    },
  ]

  async getGlobalLeaderboard(page: number = 1, limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      // Mock implementation - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const start = (page - 1) * limit
      return this.mockData.slice(start, start + limit)
    } catch (error) {
      console.error('Error fetching global leaderboard:', error)
      return []
    }
  }

  async getWeeklyLeaderboard(page: number = 1, limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return this.mockData.slice(0, limit)
    } catch (error) {
      console.error('Error fetching weekly leaderboard:', error)
      return []
    }
  }

  async getPlayerRanking(playerId: string): Promise<PlayerRanking | null> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const globalRank = Math.floor(Math.random() * 1000) + 1
      const weeklyRank = Math.floor(Math.random() * 500) + 1
      const monthlyRank = Math.floor(Math.random() * 750) + 1

      return {
        globalRank,
        weeklyRank,
        monthlyRank,
        entries: this.mockData,
      }
    } catch (error) {
      console.error('Error fetching player ranking:', error)
      return null
    }
  }

  async submitScore(playerId: string, username: string, score: number, level: number): Promise<boolean> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      console.log(`Score submitted: ${username} - ${score}`)
      return true
    } catch (error) {
      console.error('Error submitting score:', error)
      return false
    }
  }

  async getCountryLeaderboard(country: string, limit: number = 20): Promise<LeaderboardEntry[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return this.mockData.filter((entry) => entry.country === country).slice(0, limit)
    } catch (error) {
      console.error('Error fetching country leaderboard:', error)
      return []
    }
  }
}

export default new LeaderboardService()
export type { LeaderboardEntry, PlayerRanking }
