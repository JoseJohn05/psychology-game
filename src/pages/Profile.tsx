import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayerStats } from '../types/game'

interface ProfileProps {
  playerStats: PlayerStats
}

const Profile = ({ playerStats }: ProfileProps) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="glass p-12 rounded-3xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-8">🎮 Player Profile</h1>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Username</p>
                <p className="text-2xl font-bold">{playerStats.username}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Level</p>
                <p className="text-2xl font-bold">{playerStats.level}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Total Score</p>
                <p className="text-2xl font-bold">{playerStats.totalScore.toLocaleString()}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-sm opacity-75">Games Played</p>
                <p className="text-2xl font-bold">{playerStats.gamesPlayed}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
              {playerStats.achievements.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {playerStats.achievements.map((ach, idx) => (
                    <div key={idx} className="bg-white bg-opacity-10 p-3 rounded-lg">
                      <p className="text-sm">{ach.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm opacity-75">No achievements yet. Play games to unlock them!</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="btn-primary flex-1"
            >
              ← Back Home
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="btn-secondary flex-1"
            >
              Play Again →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
