import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import authService from '../api/authService'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (username: string) => void
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const result = await authService.login({
          email: formData.email,
          password: formData.password,
        })
        onSuccess(result.player.username)
      } else {
        const result = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        onSuccess(result.player.username)
      }
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="glass p-8 rounded-3xl text-white max-w-md w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-black mb-6 text-center">
          {isLogin ? '🔐 Login' : '📝 Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm opacity-75 mb-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-purple-300 hover:text-purple-200 font-semibold"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AuthModal
