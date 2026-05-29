import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'
import CampsSection from '../Compunents/Camp/CampsSection'
import HostSection from '../Compunents/Host/HostSection'
import AdventureSection from './AdventureSection'
import GallerySection from '../Compunents/Gallery/GallerySection'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleExplore = (q) => {
    setSearchQuery(q)
    setTimeout(() => {
      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
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
      <HostSection />
      <CampsSection searchQuery={searchQuery} />
      <AdventureSection />
      <GallerySection />
    </>
  )
}
