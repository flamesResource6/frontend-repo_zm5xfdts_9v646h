import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import NameCard from '../components/NameCard'
import Button from '../components/ui/Button'

const Favorites = () => {
  const { favorites } = useFavorites()

  const copyList = async () => {
    const text = favorites.map(n => `${n.english_name} (${n.arabic_name}) – ${n.meaning}`).join('\n')
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-emerald-900 dark:text-emerald-50">Your Favorites</h1>
        {favorites.length > 0 && (
          <Button onClick={copyList} variant="gold">Copy List</Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="mt-6 text-emerald-900/70 dark:text-emerald-100/70">No favorites yet. Sign in and browse to add names you like.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(item => (
            <NameCard key={item.english_name} item={item} onOpen={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
