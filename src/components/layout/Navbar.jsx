import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Heart, BookOpen, Sun, Moon, User, LogOut } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../AuthModal'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'text-emerald-900 bg-emerald-50 dark:text-emerald-50 dark:bg-emerald-900/30' : 'text-emerald-900/80 hover:text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100/80 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/30'
  }`

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur-xl bg-white/60 dark:bg-emerald-950/40 border-b border-emerald-900/10 dark:border-emerald-100/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-900 text-white grid place-items-center font-bold shadow-lg shadow-emerald-900/10">ن</div>
                <span className="font-serif text-lg text-emerald-900 dark:text-emerald-50 tracking-wide">NoorNames</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
              <NavLink to="/favorites" className={navLinkClass}><Heart className="w-4 h-4 mr-1 inline"/> Favorites</NavLink>
              <NavLink to="/etiquette" className={navLinkClass}><BookOpen className="w-4 h-4 mr-1 inline"/> Naming Rules</NavLink>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} aria-label="Toggle theme" className="hidden md:inline-flex p-2 rounded-md text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/40">
                {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
              </button>
              {user ? (
                <>
                  <NavLink to="/profile" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/40">
                    <User className="w-4 h-4" />
                    Profile
                  </NavLink>
                  <button onClick={signOut} className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/40">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="hidden md:inline-flex px-4 py-2 rounded-md text-sm font-medium bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-100 dark:text-emerald-900 dark:hover:bg-emerald-200">
                  Sign In
                </button>
              )}
              <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/40">
                {open ? <X/> : <Menu/>}
              </button>
            </div>
          </div>
          {open && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-emerald-900/80 dark:text-emerald-100/80 px-1">Menu</div>
                  <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100 dark:hover:bg-emerald-900/40">
                    {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                  </button>
                </div>
                <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
                <NavLink to="/browse" onClick={() => setOpen(false)} className={navLinkClass}>Browse</NavLink>
                <NavLink to="/favorites" onClick={() => setOpen(false)} className={navLinkClass}><Heart className="w-4 h-4 mr-1 inline"/> Favorites</NavLink>
                <NavLink to="/etiquette" onClick={() => setOpen(false)} className={navLinkClass}><BookOpen className="w-4 h-4 mr-1 inline"/> Naming Rules</NavLink>
                {user ? (
                  <>
                    <NavLink to="/profile" onClick={() => setOpen(false)} className={navLinkClass}><User className="w-4 h-4 mr-1 inline"/> Profile</NavLink>
                    <button onClick={() => { signOut(); setOpen(false); }} className="px-3 py-2 rounded-md text-sm font-medium text-left text-emerald-900/80 hover:text-emerald-900 hover:bg-emerald-50 dark:text-emerald-100/80 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/30">
                      <LogOut className="w-4 h-4 mr-1 inline"/> Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setShowAuthModal(true); setOpen(false); }} className="px-3 py-2 rounded-md text-sm font-medium text-left bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-100 dark:text-emerald-900 dark:hover:bg-emerald-200">
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  )
}

export default Navbar
