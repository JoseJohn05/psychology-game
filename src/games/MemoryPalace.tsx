import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayerStats, MemoryObject } from '../types/game'

interface MemoryPalaceProps {
  playerStats: PlayerStats
  setPlayerStats: (stats: PlayerStats) => void
}

const MemoryPalace = ({ playerStats, setPlayerStats }: MemoryPalaceProps) => {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameComplete, setGameComplete] = useState(false)
  const [remembered, setRemembered] = useState<string[]>([])
  const [showingObjects, setShowingObjects] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30)

  const generateMemoryObjects = (levelNum: number): MemoryObject[] => {
    const count = 3 + levelNum * 2
    const objects: MemoryObject[] = []
    const shapes: ('cube' | 'sphere' | 'cone')[] = ['cube', 'sphere', 'cone']
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

    for (let i = 0; i < count; i++) {
      objects.push({
        id: `obj-${i}`,
        position: [
          Math.random() * 4 - 2,
          Math.random() * 3 - 1.5,
          Math.random() * 3 - 1.5,
        ] as [number, number, number],
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length],
      })
    }
    return objects
  }

  const [objects, setObjects] = useState(generateMemoryObjects(level))

  useEffect(() => {
    if (showingObjects) {
      const timer = setTimeout(() => {
        setShowingObjects(false)
        setTimeLeft(20)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [showingObjects])

  useEffect(() => {
    if (!showingObjects && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !showingObjects) {
      setGameComplete(true)
    }
  }, [timeLeft, showingObjects])

  const handleObjectClick = (id: string) => {
    if (showingObjects || gameComplete) return
    if (!remembered.includes(id)) {
      setRemembered([...remembered, id])
      setScore((prev) => prev + 10)
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
          <h2 className="text-4xl font-black mb-4">🎉 Memory Challenge Complete!</h2>
          <p className="text-6xl font-black text-yellow-300 mb-4">{score}</p>
          <p className="text-xl mb-2">Objects Remembered: {remembered.length}/{objects.length}</p>
          <p className="text-sm opacity-75 mb-8">Accuracy: {((remembered.length / objects.length) * 100).toFixed(1)}%</p>
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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 text-white">
          <h1 className="text-3xl font-bold">🏛️ Memory Palace</h1>
          <div className="text-2xl font-bold">{timeLeft}s</div>
        </div>

        <motion.div
          className="glass p-8 rounded-2xl min-h-96 flex items-center justify-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {showingObjects ? (
            <div className="text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Study the objects carefully!</h2>
              <p className="text-xl opacity-75 mb-8">You have 8 seconds to memorize them</p>
              <div className="grid grid-cols-3 gap-4">
                {objects.map((obj) => (
                  <motion.div
                    key={obj.id}
                    className="w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold"
                    style={{
                      backgroundColor: obj.color,
                      opacity: 0.8,
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {obj.shape === 'cube' && '■'}
                    {obj.shape === 'sphere' && '●'}
                    {obj.shape === 'cone' && '▲'}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <h2 className="text-white text-2xl font-bold mb-6">Click the objects you remember!</h2>
              <div className="grid grid-cols-3 gap-4">
                {objects.map((obj) => (
                  <motion.button
                    key={obj.id}
                    onClick={() => handleObjectClick(obj.id)}
                    className={`w-full h-24 rounded-lg text-4xl font-bold transition-all ${
                      remembered.includes(obj.id)
                        ? 'opacity-50 cursor-default'
                        : 'hover:scale-105 cursor-pointer'
                    }`}
                    style={{
                      backgroundColor: remembered.includes(obj.id) ? '#888' : obj.color,
                      opacity: remembered.includes(obj.id) ? 0.3 : 0.8,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {!remembered.includes(obj.id) && '?'}
                    {remembered.includes(obj.id) &&
                      (obj.shape === 'cube' ? '■' : obj.shape === 'sphere' ? '●' : '▲')}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default MemoryPalace
