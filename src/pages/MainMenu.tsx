import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthModal from './AuthModal'
import authService from '../api/authService'

const MainMenu = () => {
  const navigate = useNavigate()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || 'Player')

  const handleAuthSuccess = (username: string) => {
    setPlayerName(username)
    setIsAuthenticated(true)
    localStorage.setItem('playerName', username)
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setPlayerName('Player')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {isAuthenticated && (
        <motion.button
          onClick={handleLogout}
          className="absolute top-8 right-8 btn-secondary text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Logout
        </motion.button>
      )}

      <motion.div
        className="text-center glass p-12 rounded-3xl max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl font-black text-white mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          🧠 MindMaze
        </motion.h1>

        <motion.p
          className="text-sm text-white opacity-75 mb-6"
          variants={itemVariants}
        >
          Welcome {playerName}!
        </motion.p>

        <motion.p
          className="text-xl text-white mb-8 drop-shadow-md"
          variants={itemVariants}
        >
          Unlock the secrets of your mind through psychological challenges and cognitive puzzles
        </motion.p>

        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          {!isAuthenticated ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="btn-primary w-full text-lg"
            >
              🔐 Login / Register
            </button>
          ) : (
            <button
              onClick={() => navigate('/menu')}
              className="btn-primary w-full text-lg"
            >
              Start Game
            </button>
          )}
          <button
            onClick={() => navigate('/leaderboard')}
            className="btn-secondary w-full text-lg"
          >
            🏆 View Leaderboard
          </button>
        </motion.div>

        <motion.div
          className="mt-12 text-white text-sm opacity-75"
          variants={itemVariants}
        >
          <p>"The mind is its own place, and in itself"</p>
          <p>"can make a heaven of hell, a hell of heaven" - Milton</p>
        </motion.div>
      </motion.div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}

export default MainMenu
