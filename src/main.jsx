import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Quiz from './Quiz'
import './index.css'
import 'leaflet/dist/leaflet.css'

function Router() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#/quiz') return <Quiz />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
