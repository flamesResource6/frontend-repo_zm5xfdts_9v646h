import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  setShowAuthModal: () => {},
})

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth()

  // Load favorites when user logs in
  useEffect(() => {
    if (user) {
      loadFavorites()
    } else {
      // Clear favorites when user logs out
      setFavorites([])
    }
  }, [user])

  const loadFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('name_data')
        .eq('user_id', user.id)

      if (error) throw error
      setFavorites(data.map(item => item.name_data))
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  const isFavorite = (name) => {
    return favorites.some(n => n.english_name === name.english_name)
  }

  const toggleFavorite = async (name) => {
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true)
      return
    }

    const exists = isFavorite(name)

    try {
      if (exists) {
        // Remove from Supabase
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('name_data->>english_name', name.english_name)

        if (error) throw error

        // Update local state
        setFavorites(prev => prev.filter(n => n.english_name !== name.english_name))
      } else {
        // Add to Supabase
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            name_data: name,
          })

        if (error) throw error

        // Update local state
        setFavorites(prev => [...prev, name])
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    showAuthModal,
    setShowAuthModal,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => useContext(FavoritesContext)
