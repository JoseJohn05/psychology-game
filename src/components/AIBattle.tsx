import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import aiService, { AIOpponent } from '../api/aiService'
import { PlayerStats } from '../types/game'

interface AIBattleProps {
  playerStats: PlayerStats
}

const AIBattle = ({ playerStats }: AIBattleProps) => {
  const navigate = useNavigate()
  const [opponents, setOpponents] = useState<AIOpponent[]>([])
  const [selectedOpponent, setSelectedOpponent] = useState<AIOpponent | null>(null)
  const [loading, setLoading] = useState(false)
  const [battleStarted, setBattleStarted] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [battlePhase, setBattlePhase] = useState<'selection' | 'intro' | 'battle' | 'results'>('selection')

  const loadOpponents = async () => {
    setLoading(true)
    try {
      const data = await aiService.getAvailableOpponents(playerStats.level)
      setOpponents(data)
    } catch (error) {
      console.error('Failed to load opponents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectOpponent = async (opponent: AIOpponent) => {
    setSelectedOpponent(opponent)
    setBattlePhase('intro')
  }

  const handleStartBattle = () => {
    setBattlePhase('battle')
    setBattleStarted(true)
    setPlayerScore(0)
    setOpponentScore(0)
  }

  const simulateBattle = () => {
    // Simulate a battle round
    const playerGain = Math.floor(Math.random() * 30) + 10
    const opponentGain = Math.floor(Math.random() * 25) + 5

    setPlayerScore((prev) => prev + playerGain)
    setOpponentScore((prev) => prev + opponentGain)

    // Check if battle is over (first to 100 points)
    if (playerScore + playerGain >= 100 || opponentScore + opponentGain >= 100) {
      setTimeout(() => setBattlePhase('results'), 1000)
    }
  }

  if (!opponents.length && battlePhase === 'selection') {
    loadOpponents()
  }

  if (battlePhase === 'selection') {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black text-white mb-4">⚔️ AI Battle Arena</h1>
            <p className="text-xl text-white opacity-90">Challenge AI opponents and test your skills</p>
          </motion.div>

          {loading ? (
            <motion.div className="text-center text-white text-xl" animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity }}>
              Loading opponents...
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <AnimatePresence>
                {opponents.map((opponent) => (
                  <motion.button
                    key={opponent.id}
                    onClick={() => handleSelectOpponent(opponent)}
                    className="glass p-8 rounded-2xl text-white text-left hover:scale-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-6xl mb-4">{opponent.avatar}</div>
                    <h3 className="text-2xl font-bold mb-2">{opponent.name}</h3>
                    <p className="text-sm opacity-75 mb-4">{opponent.personality}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-75">Level</p>
                        <p className="text-lg font-bold">{opponent.level}</p>
                      </div>
                      <div className={`text-2xl ${
                        opponent.difficulty === 'easy' ? '🟢' :
                        opponent.difficulty === 'medium' ? '🟡' :
                        opponent.difficulty === 'hard' ? '🔴' :
                        '🔥'
                      }`}></div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  if (battlePhase === 'intro' && selectedOpponent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="glass p-12 rounded-3xl text-white text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">{selectedOpponent.avatar}</div>
          <h2 className="text-3xl font-black mb-4">Challenging {selectedOpponent.name}</h2>
          <p className="text-sm opacity-75 mb-8">Difficulty: {selectedOpponent.difficulty.toUpperCase()}</p>
          <div className="mb-8 text-left space-y-2">
            <p className="text-sm"><strong>Strengths:</strong> {selectedOpponent.strengths.join(', ')}</p>
            <p className="text-sm"><strong>Weaknesses:</strong> {selectedOpponent.weaknesses.join(', ') || 'None'}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setBattlePhase('selection')}
              className="btn-secondary flex-1"
            >
              ← Back
            </button>
            <button
              onClick={handleStartBattle}
              className="btn-primary flex-1"
            >
              Start Battle →
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (battlePhase === 'battle' && selectedOpponent) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Player Side */}
            <motion.div
              className="glass p-8 rounded-2xl text-white text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3 className="text-2xl font-bold mb-4">You</h3>
              <motion.div
                className="text-6xl font-black text-green-400 mb-4"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                key={playerScore}
              >
                {playerScore}
              </motion.div>
              <div className="w-full bg-white bg-opacity-10 rounded-full h-4">
                <motion.div
                  className="bg-green-500 h-4 rounded-full transition-all"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(playerScore / 100, 1) * 100}%` }}
                />
              </div>
            </motion.div>

            {/* AI Side */}
            <motion.div
              className="glass p-8 rounded-2xl text-white text-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedOpponent.name}</h3>
              <motion.div
                className="text-6xl font-black text-red-400 mb-4"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                key={opponentScore}
              >
                {opponentScore}
              </motion.div>
              <div className="w-full bg-white bg-opacity-10 rounded-full h-4">
                <motion.div
                  className="bg-red-500 h-4 rounded-full transition-all"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(opponentScore / 100, 1) * 100}%` }}
                />
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <button
              onClick={simulateBattle}
              disabled={playerScore >= 100 || opponentScore >= 100}
              className="btn-primary text-lg py-4 px-12 disabled:opacity-50"
            >
              🎯 Attack!
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (battlePhase === 'results' && selectedOpponent) {
    const playerWon = playerScore > opponentScore
    const pointsEarned = Math.floor((playerScore / (playerScore + opponentScore)) * 50)

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="glass p-12 rounded-3xl text-white text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl font-black mb-4">{playerWon ? '🎉 Victory!' : '😢 Defeated'}</h2>
          <div className="mb-6 text-sm opacity-75">
            <p>You: {playerScore} | {selectedOpponent.name}: {opponentScore}</p>
          </div>
          <p className="text-6xl font-black text-yellow-300 mb-4">{pointsEarned}</p>
          <p className="text-lg mb-8">Points Earned</p>
          <button
            onClick={() => navigate('/menu')}
            className="btn-primary w-full"
          >
            Back to Menu
          </button>
        </motion.div>
      </div>
    )
  }

  return null
}

export default AIBattle
