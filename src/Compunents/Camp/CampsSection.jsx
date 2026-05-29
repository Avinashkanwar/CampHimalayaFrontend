import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react'
import { campsData, TAG_COLORS } from '../../screens/data'

function CampCard({ camp }) {
  const navigate = useNavigate()
  return (
    <div 
      onClick={() => navigate(`/camp/${camp.id}`)} 
      className="camp-card group relative h-80 rounded-[2.2rem] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-350 cursor-pointer"
    >
      {/* Background Image */}
      <img 
        src={camp.image} 
        alt={camp.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />

      {/* Dark Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity duration-300" />

      {/* Overlay Content Box */}
      <div className="absolute bottom-6 left-6 right-6 text-left">
        <h3 className="font-display text-2xl font-black text-white leading-tight mb-2 tracking-tight">
          {camp.name}
        </h3>
        
        <div className="flex justify-between items-center mt-2.5">
          <p className="text-slate-200 text-xs font-semibold flex items-center tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#EC5017] shrink-0 animate-pulse" />
            {camp.location}
          </p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/explore/all?q=${encodeURIComponent(camp.name)}`)
            }}
            className="text-[10px] font-extrabold text-white uppercase bg-[#EC5017] px-3 py-1.5 rounded-full flex items-center gap-1 group-hover:bg-[#ff6229] transition-colors duration-300 shadow-sm shadow-[#EC5017]/10 cursor-pointer"
          >
            Explore <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CampsSection({ searchQuery }) {
  // Apply global search filter if present
  const filteredCamps = campsData.filter(c => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    )
  })

  // Distribute into 3 distinct sections
  const campingAreas = filteredCamps.filter(c => c.category.includes('forest') || c.category.includes('river') || c.category.includes('budget'))
  const trekkingAreas = filteredCamps.filter(c => c.category.includes('trekking'))
  const scenicPlaces = filteredCamps.filter(c => c.category.includes('luxury') || c.tags.includes('Hidden Gem') || c.tags.includes('Mountain View'))

  const hasResults = campingAreas.length > 0 || trekkingAreas.length > 0 || scenicPlaces.length > 0

  return (
    <section id="explore" className="py-16 bg-mint relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!hasResults && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">No campsites found matching your search. Try another query!</p>
          </div>
        )}

        {/* 1. Camping Areas Section */}
        {campingAreas.length > 0 && (
          <div className="mb-20 reveal">
            <div className="text-left mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-3">
                Forest & River Camps
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-850 mb-2">
                Explore Camping Areas
              </h2>
              <p className="text-slate-500 text-base max-w-2xl">
                Discover handpicked pristine campsites nestled inside quiet woodlands and alongside refreshing high mountain streams.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campingAreas.map(c => <CampCard key={c.id} camp={c} />)}
            </div>
          </div>
        )}

        {/* 2. Trekking Areas Section */}
        {trekkingAreas.length > 0 && (
          <div className="mb-20 reveal">
            <div className="text-left mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-3">
                High Altitude Bases
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-850 mb-2">
                Trekking Areas
              </h2>
              <p className="text-slate-500 text-base max-w-2xl">
                Basecamps for legendary trails, ski destinations, and mountain slopes designed for the true explorer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trekkingAreas.map(c => <CampCard key={c.id} camp={c} />)}
            </div>
          </div>
        )}

        {/* 3. Scenic Places Section */}
        {scenicPlaces.length > 0 && (
          <div className="reveal">
            <div className="text-left mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-3">
                Glamping & Panorama
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-850 mb-2">
                Hidden Places
              </h2>
              <p className="text-slate-500 text-base max-w-2xl">
                Unforgettable glamping tents under starry high skies, snow-covered views, and stunning landscapes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenicPlaces.map(c => <CampCard key={c.id} camp={c} />)}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
