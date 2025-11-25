import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

const Home = lazy(() => import('./pages/Home'))
const Browse = lazy(() => import('./pages/Browse'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Etiquette = lazy(() => import('./pages/Etiquette'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Layout>
          <Suspense fallback={<div className="min-h-screen grid place-items-center"><div className="w-8 h-8 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/etiquette" element={<Etiquette />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
          </Layout>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
