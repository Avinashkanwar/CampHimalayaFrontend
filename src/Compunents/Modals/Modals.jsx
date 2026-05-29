import { X, MapPin, Star, Calendar, Users } from 'lucide-react'
import { TAG_COLORS } from '../../screens/data'

export function BookingModal({ camp, onClose, onBook }) {
  if (!camp) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 bg-white shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors z-10">
          <X className="w-6 h-6 text-slate-500" />
        </button>
        <div className="p-8">
          <img src={camp.image} alt={camp.name} className="w-full h-64 object-cover rounded-2xl mb-6" />
          <div className="flex flex-wrap gap-2 mb-4">
            {camp.tags.map(t => <span key={t} className={`tag-badge ${TAG_COLORS[t] || ''}`}>{t}</span>)}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 mb-2">{camp.name}</h2>
          <p className="text-slate-500 flex items-center mb-4"><MapPin className="w-5 h-5 mr-2 text-secondary-text" />{camp.location}</p>
          <div className="flex items-center space-x-2 mb-6">
            <Star className="w-5 h-5 text-secondary-text fill-current" />
            <span className="font-semibold text-slate-800">{camp.rating}</span>
            <span className="text-slate-500">({camp.reviews} reviews)</span>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">{camp.description}</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center"><Calendar className="w-5 h-5 mr-2 text-secondary-text" />Select Dates</h4>
              <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-deep-forest" />
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center"><Users className="w-5 h-5 mr-2 text-secondary-text" />Guests</h4>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-deep-forest">
                {[1,2,3,4,'5+'].map(n => <option key={n} value={n} className="text-slate-800">{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
          </div>
          <div className="bg-gradient-to-r from-deep-forest/10 to-rose/40 rounded-2xl p-6 border border-rose/30">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-500 text-sm">Price per night</p>
                <p className="text-3xl font-black text-deep-forest">₹{camp.price.toLocaleString()}</p>
              </div>
              <button onClick={() => onBook(camp.name)} className="btn-primary px-8 py-4 rounded-xl font-bold text-white text-lg">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="glass rounded-3xl max-w-md w-full relative z-10 bg-white shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <X className="w-6 h-6 text-slate-500" />
        </button>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-deep-forest to-secondary-text flex items-center justify-center">
              <span className="text-2xl">🏔️</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-800">Welcome Back</h3>
            <p className="text-slate-505 mt-2">Sign in to continue your adventure</p>
          </div>
          <form className="space-y-5" onSubmit={e => { e.preventDefault(); onClose() }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" required placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-805 placeholder-slate-450 focus:outline-none focus:border-deep-forest transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input type="password" required placeholder="Enter your password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 placeholder-slate-450 focus:outline-none focus:border-deep-forest transition-colors" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-secondary-text focus:ring-deep-forest" />
                <span className="text-slate-505">Remember me</span>
              </label>
              <a href="#" className="text-secondary-text hover:underline font-semibold">Forgot password?</a>
            </div>
            <button type="submit" className="w-full btn-primary py-3.5 rounded-xl font-bold text-white">Sign In</button>
          </form>
          <p className="text-center text-slate-505 text-sm mt-6">Don't have an account? <a href="#" className="text-secondary-text hover:underline font-semibold">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 right-6 glass px-6 py-4 rounded-xl shadow-2xl z-[200] animate-fadeInUp flex items-center space-x-3 bg-white border border-slate-200">
      <span className="text-secondary-text text-lg font-bold">✓</span>
      <span className="text-slate-850 font-semibold text-sm">{message}</span>
    </div>
  )
}

export function MapModal({ isOpen, onClose, searchText, mapType, setMapType, campsData, selectedCampId, filteredCamps, mapCoordinates, onMarkerClick }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Container Box */}
      <div className="glass rounded-[2rem] w-full h-[85vh] md:h-[90vh] max-w-6xl overflow-hidden relative z-10 bg-white shadow-2xl border border-slate-200/80 flex flex-col animate-scaleUp">
        
        {/* Modal Header */}
        <header className="h-16 border-b border-slate-100 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-left">
            <span className="w-2 h-2 rounded-full bg-[#EC5017] animate-ping" />
            <h3 className="font-display text-xs font-black text-slate-850 uppercase tracking-widest leading-none">
              Full Screen Map Directory
            </h3>
          </div>
          
          {/* Map style toggles inside header */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-slate-50 p-1 border border-slate-200 rounded-xl">
              <button 
                onClick={() => setMapType('m')}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  mapType === 'm' 
                    ? 'bg-deep-forest text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Roadmap
              </button>
              <button 
                onClick={() => setMapType('h')}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  mapType === 'h' 
                    ? 'bg-deep-forest text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Satellite
              </button>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </header>

        {/* Live Map Iframe Area */}
        <div className="flex-grow w-full h-full relative">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              selectedCampId 
                ? `${campsData.find(c => c.id === selectedCampId)?.name}, ${campsData.find(c => c.id === selectedCampId)?.location}, Himachal Pradesh` 
                : (searchText ? `${searchText}, Himachal Pradesh` : "Himachal Pradesh, India")
            )}&t=${mapType}&z=${selectedCampId ? 14 : 11}&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-none opacity-98"
            allowFullScreen=""
            loading="lazy"
            title="Himachal Camp Modal Map"
          />

          {/* Interactive Price Pins Overlay */}
          {filteredCamps.map((camp) => {
            const coords = mapCoordinates[camp.id] || { x: 50, y: 50 }
            const isSelected = selectedCampId === camp.id
            
            return (
              <div 
                key={camp.id}
                onClick={() => onMarkerClick(camp.id)}
                style={{ 
                  left: `${coords.x}%`, 
                  top: `${coords.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 cursor-pointer"
              >
                {/* Price Tag Badge */}
                <div 
                  className={`px-3 py-1.5 rounded-full font-black text-xs transition-all duration-300 shadow-xl flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#EC5017] text-white border-white scale-110 shadow-orange-500/40 ring-4 ring-[#EC5017]/25'
                      : 'bg-slate-900/90 text-white border-slate-700/80 hover:bg-[#EC5017] hover:border-white hover:scale-105'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ₹{camp.price.toLocaleString()}
                </div>
                
                {/* Pin Tail */}
                <div className={`w-2 h-2 rotate-45 mx-auto -mt-1 border-r border-b transition-colors duration-300 ${
                  isSelected 
                    ? 'bg-[#EC5017] border-white' 
                    : 'bg-slate-900 border-slate-700'
                }`} />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950/95 text-white text-[9px] font-extrabold px-3 py-2 rounded-xl whitespace-nowrap opacity-100 shadow-lg border border-slate-800">
                  {camp.name}
                  <span className="block text-[7.5px] text-slate-400 font-bold tracking-wide uppercase mt-0.5">{camp.location}</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
