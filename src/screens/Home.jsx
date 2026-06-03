import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'
import CampsSection from '../Compunents/Camp/CampsSection'
import HostSection from '../Compunents/Host/HostSection'
import GallerySection from '../Compunents/Gallery/GallerySection'
import DestinationsSection from '../Compunents/Destinations/DestinationsSection'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleExplore = (params) => {
    // Extract values whether it's an object from the Search button or a string from the text link
    const q = typeof params === 'object' ? params.search : params
    const cat = typeof params === 'object' ? params.category : 'all'
    const date = typeof params === 'object' ? params.date : ''
    const duration = typeof params === 'object' ? params.duration : ''

    const query = new URLSearchParams()
    if (q) query.set('q', q)
    if (date) query.set('date', date)
    if (duration) query.set('duration', duration)
    
    navigate(`/explore/${cat || 'all'}?${query.toString()}`)
  }

  const handleHost = () => {
    setTimeout(() => {
      document.getElementById('hosts')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleExploreCategory = (cat) => {
    navigate(`/explore/${cat}`)
  }

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero 
        onExplore={handleExplore} 
        onHost={handleHost} 
        onExploreCategory={handleExploreCategory}
      />
      <DestinationsSection />
      <HostSection />
      <CampsSection searchQuery={searchQuery} />
      <GallerySection />
    </>
  )
}
