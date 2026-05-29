import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../screens/Navbar'
import Footer from '../screens/Footer'
import { LoginModal, Toast } from '../Compunents/Modals/Modals'

export default function Layout() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="antialiased">
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      
      {/* Outlet renders the matched child route */}
      <Outlet context={{ showToast, setLoginOpen }} />

      <Footer />

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <Toast message={toast} />
    </div>
  )
}
