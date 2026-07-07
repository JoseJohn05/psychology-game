import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LevelSystem from '../components/LevelSystem'
import AIBattle from '../components/AIBattle'
import GameAnalytics from '../components/GameAnalytics'
import { PlayerStats } from '../types/game'

interface GameLauncher Props {
  gameType: string
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const GameLauncher = ({ gameType, playerStats, setPlayerStats }: GameLauncher Props) => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'mode-select' | 'level-select' | 'ai-battle'>('mode-select')

  const gameModes = [
    {
      id: 'story',
      name: 'Story Mode',
      icon: '📖',
      description: 'Progress through progressive difficulty levels',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ai-battle',
      name: 'AI Battle',
      icon: '⚔️',
      description: 'Challenge AI opponents with different personalities',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'survival',
      name: 'Survival Mode',
      icon: '🌪️',
      description: 'Face endless challenges with increasing difficulty',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  if (mode === 'level-select') {
    return (
      <LevelSystem
        gameType={gameType}
        playerStats={playerStats}
        setPlayerStats={setPlayerStats}
      />
    )
  }

  if (mode === 'ai-battle') {
    return <AIBattle playerStats={playerStats} />
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-white mb-2">🎮 Game Modes</h1>
          <p className="text-xl text-white opacity-90 mb-4">Choose how you want to play</p>
          <div className="text-sm opacity-75 text-white">
            <p>Player Level: {playerStats.level} | Total Score: {playerStats.totalScore}</p>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {gameModes.map((gameMode, idx) => (
            <motion.button
              key={gameMode.id}
              onClick={() => setMode(gameMode.id as any)}
              className={`bg-gradient-to-br ${gameMode.color} p-8 rounded-2xl text-white glass hover:shadow-2xl transition-all group overflow-hidden relative`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative z-10">
                <div className="text-6xl mb-4">{gameMode.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{gameMode.name}</h3>
                <p className="text-sm opacity-90">{gameMode.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="glass p-8 rounded-2xl mb-8">
          <GameAnalytics gameType={gameType} playerId={playerStats.username} />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate('/menu')}
            className="btn-secondary"
          >
            ← Back to Menu
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default GameLauncher
