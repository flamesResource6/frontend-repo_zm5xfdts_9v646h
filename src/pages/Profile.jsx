import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-emerald-900 dark:text-emerald-50 mb-4">
            Please sign in to view your profile
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-emerald-900/20 rounded-3xl border border-emerald-900/10 dark:border-emerald-100/10 shadow-lg p-8">
          <h1 className="font-serif text-4xl text-emerald-900 dark:text-emerald-50 mb-6">
            Profile
          </h1>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-emerald-900/70 dark:text-emerald-100/70 mb-1">
                Email
              </label>
              <p className="text-lg text-emerald-900 dark:text-emerald-50">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900/70 dark:text-emerald-100/70 mb-1">
                User ID
              </label>
              <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 font-mono">
                {user.id}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900/70 dark:text-emerald-100/70 mb-1">
                Account Created
              </label>
              <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
