import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react'
import { campsData, TAG_COLORS } from '../../screens/data'

function CampCard({ camp }) {
  const navigate = useNavigate()
  return (
    <div 
      onClick={() => navigate(`/explore/all?q=${encodeURIComponent(camp.location)}`)} 
      className="camp-card flex-none w-[85vw] md:w-auto snap-start group relative h-80 rounded-[2.2rem] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-350 cursor-pointer"
    >
      {/* Background Image */}
      <img 
        src={camp.image} 
        alt={camp.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />

      {/* Floating Map Thumbnail Overlay */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-xl shadow-lg z-10 overflow-hidden border-2 border-white cursor-pointer group/map hover:scale-110 transition-all shadow-black/20">
        <img 
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=150&h=150&fit=crop" 
          alt="Map preview" 
          className="w-full h-full object-cover opacity-90 group-hover/map:scale-125 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[#EC5017] drop-shadow-md" fill="white" />
        </div>
      </div>

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
  const navigate = useNavigate()

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

  const forestCamping = filteredCamps.filter(c => c.category.includes('forest'))
  const tentCamping = filteredCamps.filter(c => c.category.includes('popular') || c.category.includes('all'))
  const riversideCamping = filteredCamps.filter(c => c.category.includes('river'))

  const hasResults = filteredCamps.length > 0

  return (
    <section id="explore" className="py-16 bg-mint relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!hasResults && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">No campsites found matching your search. Try another query!</p>
          </div>
        )}

        {/* Discover Top Spots Section */}
        {hasResults && (
          <div className="mb-20 reveal">
            <div className="text-left mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-3">
                Local Favorites
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-850 mb-2">
                Discover top spots near you
              </h2>
              <p className="text-slate-500 text-base max-w-2xl">
                Explore the best-rated camping destinations and beautiful wilderness areas around you.
              </p>
            </div>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
              {filteredCamps.map(c => <CampCard key={c.id} camp={c} />)}
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  )
}
