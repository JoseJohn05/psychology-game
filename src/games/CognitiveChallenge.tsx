import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayerStats, CognitiveQuestion } from '../types/game'

interface CognitiveChallengeProps {
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const CognitiveChallenge = ({ playerStats, setPlayerStats }: CognitiveChallengeProps) => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  const questions: CognitiveQuestion[] = [
    {
      id: '1',
      question: 'You have 10 apples and you see that 80% of successful people own apples. How does this affect your confidence in your business decision?',
      options: [
        'It strongly increases my confidence',
        'It slightly increases my confidence',
        'It doesn\'t affect my decision-making',
        'It makes me question my original reasoning',
      ],
      correctAnswer: 3,
      category: 'bias',
      explanation: 'This is survivorship bias - we only see the successful people with apples, not the unsuccessful ones.',
      psychologyInsight: 'Recognition of survivorship bias indicates strong critical thinking skills.',
    },
    {
      id: '2',
      question: 'A hospital has two wards. Ward A: 100 births, 60% boys. Ward B: 10 births, 80% boys. Which ward is more likely to have 80% boys in the future?',
      options: [
        'Ward A is more likely',
        'Ward B is more likely',
        'They are equally likely',
        'Cannot be determined',
      ],
      correctAnswer: 1,
      category: 'logic',
      explanation: 'Smaller sample sizes have more variability. Ward B with 10 births is more likely to deviate from 50-50.',
      psychologyInsight: 'Understanding regression to the mean shows sophisticated statistical reasoning.',
    },
    {
      id: '3',
      question: 'You spent $500 on a concert ticket yesterday. Today, you find a better, free concert at the same time. What do you do?',
      options: [
        'Go to the expensive concert (already paid)',
        'Go to the free concert',
        'Stay home',
        'Feel equally conflicted between both',
      ],
      correctAnswer: 1,
      category: 'decision',
      explanation: 'The $500 is a sunk cost and should not influence future decisions.',
      psychologyInsight: 'Avoiding sunk cost fallacy demonstrates rational economic decision-making.',
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
    const isCorrect = index === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore((prev) => prev + 10)
    }
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
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
          <h2 className="text-4xl font-black mb-4">🎉 Challenge Complete!</h2>
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

  const q = questions[currentQuestion]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 text-white">
          <h1 className="text-3xl font-bold">🎯 Cognitive Bias Challenge</h1>
          <div className="text-2xl font-bold">{timeLeft}s</div>
        </div>

        <motion.div
          className="glass p-8 rounded-2xl text-white"
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <p className="text-sm opacity-75 mb-2">Question {currentQuestion + 1}/{questions.length}</p>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8">{q.question}</h2>

          <div className="space-y-3 mb-8">
            <AnimatePresence>
              {q.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => !showFeedback && handleAnswerSelect(idx)}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                    selectedAnswer === idx
                      ? idx === q.correctAnswer
                        ? 'bg-green-500 bg-opacity-50 border-2 border-green-300'
                        : 'bg-red-500 bg-opacity-50 border-2 border-red-300'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={showFeedback}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {option}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {showFeedback && (
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-bold mb-2">💡 Explanation:</p>
              <p className="mb-4">{q.explanation}</p>
              <p className="text-sm opacity-75">🧠 Psychology: {q.psychologyInsight}</p>
            </motion.div>
          )}

          {showFeedback && (
            <button
              onClick={handleNextQuestion}
              className="btn-primary w-full"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Challenge'}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CognitiveChallenge
