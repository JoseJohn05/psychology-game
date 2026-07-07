import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayerStats, EmotionScenario } from '../types/game'

interface EmotionalIntelligenceProps {
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const EmotionalIntelligence = ({ playerStats, setPlayerStats }: EmotionalIntelligenceProps) => {
  const navigate = useNavigate()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const scenarios: EmotionScenario[] = [
    {
      id: '1',
      title: 'Conflict Resolution',
      description: 'Your colleague takes credit for your project in front of your boss.',
      context: 'You spent weeks on this project and your colleague just presented it as their own.',
      responses: [
        {
          text: 'Immediately confront them angrily in front of everyone',
          emotionalIntelligence: 1,
          type: 'avoidant',
        },
        {
          text: 'Request a private meeting to discuss and understand their perspective first',
          emotionalIntelligence: 9,
          type: 'empathetic',
        },
        {
          text: 'Calmly correct them in front of the boss with facts',
          emotionalIntelligence: 6,
          type: 'assertive',
        },
        {
          text: 'Say nothing and discuss it with HR later',
          emotionalIntelligence: 4,
          type: 'logical',
        },
      ],
      feedback: 'High emotional intelligence involves understanding others\' perspectives before reacting.',
    },
    {
      id: '2',
      title: 'Empathy Assessment',
      description: 'A friend seems withdrawn and mentions they\'ve been struggling with something.',
      context: 'You\'re busy with work, but they\'ve been there for you in the past.',
      responses: [
        {
          text: 'Tell them you\'re too busy right now and suggest they talk to a therapist',
          emotionalIntelligence: 2,
          type: 'avoidant',
        },
        {
          text: 'Put work aside and ask them to share what\'s troubling them, really listen',
          emotionalIntelligence: 10,
          type: 'empathetic',
        },
        {
          text: 'Listen briefly but keep checking your phone for work emails',
          emotionalIntelligence: 3,
          type: 'logical',
        },
        {
          text: 'Try to solve their problem immediately with practical advice',
          emotionalIntelligence: 5,
          type: 'assertive',
        },
      ],
      feedback: 'True empathy means being fully present and valuing emotional connection over efficiency.',
    },
  ]

  const handleResponseSelect = (index: number) => {
    setSelectedResponse(index)
    const eqScore = scenarios[currentScenario].responses[index].emotionalIntelligence
    setScore((prev) => prev + eqScore)
    setShowFeedback(true)
  }

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1)
      setSelectedResponse(null)
      setShowFeedback(false)
    } else {
      setGameComplete(true)
    }
  }

  if (gameComplete) {
    const maxScore = scenarios.length * 10
    const eqLevel = (score / maxScore) * 100

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="glass p-12 rounded-3xl text-white text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl font-black mb-4">🎉 EQ Assessment Complete!</h2>
          <p className="text-6xl font-black text-yellow-300 mb-4">{eqLevel.toFixed(0)}%</p>
          <p className="text-xl mb-4">Your Emotional Intelligence Level</p>
          <p className="text-sm opacity-75 mb-8">
            {eqLevel >= 80
              ? '🌟 Exceptional emotional awareness'
              : eqLevel >= 60
                ? '👍 Good emotional skills'
                : eqLevel >= 40
                  ? '📈 Room for improvement'
                  : '💪 Keep working on EQ'}
          </p>
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

  const scenario = scenarios[currentScenario]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-white">
          <h1 className="text-3xl font-bold">💭 Emotional Intelligence Challenge</h1>
        </div>

        <motion.div
          className="glass p-8 rounded-2xl text-white"
          key={currentScenario}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <p className="text-sm opacity-75 mb-2">Scenario {currentScenario + 1}/{scenarios.length}</p>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">{scenario.title}</h2>
          <p className="text-lg mb-6">{scenario.description}</p>
          <div className="bg-white bg-opacity-5 p-4 rounded-lg mb-8 border-l-4 border-orange-400">
            <p className="text-sm italic">{scenario.context}</p>
          </div>

          <div className="space-y-3 mb-8">
            <AnimatePresence>
              {scenario.responses.map((response, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => !showFeedback && handleResponseSelect(idx)}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                    selectedResponse === idx
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-2 border-yellow-300'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={showFeedback}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span>{response.text}</span>
                    {selectedResponse === idx && <span className="text-lg">EQ: {response.emotionalIntelligence}/10</span>}
                  </div>
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
              <p className="font-bold mb-2">💡 Insight:</p>
              <p>{scenario.feedback}</p>
            </motion.div>
          )}

          {showFeedback && (
            <button
              onClick={handleNextScenario}
              className="btn-primary w-full"
            >
              {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'View Results'}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default EmotionalIntelligence
