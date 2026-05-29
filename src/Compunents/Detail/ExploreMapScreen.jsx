import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { MapPin, Star, ArrowLeft, SlidersHorizontal, Mountain, Compass, Map, Layers, ChevronRight, Calendar, Users, Search, MountainSnow, Plus, Minus } from 'lucide-react'
import { campsData } from '../../screens/data'
import { MapModal } from '../Modals/Modals'

export default function ExploreMapScreen() {
  const { category: urlCategory } = useParams()
  const navigate = useNavigate()
  const initialCategory = urlCategory || 'all'
  const [category, setCategory] = useState(initialCategory) // 'all', 'camps', 'treks', 'hidden'
  const [hoveredCampId, setHoveredCampId] = useState(null)
  const [selectedCampId, setSelectedCampId] = useState(null)
  const [searchParams] = useSearchParams()
  
  // Search state variables
  const [searchText, setSearchText] = useState(searchParams.get('q') || '')
  const [searchDates, setSearchDates] = useState(searchParams.get('date') || '')
  const [searchDuration, setSearchDuration] = useState(searchParams.get('duration') || '')
  const [searchGuests, setSearchGuests] = useState('')
  
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mapType, setMapType] = useState('h') // Default to 'h' (Satellite Hybrid)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const cardRefs = useRef({})

  // Synchronize category state when URL param changes
  useEffect(() => {
    setCategory(urlCategory || 'all')
  }, [urlCategory])

  // Filter camps based on category tab AND local search input
  const getFilteredCamps = () => {
    let camps = [...campsData]
    
    // 1. Direct Category Filtering
    if (category === 'camps') {
      // Show all camping-related areas directly
      camps = camps.filter(c => !c.category.includes('trekking'))
    } else if (category === 'treks') {
      // Show all trekking-related areas directly
      camps = camps.filter(c => c.category.includes('trekking'))
    } else if (category === 'hidden') {
      // Show hidden spots directly
      camps = camps.filter(c => c.category.includes('luxury') || c.tags.includes('Hidden Gem') || c.tags.includes('Mountain View'))
    }
    
    // 2. Filter by search destination input (filters directly by location query)
    if (searchText) {
      const q = searchText.toLowerCase()
      camps = camps.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q) || 
        c.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    return camps
  }

  const filteredCamps = getFilteredCamps()

  // Dynamic breadcrumbs and headers based on active category and searched location query
  const getHeaderInfo = () => {
    let locationSegment = 'Himachal'
    if (searchText.trim()) {
      const typed = searchText.trim()
      locationSegment = typed
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    switch (category) {
      case 'camps':
        return {
          breadcrumbs: `Explore / Himachal Pradesh / Camping / ${locationSegment}`,
          title: `Camping in ${locationSegment}`
        }
      case 'treks':
        return {
          breadcrumbs: `Explore / Himachal Pradesh / Trekking / ${locationSegment}`,
          title: `Trekking in ${locationSegment}`
        }
      case 'hidden':
        return {
          breadcrumbs: `Explore / Himachal Pradesh / Hidden / ${locationSegment}`,
          title: `Hidden Places in ${locationSegment}`
        }
      default:
        return {
          breadcrumbs: `Explore / Himachal Pradesh / All / ${locationSegment}`,
          title: `All Adventure Sites in ${locationSegment}`
        }
    }
  }

  const headerInfo = getHeaderInfo()

  // Map coordinates (scaled to container)
  const mapCoordinates = {
    1: { x: 42, y: 56, name: 'Tirthan Valley' },
    2: { x: 48, y: 44, name: 'Kasol Parvati' },
    3: { x: 74, y: 36, name: 'Spiti Valley' },
    4: { x: 22, y: 30, name: 'Khajjiar Meadows' },
    5: { x: 50, y: 15, name: 'High Leh Base' },
    6: { x: 80, y: 68, name: 'Auli Meadow Peaks' }
  }

  const handleMarkerClick = (campId) => {
    setSelectedCampId(campId)
    const cardEl = cardRefs.current[campId]
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden relative z-50 animate-fadeInFast">
      
      {/* 1. CLEAN TOP HEADER BAR */}
      <header className="h-20 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shrink-0 shadow-xs z-30">
        
        {/* Brand Logo (Left Side) */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-forest to-secondary-text flex items-center justify-center shadow-md shadow-deep-forest/5 group-hover:scale-105 transition-transform">
            <MountainSnow className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="text-left">
            <span className="text-lg font-black text-slate-800 tracking-tight block leading-none">Camp</span>
            <span className="text-sm font-bold text-[#EC5017] tracking-tight block mt-0.5 leading-none">Himalaya</span>
          </div>
        </button>



      </header>

      {/* 2. SPLIT SCREEN BODY */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden w-full h-[calc(100vh-80px)]">
        
        {/* LEFT COLUMN: Title, Search Widget, Tabs & List (Width: 40% for spacious listings) */}
        <div className="w-full lg:w-[40%] flex flex-col bg-white border-r border-slate-200/80 shadow-md h-full overflow-y-auto">
          
          {/* Header Title Info */}
          <div className="p-6 pb-2 shrink-0 text-left">
            
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-850 tracking-tight">
              {headerInfo.title}
            </h1>
            <p className="text-xs text-slate-450 mt-1 font-semibold">
              🌲 {filteredCamps.length} verified alpine adventure sites found in this category
            </p>

            {/* Direct, clean inputs directly on background with no cluttered outer card */}
            <div className="mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                              {/* Destination Input */}
                <div className="border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white hover:border-slate-350 focus-within:ring-4 focus-within:ring-[#EC5017]/10 focus-within:border-[#EC5017] transition-all text-left">
                  <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0 animate-pulse" />
                  <div className="flex-grow text-left">
                    <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block leading-none mb-1">Search destinations</span>
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Himachal Pradesh"
                      className="w-full bg-transparent text-xs font-bold text-slate-750 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dates Input */}
                <div className="border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white hover:border-slate-350 focus-within:ring-4 focus-within:ring-[#EC5017]/10 focus-within:border-[#EC5017] transition-all text-left">
                  <Calendar className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <div className="flex-grow text-left">
                    <span className="text-[9px] font-black text-slate-455 uppercase tracking-widest block leading-none mb-1">Add dates</span>
                    <input
                      type="text"
                      value={searchDates}
                      onChange={(e) => setSearchDates(e.target.value)}
                      placeholder="Add dates"
                      className="w-full bg-transparent text-xs font-bold text-slate-750 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Guests Input */}
                <div className="border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white hover:border-slate-350 focus-within:ring-4 focus-within:ring-[#EC5017]/10 focus-within:border-[#EC5017] transition-all text-left">
                  <Users className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <div className="flex-grow text-left">
                    <span className="text-[9px] font-black text-slate-455 uppercase tracking-widest block leading-none mb-1">Add guests</span>
                    <input
                      type="text"
                      value={searchGuests}
                      onChange={(e) => setSearchGuests(e.target.value)}
                      placeholder="Add guests"
                      className="w-full bg-transparent text-xs font-bold text-slate-750 focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* Scrollable Camp List */}
          <div className="flex-grow p-6 space-y-6">
            {filteredCamps.length > 0 ? (
              filteredCamps.map((camp, idx) => {
                const isSelected = selectedCampId === camp.id
                const isHovered = hoveredCampId === camp.id
                
                return (
                  <div 
                    key={camp.id}
                    ref={el => cardRefs.current[camp.id] = el}
                    onMouseEnter={() => setHoveredCampId(camp.id)}
                    onMouseLeave={() => setHoveredCampId(null)}
                    onClick={() => setSelectedCampId(camp.id)}
                    className={`p-4 rounded-[2rem] border transition-all duration-300 flex flex-col sm:flex-row gap-5 cursor-pointer ${
                      isSelected 
                        ? 'border-[#EC5017] bg-orange-50/5 shadow-md scale-[1.01]' 
                        : isHovered 
                        ? 'border-slate-300 bg-slate-50/20 shadow-sm'
                        : 'border-slate-200/80 bg-white shadow-xs'
                    }`}
                  >
                    {/* Camp Image */}
                    <div className="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden shrink-0">
                      <img src={camp.image} alt={camp.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Camp Meta */}
                    <div className="flex-grow flex flex-col justify-between text-left">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-display text-lg font-extrabold text-slate-805 leading-snug">
                            {camp.name}
                          </h3>
                          <div className="flex items-center gap-1 text-[#EC5017] shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-bold text-slate-800">{camp.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-500 text-xs flex items-center mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-[#EC5017]" />
                          {camp.location}
                        </p>

                        <p className="text-slate-450 text-xs columns-2 gap-4 mt-2 leading-relaxed font-medium">
                          {camp.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-4 pt-3 border-t border-slate-100">
                        <div>
                          <span className="text-lg font-black text-[#EC5017]">₹{camp.price.toLocaleString()}</span>
                          <span className="text-slate-400 text-[10px] font-bold"> / night</span>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/camp/${camp.id}`)
                          }}
                          className="bg-[#EC5017] hover:bg-[#ff6229] text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                        >
                          View Details
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="text-base font-semibold">No campsites found in this category.</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Google Maps (Width: 60% for sleek, real-world geographical precision) */}
        <div className="w-full lg:w-[60%] h-full bg-slate-50 overflow-hidden relative flex flex-col items-center justify-center border-l border-slate-200">
          
          {/* Map Layer Indicators */}
          <div className="absolute top-6 left-6 z-20 flex gap-2">
            <div className="bg-white/90 backdrop-blur-md text-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 shadow-md">
              <Map className="w-3.5 h-3.5 text-[#EC5017]" />
              <span className="text-[9px] font-black uppercase tracking-wider">Google Maps Live</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md text-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-black uppercase tracking-wider">Himachal Region</span>
            </div>
          </div>

          {/* Interactive Map Style Selector */}
          <div className="absolute top-6 right-6 z-20 flex gap-1.5 bg-white/95 backdrop-blur-md p-1 border border-slate-200 rounded-xl shadow-lg">
            <button 
              onClick={() => setMapType('m')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                mapType === 'm' 
                  ? 'bg-deep-forest text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🗺️ Roadmap
            </button>
            <button 
              onClick={() => setMapType('h')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                mapType === 'h' 
                  ? 'bg-deep-forest text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🛰️ Satellite
            </button>
          </div>

          {/* Maximize Map Buttons Overlay */}
          <button
            onClick={() => setIsMapModalOpen(true)}
            className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-white hover:scale-102 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer font-bold text-[10px] uppercase tracking-wider"
          >
            <Compass className="w-4 h-4 text-[#EC5017] animate-spin-slow" />
            Full Screen Map
          </button>

          <button
            onClick={() => setIsMapModalOpen(true)}
            className="absolute bottom-6 right-6 z-20 bg-slate-900/90 backdrop-blur-sm hover:bg-slate-950 text-white border border-slate-800 hover:scale-102 px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg cursor-pointer transition-all font-bold text-[9px] uppercase tracking-wider"
          >
            🗖 Maximize
          </button>

          {/* Live Google Maps Iframe with Interactive Price Pins Overlay */}
          <div className="w-full h-full relative">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedCampId 
                  ? `${campsData.find(c => c.id === selectedCampId)?.name}, ${campsData.find(c => c.id === selectedCampId)?.location}, Himachal Pradesh` 
                  : (searchText ? `${searchText}, Himachal Pradesh` : "Himachal Pradesh, India")
              )}&t=${mapType}&z=${selectedCampId ? 14 : 11}&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-none opacity-95 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen=""
              loading="lazy"
              title="Himachal Camp Directory Map"
            />

            {/* Price Tags Overlay */}
            {filteredCamps.map((camp) => {
              const coords = mapCoordinates[camp.id] || { x: 50, y: 50 }
              const isHovered = hoveredCampId === camp.id
              const isSelected = selectedCampId === camp.id
              
              return (
                <div 
                  key={camp.id}
                  onClick={() => handleMarkerClick(camp.id)}
                  style={{ 
                    left: `${coords.x}%`, 
                    top: `${coords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 group cursor-pointer"
                >
                  {/* Floating Price Badge */}
                  <div 
                    className={`px-3 py-1.5 rounded-full font-black text-xs transition-all duration-300 shadow-xl flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#EC5017] text-white border-white scale-110 shadow-orange-500/40 ring-4 ring-[#EC5017]/25'
                        : isHovered
                        ? 'bg-[#EC5017] text-white border-white scale-110 shadow-orange-500/40 ring-4 ring-[#EC5017]/20'
                        : 'bg-slate-900/90 text-white border-slate-700/80 hover:bg-[#EC5017] hover:border-white hover:scale-105'
                    }`}
                  >
                    <Compass className={`w-3.5 h-3.5 shrink-0 ${isSelected || isHovered ? 'animate-spin' : ''}`} />
                    ₹{camp.price.toLocaleString()}
                  </div>
                  
                  {/* Pin Tail */}
                  <div className={`w-2 h-2 rotate-45 mx-auto -mt-1 border-r border-b transition-colors duration-300 ${
                    isSelected || isHovered 
                      ? 'bg-[#EC5017] border-white' 
                      : 'bg-slate-900 border-slate-700'
                  }`} />

                  {/* Tooltip text */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-white text-[10px] font-extrabold px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg border border-slate-800 ${
                    isSelected || isHovered ? 'opacity-100' : ''
                  }`}>
                    {camp.name}
                    <span className="block text-[8px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">{camp.location}</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

      {/* Full Screen Google Map Modal */}
      <MapModal 
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        searchText={searchText}
        mapType={mapType}
        setMapType={setMapType}
        campsData={campsData}
        selectedCampId={selectedCampId}
        filteredCamps={filteredCamps}
        mapCoordinates={mapCoordinates}
        onMarkerClick={handleMarkerClick}
      />

    </div>
  )
}
