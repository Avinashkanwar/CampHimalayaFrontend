import { useState } from 'react'
import { Search, Tent, ArrowRight, HousePlus, ChevronDown, MapPin, Calendar, User } from 'lucide-react'

export default function Hero({ onExplore, onHost, onExploreCategory }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('trekking')
  const [date, setDate] = useState('')
  const [whoExploring, setWhoExploring] = useState('')
  const [activeTab, setActiveTab] = useState('destination')

  return (
    <section id="home" className="relative hero-bg flex flex-col justify-center items-center overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8">
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
            <span className="text-deep-forest">Explore</span>
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

              {/* Category */}
              <div className="border border-slate-300 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#E75A38]/15 focus-within:border-[#E75A38] transition-all duration-300 shadow-sm">
                <Tent className="w-5 h-5 text-slate-800 shrink-0" />
                <div className="flex-grow">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden>Exploring Type</option>
                    <option value="camping">Camping</option>
                    <option value="trekking">Trekking</option>
                  </select>
                </div>
              </div>

              {/* Dynamic 3rd Input: Date vs Who Exploring */}
              <div className="border border-slate-300 rounded-xl px-4 py-3.5 flex items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#E75A38]/15 focus-within:border-[#E75A38] transition-all duration-300 shadow-sm">
                {category === 'trekking' || category === 'hidden' ? (
                  <User className="w-5 h-5 text-slate-800 shrink-0" />
                ) : (
                  <Calendar className="w-5 h-5 text-slate-800 shrink-0" />
                )}
                <div className="flex-grow">
                  {category === 'trekking' || category === 'hidden' ? (
                    <select
                      value={whoExploring}
                      onChange={e => setWhoExploring(e.target.value)}
                      className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Who's exploring?</option>
                      <option value="solo">Solo</option>
                      <option value="friends">Friends</option>
                      <option value="kids">Kids</option>
                      <option value="couples">Couples</option>
                      <option value="group">Group</option>
                    </select>
                  ) : (
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none text-sm font-semibold leading-normal"
                    />
                  )}
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => {
                  if (!search.trim() || !category) {
                    alert('Please enter a destination and select a category.')
                    return
                  }
                  onExplore({ 
                    search, 
                    category, 
                    date: (category === 'camping' || !category) ? date : '',
                    duration: (category === 'trekking' || category === 'hidden') ? whoExploring : '' 
                  })
                }}
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

        {/* Featured Categories Heading */}
        <div className="w-full max-w-6xl mx-auto text-left mb-4 animate-fadeInUp delay-400 px-2 sm:px-0">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-850">
            Popular Camping & Trekking Types
          </h2>
        </div>

        {/* Two Featured Category Explorer Cards */}
        <div className="flex sm:grid sm:grid-cols-2 gap-6 w-full max-w-6xl mx-auto mb-6 animate-fadeInUp delay-400 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          {/* Card 1: Explore Camping */}
          <div 
            onClick={() => onExploreCategory('camping')}
            className="flex-none w-[80vw] sm:w-auto snap-start rounded-[2.2rem] overflow-hidden shadow-xl border border-slate-200/50 bg-white flex flex-col group cursor-pointer"
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&auto=format&fit=crop&q=80"
                alt="Explore Camping"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="bg-[#1E3E2F] p-6 flex flex-col justify-between flex-grow text-left">
              <div>
                <span className="text-[10px] font-black text-emerald-350 uppercase tracking-widest block mb-2 leading-none">
                  WILDERNESS STAYS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-2 min-h-[44px]">
                  Explore Camping
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => onExploreCategory('camping')}
                    className="bg-white hover:bg-emerald-50 text-[#1E3E2F] font-black px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Explore Camping
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Explore Trekking */}
          <div 
            onClick={() => onExploreCategory('trekking')}
            className="flex-none w-[80vw] sm:w-auto snap-start rounded-[2.2rem] overflow-hidden shadow-xl border border-slate-200/50 bg-white flex flex-col group cursor-pointer"
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
                alt="Explore Trekking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="bg-[#EE9D45] p-6 flex flex-col justify-between flex-grow text-left">
              <div>
                <span className="text-[10px] font-black text-[#2E1F0F]/70 uppercase tracking-widest block mb-2 leading-none">
                  MOUNTAIN ADVENTURES
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1E1205] leading-snug mt-2 min-h-[44px]">
                  Explore Trekking
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => onExploreCategory('trekking')}
                    className="bg-[#1E1E1E] hover:bg-[#2E2E25] text-white font-black px-5 py-2.5 rounded-full text-xs transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Explore Trekking
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
