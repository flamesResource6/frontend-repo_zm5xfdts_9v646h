import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { VirtuosoGrid } from 'react-virtuoso'
import { namesData, alpha } from '../data/namesData'
import NameCard from '../components/NameCard'
import NameDetailModal from '../components/NameDetailModal'
import AuthModal from '../components/AuthModal'
import { useFavorites } from '../context/FavoritesContext'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Browse = () => {
  const qs = useQuery()
  const [gender, setGender] = useState(qs.get('gender') || 'all')
  const [letter, setLetter] = useState('All')
  const [pop, setPop] = useState('desc')
  const [open, setOpen] = useState(null)
  const { showAuthModal, setShowAuthModal } = useFavorites()

  const filtered = useMemo(() => {
    let arr = [...namesData]
    if (gender !== 'all') arr = arr.filter(n => n.gender === gender || (gender === 'unisex' && n.gender === 'unisex'))
    if (letter !== 'All') arr = arr.filter(n => n.english_name.startsWith(letter))
    arr.sort((a, b) => pop === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity)
    return arr
  }, [gender, letter, pop])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        <aside className="lg:col-span-1 space-y-6 h-fit">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Gender</h3>
            <div className="flex gap-2 flex-wrap">
              {['all','male','female','unisex'].map(g => (
                <button key={g} onClick={() => setGender(g)} className={`px-3 py-1.5 rounded-full text-sm border ${gender===g?'bg-emerald-900 text-white border-emerald-900':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>{g}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Alphabet</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setLetter('All')} className={`px-3 py-1.5 rounded-md text-sm border ${letter==='All'?'bg-emerald-900 text-white border-emerald-900':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>All</button>
              {alpha.map(l => (
                <button key={l} onClick={() => setLetter(l)} className={`w-8 h-8 rounded-md text-sm border ${letter===l?'bg-emerald-900 text-white border-emerald-900':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-100/10 dark:shadow-black/20">
            <h3 className="font-serif text-xl text-emerald-900 mb-3 dark:text-emerald-50">Popularity</h3>
            <div className="flex gap-2">
              {[
                {k:'desc', label:'High to Low'},
                {k:'asc', label:'Low to High'}
              ].map(o => (
                <button key={o.k} onClick={() => setPop(o.k)} className={`px-3 py-1.5 rounded-full text-sm border ${pop===o.k?'bg-amber-600 text-white border-amber-600':'border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-100/20 dark:text-emerald-100 dark:hover:bg-emerald-800/40'}`}>{o.label}</button>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 h-[600px] lg:h-auto">
          <VirtuosoGrid
            style={{ height: '100%' }}
            totalCount={filtered.length}
            overscan={200}
            components={{
              List: React.forwardRef(({ style, children, ...props }, ref) => (
                <div
                  ref={ref}
                  {...props}
                  style={style}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {children}
                </div>
              )),
              Item: ({ children, ...props }) => (
                <div {...props} className="h-full">
                  {children}
                </div>
              )
            }}
            itemContent={(index) => {
              const item = filtered[index]
              return <NameCard key={`${item.english_name}-${item.gender}`} item={item} onOpen={(it) => setOpen(it)} />
            }}
          />
        </main>
      </div>

      {open && <NameDetailModal item={open} onClose={() => setOpen(null)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}

export default Browse
