import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const GameMenu = () => {
  const navigate = useNavigate()

  const games = [
    {
      title: '🧠 Cognitive Bias Challenge',
      description: 'Test your decision-making and uncover cognitive biases',
      path: '/cognitive',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: '🏛️ Memory Palace',
      description: 'Navigate stunning 3D environments to enhance spatial memory',
      path: '/memory',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: '💬 Emotional Intelligence',
      description: 'Navigate complex social scenarios and improve EQ',
      path: '/emotional',
      color: 'from-red-500 to-orange-500',
    },
    {
      title: '🔍 Pattern Recognition',
      description: 'Solve visual and logical patterns under time pressure',
      path: '/pattern',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: '🎤 Voice Scenario',
      description: 'Interact with AI characters using voice commands',
      path: '/voice',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: '🎮 Multiplayer Battle',
      description: 'Challenge players worldwide in real-time competitions',
      path: '/multiplayer',
      color: 'from-yellow-500 to-red-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-white mb-4">🧠 MindMaze</h1>
          <p className="text-xl text-white opacity-90">Choose your psychological challenge</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {games.map((game, idx) => (
            <motion.button
              key={idx}
              onClick={() => navigate(game.path)}
              className={`bg-gradient-to-br ${game.color} p-8 rounded-2xl text-white glass hover:shadow-2xl transition-smooth text-left group overflow-hidden relative`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3">{game.title}</h2>
                <p className="text-sm opacity-90 mb-4">{game.description}</p>
                <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm font-semibold group-hover:bg-opacity-30 transition-smooth">
                  Play Now →
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate('/')}
            className="btn-secondary p-4 rounded-lg"
          >
            ← Back to Main Menu
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="btn-primary p-4 rounded-lg"
          >
            🏆 View Leaderboard
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="btn-secondary p-4 rounded-lg"
          >
            📊 View Profile
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default GameMenu
