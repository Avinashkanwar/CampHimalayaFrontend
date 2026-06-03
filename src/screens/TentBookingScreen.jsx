import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, Search, Star, ArrowRight, Users, Compass, Tent } from 'lucide-react'
import { campsData } from './data'

export default function TentBookingScreen() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [tools, setTools] = useState('Tent')
  const [duration, setDuration] = useState('2')
  const [searchQuery, setSearchQuery] = useState({ location: '', tools: '' })

  const handleSearch = (e) => {
    e.preventDefault()
    if (!location.trim()) {
      alert('Please enter a location (e.g., Manali, Spiti).')
      return
    }
    if (!tools) {
      alert('Please select a tent or extra tool preference.')
      return
    }
    setSearchQuery({ location, tools })
  }

  // Use campsData to simulate available tents and filter by search query
  const availableTents = campsData.filter(camp => {
    if (!searchQuery.location) return true
    const q = searchQuery.location.toLowerCase()
    
    // We filter by location. (For demo purposes, we assume all these premium camps can provide the selected tools)
    return (
      camp.name.toLowerCase().includes(q) ||
      camp.location.toLowerCase().includes(q) ||
      camp.tags.some(t => t.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-screen bg-mint pt-32 pb-20">
      
      {/* Simple Search Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-forest mb-4">
            Find Tents and Sleeping Bags
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Search for available tents hosted by verified local owners.
          </p>
        </div>

        {/* Search Widget */}
        <form onSubmit={handleSearch} className="max-w-5xl mx-auto glass rounded-3xl p-4 border border-slate-200/60 bg-white/80 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Location Input */}
          <div className="w-full bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-300 focus-within:ring-2 focus-within:ring-[#E75A38]/30 transition-all shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-slate-800" />
            </div>
            <div className="text-left flex-grow">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Where</label>
              <input 
                type="text" 
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Search locations..." 
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* Tools Input */}
          <div className="w-full bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-300 focus-within:ring-2 focus-within:ring-[#E75A38]/30 transition-all shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
              <Tent className="w-4 h-4 text-slate-800" />
            </div>
            <div className="text-left flex-grow">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Other</label>
              <select
                value={tools}
                onChange={e => setTools(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="" disabled hidden>Select Other</option>
                <option value="Tent">Tent</option>
                <option value="Sleeping Bags">Sleeping Bags</option>
              </select>
            </div>
          </div>

          {/* Duration Input */}
          <div className="w-full bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-300 focus-within:ring-2 focus-within:ring-[#E75A38]/30 transition-all shadow-sm">
            <div className="text-left flex-grow px-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Clock className="w-3 h-3" /> Duration
              </label>
              <select 
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer mt-0.5"
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5+ Days</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#E75A38] hover:bg-[#D64E2D] text-white rounded-xl px-8 py-4 flex items-center justify-center gap-2 font-bold shadow-lg shadow-[#E75A38]/15 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Available Tents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">
          {searchQuery.location ? `Tents in "${searchQuery.location}" with ${searchQuery.tools}` : "Available Tents Nearby"}
        </h2>
        
        {availableTents.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No tents found for "{searchQuery.location}". Try a different location like "Spiti" or "Manali"!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableTents.map((camp) => (
            <div 
              key={camp.id} 
              onClick={() => navigate(`/camp/${camp.id}`)}
              className="group glass bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:border-deep-forest/30 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <img 
                  src={camp.image} 
                  alt={camp.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                  ★ {camp.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider mb-1 block line-clamp-1">
                    Camp Himalaya Verified Host
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-slate-850 leading-tight mb-2 line-clamp-1">
                  {camp.name} Tent
                </h3>
                
                <p className="text-slate-500 text-xs font-medium flex items-center mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose shrink-0" />
                  <span className="line-clamp-1">{camp.location}</span>
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-deep-forest">₹{camp.price.toLocaleString()}</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider"> / day</span>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Sleeping Bags Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Available Sleeping Bags Nearby</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'Arctic Explorer -20°C', owner: 'Rahul Treks', location: 'Manali, HP', price: 400, rating: '4.8', reviews: 42, image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?q=80&w=600&auto=format&fit=crop' },
            { id: 2, name: 'Cozy Camp 5°C', owner: 'Spiti Rentals', location: 'Kaza, Spiti', price: 250, rating: '4.5', reviews: 28, image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?q=80&w=600&auto=format&fit=crop' },
            { id: 3, name: 'Pro Alpine 0°C', owner: 'Himalayan Gear', location: 'Leh, Ladakh', price: 350, rating: '4.9', reviews: 65, image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop' },
            { id: 4, name: 'Lightweight Trekker', owner: 'Camp Himalaya', location: 'Shimla, HP', price: 300, rating: '4.7', reviews: 15, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop' },
          ].map((bag) => (
            <div 
              key={bag.id} 
              className="group glass bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:border-deep-forest/30 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <img 
                  src={bag.image} 
                  alt={bag.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                  ★ {bag.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider mb-1 block">
                    {bag.owner}
                  </span>
                </div>
                
                <h3 className="font-display text-lg font-bold text-slate-850 leading-tight mb-2">
                  {bag.name}
                </h3>
                
                <p className="text-slate-500 text-xs font-medium flex items-center mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose" />
                  {bag.location}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-deep-forest">₹{bag.price}</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider"> / day</span>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
