import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayerStats, PatternChallenge } from '../types/game'

interface PatternRecognitionProps {
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const PatternRecognition = ({ playerStats, setPlayerStats }: PatternRecognitionProps) => {
  const navigate = useNavigate()
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45)

  const challenges: PatternChallenge[] = [
    {
      id: '1',
      title: 'Numerical Sequence',
      difficulty: 'medium',
      pattern: [2, 4, 8, 16, 32, ?],
      options: [[64], [48], [40], [36]],
      correctIndex: 0,
      timeLimit: 30,
      category: 'sequence',
    },
    {
      id: '2',
      title: 'Letter Pattern',
      difficulty: 'medium',
      pattern: ['A', 'B', 'D', 'G', 'K', ?],
      options: [['P'], ['M'], ['N'], ['O']],
      correctIndex: 0,
      timeLimit: 30,
      category: 'sequence',
    },
    {
      id: '3',
      title: 'Logical Grid',
      difficulty: 'hard',
      pattern: [1, 2, 3, 5, 8, 13, ?],
      options: [[21], [18], [15], [20]],
      correctIndex: 0,
      timeLimit: 40,
      category: 'logical',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    const isCorrect = index === challenges[currentChallenge].correctIndex
    if (isCorrect) {
      setScore((prev) => prev + 15)
    }
    setShowFeedback(true)
  }

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setGameComplete(true)
    }
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="glass p-12 rounded-3xl text-white text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl font-black mb-4">🎉 Pattern Master!</h2>
          <p className="text-6xl font-black text-yellow-300 mb-4">{score}</p>
          <p className="text-xl mb-8">Points Earned</p>
          <button
            onClick={() => {
              setPlayerStats({ ...playerStats, totalScore: playerStats.totalScore + score, gamesPlayed: playerStats.gamesPlayed + 1 })
              navigate('/menu')
            }}
            className="btn-primary w-full"
          >
            Back to Menu
          </button>
        </motion.div>
      </div>
    )
  }

  const challenge = challenges[currentChallenge]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 text-white">
          <h1 className="text-3xl font-bold">🔮 Pattern Recognition</h1>
          <div className="text-2xl font-bold">{timeLeft}s</div>
        </div>

        <motion.div
          className="glass p-8 rounded-2xl text-white"
          key={currentChallenge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <p className="text-sm opacity-75 mb-2">Challenge {currentChallenge + 1}/{challenges.length}</p>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8">{challenge.title}</h2>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg mb-8 text-center">
            <div className="text-4xl font-mono font-bold space-y-2">
              <div className="flex justify-center gap-4 flex-wrap">
                {(challenge.pattern as (string | number)[]).map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-r from-green-400 to-emerald-400 px-4 py-2 rounded-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {item === '?' ? '?' : item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm opacity-75 mb-6">What comes next?</p>

          <div className="space-y-3 mb-8">
            {challenge.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => !showFeedback && handleAnswerSelect(idx)}
                className={`w-full p-4 rounded-lg text-lg font-semibold transition-all ${
                  selectedAnswer === idx
                    ? idx === challenge.correctIndex
                      ? 'bg-green-500 bg-opacity-50 border-2 border-green-300'
                      : 'bg-red-500 bg-opacity-50 border-2 border-red-300'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                disabled={showFeedback}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {option.join(', ')}
              </motion.button>
            ))}
          </div>

          {showFeedback && (
            <button
              onClick={handleNextChallenge}
              className="btn-primary w-full"
            >
              {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Finish'}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PatternRecognition
