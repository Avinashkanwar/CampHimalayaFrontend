import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes({ isAuthenticated })}
      </Routes>
    </BrowserRouter>
  )
}
