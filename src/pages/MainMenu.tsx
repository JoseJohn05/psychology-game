import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const MainMenu = () => {
  const navigate = useNavigate()

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
    <div className="flex items-center justify-center min-h-screen">
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
          className="text-xl text-white mb-8 drop-shadow-md"
          variants={itemVariants}
        >
          Unlock the secrets of your mind through psychological challenges and cognitive puzzles
        </motion.p>

        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          <button
            onClick={() => navigate('/menu')}
            className="btn-primary w-full text-lg"
          >
            Start Game
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="btn-secondary w-full text-lg"
          >
            View Profile
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
    </div>
  )
}

export default MainMenu
