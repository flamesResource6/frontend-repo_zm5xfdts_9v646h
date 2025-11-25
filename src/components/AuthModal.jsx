import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
        onClose()
      } else {
        await signUp(email, password)
        setMessage('Check your email to confirm your account!')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-md w-full bg-white dark:bg-emerald-900/90 rounded-3xl border border-emerald-900/10 dark:border-emerald-100/10 shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-800/50 text-emerald-900 dark:text-emerald-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-3xl text-emerald-900 dark:text-emerald-50 mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-emerald-900/20 dark:border-emerald-100/20 bg-white dark:bg-emerald-800/30 text-emerald-900 dark:text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-xl border border-emerald-900/20 dark:border-emerald-100/20 bg-white dark:bg-emerald-800/30 text-emerald-900 dark:text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-900 dark:bg-emerald-100 text-white dark:text-emerald-900 rounded-xl font-medium hover:bg-emerald-800 dark:hover:bg-emerald-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setMessage('')
            }}
            className="text-sm text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
