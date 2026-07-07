import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gameService, { GameLevel } from '../api/gameService'
import { PlayerStats } from '../types/game'

interface LevelSystemProps {
  gameType: string
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const LevelSystem = ({ gameType, playerStats, setPlayerStats }: LevelSystemProps) => {
  const navigate = useNavigate()
  const [levels, setLevels] = useState<GameLevel[]>([])
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadLevels()
  }, [gameType])

  const loadLevels = async () => {
    try {
      setLoading(true)
      const data = await gameService.getGameLevels(gameType)
      setLevels(data)
      setError('')
    } catch (err) {
      setError('Failed to load levels')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLevel = (level: GameLevel) => {
    if (playerStats.totalScore < level.requiredScore) {
      setError(`You need ${level.requiredScore} points to unlock this level`)
      return
    }
    setSelectedLevel(level)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-white text-2xl font-bold" animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity }}>
          Loading levels...
        </motion.div>
      </div>
    )
  }

  if (selectedLevel) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass p-12 rounded-3xl text-white text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-4xl font-black mb-4">🎯 {selectedLevel.name}</h1>
            <p className="text-xl opacity-75 mb-6">{selectedLevel.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Difficulty</p>
                <p className="text-lg font-bold capitalize">{selectedLevel.difficulty}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Challenges</p>
                <p className="text-lg font-bold">{selectedLevel.challenges}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Reward</p>
                <p className="text-lg font-bold text-yellow-300">{selectedLevel.rewards} pts</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedLevel(null)}
                className="btn-secondary flex-1"
              >
                ← Back
              </button>
              <button
                onClick={() => navigate(`/play/${gameType}/${selectedLevel.id}`)}
                className="btn-primary flex-1"
              >
                Start Level →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-white mb-4">🎮 Choose Your Level</h1>
          <p className="text-xl text-white opacity-90">Current Score: {playerStats.totalScore}</p>
        </motion.div>

        {error && (
          <motion.div
            className="glass p-4 rounded-lg text-red-300 mb-8 border-l-4 border-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {levels.map((level) => {
              const isUnlocked = playerStats.totalScore >= level.requiredScore
              return (
                <motion.button
                  key={level.id}
                  onClick={() => handleSelectLevel(level)}
                  className={`glass p-8 rounded-2xl text-white text-left transition-all ${
                    isUnlocked
                      ? 'hover:scale-105 hover:shadow-2xl cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  variants={itemVariants}
                  disabled={!isUnlocked}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{level.name}</h3>
                      <p className="text-sm opacity-75 mt-1">{level.description}</p>
                    </div>
                    <div className={`text-3xl ${
                      level.difficulty === 'easy' ? '🟢' :
                      level.difficulty === 'medium' ? '🟡' :
                      level.difficulty === 'hard' ? '🔴' :
                      '🔥'
                    }`}></div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm opacity-75">Required Score: {level.requiredScore}</p>
                      <p className="text-sm opacity-75">Challenges: {level.challenges}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-300">{level.rewards} pts</p>
                      {!isUnlocked && <p className="text-xs text-red-300">🔒 Locked</p>}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default LevelSystem
