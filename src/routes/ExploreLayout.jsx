import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LoginModal, Toast } from '../Compunents/Modals/Modals'

/**
 * Minimal layout for full-screen pages like ExploreMapScreen
 * that render their own header — no Navbar or Footer.
 */
export default function ExploreLayout() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <Outlet context={{ showToast, setLoginOpen }} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <Toast message={toast} />
    </>
  )
}
