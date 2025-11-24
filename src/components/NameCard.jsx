import React from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'

const NameCard = ({ item, onOpen, variant = 'default' }) => {
  const { isFavorite, toggleFavorite } = useFavorites()

  const baseClass =
    'group relative rounded-2xl border transition-all hover:shadow-lg p-4'
  const surfaceClass =
    'bg-white border-emerald-900/10 shadow-md shadow-emerald-900/5 hover:shadow-emerald-900/10 dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20'

  const FavoriteButton = ({ className = '' }) => {
    const active = isFavorite(item)
    return (
      <button
        aria-label="favorite"
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(item)
        }}
        className={`p-2 rounded-full transition-colors ${
          active
            ? 'text-black dark:text-white'
            : 'text-emerald-900/50 hover:text-emerald-900 dark:text-emerald-200/60 dark:hover:text-emerald-100'
        } ${className}`}
      >
        <Heart className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
      </button>
    )
  }

  const content = (
    <>
      {variant === 'square' ? (
        <>
          <div className="absolute top-3 right-3">
            <FavoriteButton />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h3 className="font-serif text-xl text-emerald-900 dark:text-emerald-50">{item.english_name}</h3>
            <div className="font-[Amiri] text-3xl leading-none mt-2 text-emerald-900 dark:text-emerald-100">{item.arabic_name}</div>
            <div className="mt-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-900 border border-emerald-900/10 dark:bg-emerald-800/40 dark:text-emerald-100 dark:border-emerald-100/10 capitalize">{item.gender}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-start justify-between gap-2">
          <div className="pr-2">
            <h3 className="font-serif text-xl text-emerald-900 dark:text-emerald-50">{item.english_name}</h3>
            <p className="text-emerald-900/70 dark:text-emerald-100/70 line-clamp-2 text-sm mt-1">{item.meaning}</p>
          </div>
          <div className="flex flex-col items-end gap-3 min-w-[80px]">
            <FavoriteButton className="-mr-2 -mt-2" />
            <div className="font-[Amiri] text-2xl leading-none text-emerald-900 dark:text-emerald-100">{item.arabic_name}</div>
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-900 border border-emerald-900/10 dark:bg-emerald-800/40 dark:text-emerald-100 dark:border-emerald-100/10 capitalize">{item.gender}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={`${baseClass} ${surfaceClass} ${variant === 'square' ? 'aspect-square w-full min-w-[200px] max-w-[220px] flex' : ''}`}
      onClick={() => onOpen && onOpen(item)}
    >
      {content}
    </motion.div>
  )
}

export default NameCard
