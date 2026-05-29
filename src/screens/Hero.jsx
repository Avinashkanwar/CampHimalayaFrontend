import { useState } from 'react'
import { Search, Tent, ArrowRight, HousePlus, ChevronDown, MapPin, Calendar, User } from 'lucide-react'

export default function Hero({ onExplore, onHost, onExploreCategory }) {
  const [search, setSearch] = useState('')
  const [dates, setDates] = useState('')
  const [guests, setGuests] = useState('')
  const [activeTab, setActiveTab] = useState('destination')

  return (
    <section id="home" className="relative min-h-screen hero-bg flex flex-col justify-center items-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="mountain-overlay" />

      {/* Floating background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary-text/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-rose/20 rounded-full animate-float delay-200" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-deep-forest/30 rounded-full animate-float delay-400" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto text-center flex flex-col items-center pt-8">
        {/* Hero Typography */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4 animate-fadeInUp delay-100 flex flex-wrap justify-center items-center gap-x-2">
            <span className="text-deep-forest">Discover</span>
            <span className="gradient-text">Himalayan Camping</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-650 max-w-2xl mx-auto mb-4 leading-relaxed animate-fadeInUp delay-200">
            Explore secret camping spots, mountain adventures, bonfires, trekking, and authentic nature experiences that most travelers never discover.
          </p>
        </div>

        {/* Clean Hipcamp-style Search Widget */}
        <div className="w-full max-w-5xl mx-auto mb-14 animate-fadeInUp delay-300">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100/90 relative z-20 text-left">
            
            {/* Tabs */}
            <div className="inline-flex bg-slate-100 p-1 rounded-full mb-6">
              <button
                onClick={() => setActiveTab('destination')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'destination'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-850'
                }`}
              >
                Destination
              </button>
              <button
                onClick={() => setActiveTab('roadtrip')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'roadtrip'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-850'
                }`}
              >
                Roadtrip
              </button>
            </div>

            {/* Input Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Destination */}
              <div className="border border-slate-300 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#E75A38]/15 focus-within:border-[#E75A38] transition-all duration-300 shadow-sm">
                <MapPin className="w-5 h-5 text-slate-800 shrink-0" />
                <div className="flex-grow">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search destinations"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="border border-slate-300 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#E75A38]/15 focus-within:border-[#E75A38] transition-all duration-300 shadow-sm">
                <Calendar className="w-5 h-5 text-slate-800 shrink-0" />
                <div className="flex-grow">
                  <input
                    type="text"
                    value={dates}
                    onChange={e => setDates(e.target.value)}
                    placeholder="Add dates"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="border border-slate-300 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#E75A38]/15 focus-within:border-[#E75A38] transition-all duration-300 shadow-sm">
                <User className="w-5 h-5 text-slate-800 shrink-0" />
                <div className="flex-grow">
                  <input
                    type="text"
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    placeholder="Add guests"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => onExplore(search)}
                className="w-full bg-[#E75A38] hover:bg-[#D64E2D] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E75A38]/15 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Explore Camps Shortcut Link */}
            <div className="mt-4 flex flex-wrap justify-between items-center px-2 pt-4 border-t border-slate-100/60">
              <span className="text-xs text-slate-400 font-medium">Looking for wild inspiration?</span>
              <button
                onClick={() => onExplore('')}
                className="text-xs font-bold text-deep-forest hover:text-[#E75A38] underline transition-all cursor-pointer flex items-center gap-1"
              >
                Explore All Campsites <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Three Beautiful Featured Category Explorer Cards (Grid layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-6 animate-fadeInUp delay-400">
          
          {/* Card 1: Camping Areas */}
          <div className="rounded-[2.2rem] overflow-hidden shadow-xl border border-slate-200/50 bg-white flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80"
                alt="Pristine Camping Areas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="bg-[#1E1E1E] p-6 flex flex-col justify-between flex-grow text-left">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 leading-none">
                  POPULAR RETREATS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-2 min-h-[44px]">
                  Explore pristine forest and riverside camping areas.
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => onExploreCategory('camps')}
                    className="bg-white hover:bg-slate-100 text-[#1E1E1E] font-black px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Explore camps
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Trekking Areas */}
          <div className="rounded-[2.2rem] overflow-hidden shadow-xl border border-slate-200/50 bg-white flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80"
                alt="Mountain Trekking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="bg-[#EE9D45] p-6 flex flex-col justify-between flex-grow text-left">
              <div>
                <span className="text-[10px] font-black text-[#2E1F0F]/70 uppercase tracking-widest block mb-2 leading-none">
                  ADVENTURE TRAILS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1E1205] leading-snug mt-2 min-h-[44px]">
                  Conquer legendary Himalayan trekking base camps.
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => onExploreCategory('treks')}
                    className="bg-[#1E1E1E] hover:bg-[#2E2E25] text-white font-black px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Explore treks
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Hidden Places */}
          <div className="rounded-[2.2rem] overflow-hidden shadow-xl border border-slate-200/50 bg-white flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop&q=80"
                alt="Secret Glamping Spots"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="bg-[#1E3E2F] p-6 flex flex-col justify-between flex-grow text-left">
              <div>
                <span className="text-[10px] font-black text-emerald-350 uppercase tracking-widest block mb-2 leading-none">
                  SECRET SPOTS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-2 min-h-[44px]">
                  Unwind in secret, hidden glamping paradises.
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => onExploreCategory('hidden')}
                    className="bg-white hover:bg-emerald-50 text-[#1E3E2F] font-black px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Explore hidden
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Down arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <a href="#explore" className="glass w-12 h-12 rounded-full flex items-center justify-center text-deep-forest hover:bg-card-bg transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  )
}
