import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MountainSnow, Menu, X } from 'lucide-react'

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: '/', hash: '#home', label: 'Home' },
    { to: '/', hash: '#explore', label: 'Explore Campsites' },
    { to: '/', hash: '#hosts', label: 'Hosts' },
    { to: '/', hash: '#adventures', label: 'Adventures' },
    { to: '/', hash: '#gallery', label: 'Gallery' },
    { to: '/', hash: '#contact', label: 'Contact' },
  ]

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setOpen(false)

    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      const el = document.querySelector(link.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to home first, then scroll after render
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(link.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-xl py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-deep-forest to-secondary-text flex items-center justify-center shadow-md shadow-deep-forest/10 group-hover:scale-105 transition-transform">
              <MountainSnow className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-slate-800 tracking-tight">Camp</span>
              <span className="text-xl font-bold gradient-text tracking-tight">Himalaya</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {links.map(l => (
              <a 
                key={l.label} 
                href={l.hash} 
                className="nav-link text-sm font-semibold text-slate-600 hover:text-secondary-text transition-colors" 
                onClick={(e) => handleNavClick(e, l)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={onLoginClick} className="text-sm font-semibold text-slate-600 hover:text-secondary-text transition-colors px-4 py-2">Login</button>
            <button className="btn-primary text-sm font-semibold text-white px-6 py-2.5 rounded-full">Register</button>
          </div>

          <button className="lg:hidden p-2 rounded-lg glass text-slate-700" onClick={() => setOpen(o => !o)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 space-y-4">
            {links.map(l => (
              <a key={l.label} href={l.hash} className="block text-base font-semibold text-slate-600 py-2 hover:text-secondary-text" onClick={(e) => handleNavClick(e, l)}>{l.label}</a>
            ))}
            <hr className="border-slate-150" />
            <button onClick={() => { setOpen(false); onLoginClick() }} className="w-full btn-secondary font-semibold py-3 rounded-full">Login</button>
            <button className="w-full btn-primary text-white font-semibold py-3 rounded-full">Register</button>
          </div>
        </div>
      )}
    </nav>
  )
}
