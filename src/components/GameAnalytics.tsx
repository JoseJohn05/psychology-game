import { useEffect, useState } from 'react'
import gameService, { GameSession } from '../api/gameService'

interface GameAnalyticsProps {
  gameType: string
  playerId: string
}

const GameAnalytics = ({ gameType, playerId }: GameAnalyticsProps) => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [gameType])

  const loadStats = async () => {
    try {
      const data = await gameService.getGameStats(gameType)
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-white">Loading analytics...</div>
  }

  return (
    <div className="glass p-6 rounded-xl text-white">
      <h3 className="text-xl font-bold mb-4">📊 Game Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm opacity-75">Games Played</p>
          <p className="text-2xl font-bold">{stats?.gamesPlayed || 0}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Average Score</p>
          <p className="text-2xl font-bold">{Math.round(stats?.averageScore || 0)}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Best Score</p>
          <p className="text-2xl font-bold text-yellow-300">{stats?.bestScore || 0}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Accuracy</p>
          <p className="text-2xl font-bold text-green-400">{Math.round(stats?.accuracy || 0)}%</p>
        </div>
      </div>
    </div>
  )
}

export default GameAnalytics
