import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles, Baby, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { namesData } from '../data/namesData'
import NameCard from '../components/NameCard'
import AuthModal from '../components/AuthModal'
import { useFavorites } from '../context/FavoritesContext'

const Home = () => {
  const [query, setQuery] = useState('')
  const { showAuthModal, setShowAuthModal } = useFavorites()
  const trending = useMemo(() => [...namesData].sort(() => 0.5 - Math.random()).slice(0, 8), [])
  const scrollRef = useRef(null)

  const results = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return namesData.filter(n =>
      n.english_name.toLowerCase().includes(q) ||
      n.arabic_name.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q)
    ).sort((a, b) => {
      const aName = a.english_name.toLowerCase()
      const bName = b.english_name.toLowerCase()
      const aStarts = aName.startsWith(q)
      const bStarts = bName.startsWith(q)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
      
      const aHas = aName.includes(q)
      const bHas = bName.includes(q)
      if (aHas && !bHas) return -1
      if (!aHas && bHas) return 1
      
      return 0
    }).slice(0, 6)
  }, [query])

  const scrollByAmount = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-800/20" />
          <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-800/20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-serif text-5xl sm:text-6xl text-emerald-900 dark:text-emerald-50 tracking-tight">
            Find a Name with Meaning.
          </motion.h1>
          <p className="mt-4 text-emerald-900/70 dark:text-emerald-100/70 max-w-2xl mx-auto">Serene, timeless, and rooted in tradition. Explore a curated collection of names with beautiful meanings.</p>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/60" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search names or meanings..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/70 dark:bg-emerald-900/30 backdrop-blur-xl border border-emerald-900/10 dark:border-emerald-100/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600" />
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(r => <NameCard key={`${r.english_name}-${r.gender}`} item={r} onOpen={() => {}} />)}
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/browse?gender=male" className="group rounded-3xl overflow-hidden bg-white dark:bg-emerald-900/30 shadow-md border border-emerald-900/10 dark:border-emerald-100/10">
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-white grid place-items-center shadow-md">
                  <Baby />
                </div>
                <h3 className="font-serif text-2xl mt-4 text-emerald-900 dark:text-emerald-50">Boy Names</h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 mt-1">Strong and noble choices.</p>
              </div>
            </Link>
            <Link to="/browse?gender=female" className="group rounded-3xl overflow-hidden bg-white dark:bg-emerald-900/30 shadow-md border border-emerald-900/10 dark:border-emerald-100/10">
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-white grid place-items-center shadow-md">
                  <Baby />
                </div>
                <h3 className="font-serif text-2xl mt-4 text-emerald-900 dark:text-emerald-50">Girl Names</h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 mt-1">Elegant and timeless picks.</p>
              </div>
            </Link>
            <Link to="/browse?prophetic=true" className="group rounded-3xl overflow-hidden bg-white dark:bg-emerald-900/30 shadow-md border border-emerald-900/10 dark:border-emerald-100/10">
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-white grid place-items-center shadow-md">
                  <BookOpen />
                </div>
                <h3 className="font-serif text-2xl mt-4 text-emerald-900 dark:text-emerald-50">Prophetic Names</h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 mt-1">Names of Prophets and companions.</p>
              </div>
            </Link>
          </div>

          <div className="mt-16 text-left">
            <h2 className="font-serif text-3xl text-emerald-900 dark:text-emerald-50 flex items-center gap-2"><Sparkles className="text-amber-600"/> Trending</h2>
            <div className="mt-4 relative">
              <button onClick={() => scrollByAmount(-1)} aria-label="Scroll left" className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 dark:bg-emerald-900/80 backdrop-blur border border-emerald-900/10 dark:border-emerald-100/10 shadow-lg grid place-items-center hover:scale-105 transition text-emerald-900 dark:text-emerald-50">
                <ChevronLeft className="w-6 h-6"/>
              </button>
              <div ref={scrollRef} className="overflow-x-auto no-scrollbar py-4 px-1">
                <div className="flex gap-4 min-w-max">
                  {trending.map(n => (
                    <div key={n.english_name} className="w-[220px]">
                      <NameCard item={n} onOpen={() => {}} variant="square" />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => scrollByAmount(1)} aria-label="Scroll right" className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 dark:bg-emerald-900/80 backdrop-blur border border-emerald-900/10 dark:border-emerald-100/10 shadow-lg grid place-items-center hover:scale-105 transition text-emerald-900 dark:text-emerald-50">
                <ChevronRight className="w-6 h-6"/>
              </button>
            </div>
          </div>
        </div>
      </section>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

export default Home
