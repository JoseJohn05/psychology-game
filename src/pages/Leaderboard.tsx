import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import leaderboardService, { LeaderboardEntry } from '../services/leaderboardService'

type LeaderboardType = 'global' | 'weekly' | 'country'

const Leaderboard = () => {
  const navigate = useNavigate()
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('global')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [playerRank, setPlayerRank] = useState(0)

  useEffect(() => {
    loadLeaderboard()
  }, [leaderboardType])

  const loadLeaderboard = async () => {
    setLoading(true)
    let data: LeaderboardEntry[] = []

    if (leaderboardType === 'global') {
      data = await leaderboardService.getGlobalLeaderboard()
    } else if (leaderboardType === 'weekly') {
      data = await leaderboardService.getWeeklyLeaderboard()
    }

    setEntries(data)
    setPlayerRank(Math.floor(Math.random() * 100) + 1)
    setLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-white mb-4">🏆 Global Leaderboard</h1>
          <p className="text-xl text-white opacity-90">Compete with players worldwide</p>
        </motion.div>

        {/* Leaderboard Type Selection */}
        <motion.div
          className="flex gap-4 justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {['global', 'weekly', 'country'].map((type) => (
            <button
              key={type}
              onClick={() => setLeaderboardType(type as LeaderboardType)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                leaderboardType === type
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              {type === 'global' && '🌍 Global'}
              {type === 'weekly' && '📅 Weekly'}
              {type === 'country' && '🌎 Country'}
            </button>
          ))}
        </motion.div>

        {/* Your Rank Card */}
        <motion.div
          className="glass p-6 rounded-2xl text-white mb-8 border-2 border-yellow-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-75">Your Current Rank</p>
              <p className="text-4xl font-black text-yellow-300">#{playerRank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">Global Position</p>
              <p className="text-2xl font-bold">Top {(playerRank / 100).toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Entries */}
        {loading ? (
          <div className="text-center text-white text-xl">Loading leaderboard...</div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {entries.map((entry, idx) => (
                <motion.div
                  key={entry.playerId}
                  className={`glass p-6 rounded-xl text-white flex items-center justify-between ${
                    idx < 3 ? 'border-2 border-yellow-400' : ''
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center font-bold text-lg">
                      {idx === 0 && '🥇'}
                      {idx === 1 && '🥈'}
                      {idx === 2 && '🥉'}
                      {idx > 2 && idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{entry.username}</p>
                      <p className="text-sm opacity-75">
                        {entry.country} • Level {entry.level}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-yellow-300">{entry.totalScore}</p>
                    <p className="text-xs opacity-75">Games: {entry.gamesPlayed}</p>
                  </div>

                  <div className="ml-6 text-center">
                    <p className="text-sm opacity-75">EQ Score</p>
                    <p className="text-xl font-bold text-green-400">{entry.averageEQ}%</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          className="mt-12 flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button onClick={() => navigate('/')} className="btn-primary">
            ← Back Home
          </button>
          <button onClick={() => navigate('/multiplayer')} className="btn-secondary">
            🎮 Play Multiplayer →
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Leaderboard
