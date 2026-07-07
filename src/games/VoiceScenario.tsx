import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import voiceService from '../services/voiceService'
import { PlayerStats } from '../types/game'

interface VoiceScenarioProps {
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const VoiceScenario = ({ playerStats, setPlayerStats }: VoiceScenarioProps) => {
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState(0)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState('')

  const scenarios = [
    {
      id: '1',
      character: 'Dr. Sarah',
      prompt: 'How do you handle stress in your daily life?',
      context: 'A psychology mentor is asking about your coping mechanisms',
      keywords: ['exercise', 'meditation', 'talk', 'relax', 'breathe', 'hobby'],
      feedback: 'Great response! You mentioned healthy coping strategies.',
    },
    {
      id: '2',
      character: 'Alex',
      prompt: 'Tell me about a challenge you overcame recently',
      context: 'A friend wants to hear about your resilience and growth',
      keywords: ['tried', 'learned', 'improved', 'worked', 'overcome', 'progress'],
      feedback: 'Excellent! You demonstrated self-reflection and growth mindset.',
    },
  ]

  useEffect(() => {
    if (!voiceService.isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in your browser')
    }
  }, [])

  const handleStartListening = async () => {
    setTranscript('')
    setIsListening(true)

    voiceService.startListening((result) => {
      setTranscript(result.transcript)
      if (result.isFinal) {
        handleSubmitResponse(result.transcript)
      }
    })

    // Auto-stop after 30 seconds
    setTimeout(() => {
      stopListening()
    }, 30000)
  }

  const stopListening = () => {
    voiceService.stopListening()
    setIsListening(false)
  }

  const handleSubmitResponse = (response: string) => {
    stopListening()
    const scenario = scenarios[currentScenario]
    const keywordMatches = scenario.keywords.filter((keyword) => response.toLowerCase().includes(keyword)).length
    const responseScore = Math.min(keywordMatches * 10, 50) + (response.length > 50 ? 20 : 0)

    setScore((prev) => prev + responseScore)
    setFeedback(scenario.feedback)

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario((prev) => prev + 1)
        setTranscript('')
        setFeedback('')
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="glass p-12 rounded-3xl text-white text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl font-black mb-4">🎤 Voice Challenge Complete!</h2>
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

  const scenario = scenarios[currentScenario]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black text-white">🎤 Voice Scenario Challenge</h1>
          <p className="text-sm opacity-75 text-white mt-2">Speak naturally to respond to characters</p>
        </motion.div>

        <motion.div
          className="glass p-12 rounded-3xl text-white text-center min-h-96 flex flex-col justify-between"
          key={currentScenario}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">{scenario.character}</h2>
            <p className="text-sm opacity-75 mb-6">{scenario.context}</p>
            <div className="bg-white bg-opacity-10 p-8 rounded-xl mb-8">
              <p className="text-2xl italic">"{scenario.prompt}"</p>
            </div>
          </div>

          <div>
            {transcript && (
              <motion.div
                className="bg-green-500 bg-opacity-20 p-6 rounded-lg mb-6 border-2 border-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm opacity-75 mb-2">Your response:</p>
                <p className="text-lg italic">"{transcript}"</p>
              </motion.div>
            )}

            {feedback && (
              <motion.div
                className="bg-blue-500 bg-opacity-20 p-4 rounded-lg mb-6 border-2 border-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm">💡 {feedback}</p>
              </motion.div>
            )}

            {!isListening && !feedback && (
              <button onClick={handleStartListening} className="btn-primary w-full text-lg py-4 mb-4">
                🎤 Start Speaking
              </button>
            )}
            {isListening && (
              <div className="flex gap-4">
                <motion.div
                  className="flex-1 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                >
                  <p className="text-white font-bold">🎤 Listening...</p>
                </motion.div>
                <button onClick={stopListening} className="btn-secondary px-6 py-2">
                  Stop
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VoiceScenario
