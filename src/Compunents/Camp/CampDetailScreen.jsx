import { useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { Star, MapPin, Calendar, Users, ArrowLeft, Check, Compass, Coffee, Flame, ShieldCheck, CloudSun, Mountain, Award } from 'lucide-react'
import { campsData, TAG_COLORS, galleryData } from '../../screens/data'

export default function CampDetailScreen() {
  const { campId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useOutletContext()

  // Find the camp by ID from route params
  const camp = campsData.find(c => c.id === Number(campId))

  const [nights, setNights] = useState(2)
  const [guests, setGuests] = useState(2)
  const [booked, setBooked] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2026-06-15')

  if (!camp) {
    return (
      <div className="min-h-screen bg-mint pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-slate-800 mb-4">Camp Not Found</h2>
          <p className="text-slate-500 mb-6">The campsite you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 rounded-xl font-semibold text-white">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const basePrice = camp.price
  const serviceFee = 499
  const totalAmount = basePrice * nights * guests + serviceFee

  const amenities = [
    { icon: <Flame className="w-5 h-5 text-secondary-text" />, label: 'Bonfire & BBQ', desc: 'Included every evening' },
    { icon: <Compass className="w-5 h-5 text-secondary-text" />, label: 'Trekking Guides', desc: 'Local experienced experts' },
    { icon: <Coffee className="w-5 h-5 text-secondary-text" />, label: 'Warm Meals', desc: 'Authentic local cuisine' },
    { icon: <ShieldCheck className="w-5 h-5 text-secondary-text" />, label: 'Safety Verified', desc: 'Certified camping space' },
    { icon: <CloudSun className="w-5 h-5 text-secondary-text" />, label: 'Alpine Weather Info', desc: 'Real-time forecast alerts' },
    { icon: <Mountain className="w-5 h-5 text-secondary-text" />, label: 'Scenic Viewpoint', desc: 'Panoramic mountain vistas' },
  ]

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setBooked(true)
    setTimeout(() => {
      showToast(`Booking initiated for ${camp.name}! Redirecting to payment...`)
      navigate('/')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-mint pt-10 pb-20 relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-deep-forest/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {booked ? (
          <div className="max-w-xl mx-auto text-center py-20 glass rounded-3xl border border-slate-200 p-8 bg-white shadow-xl">
            <div className="w-20 h-20 mx-auto bg-rose rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-deep-forest" />
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-800 mb-4">Booking Success!</h2>
            <p className="text-slate-500 mb-6">
              Your request for <span className="text-slate-800 font-bold">{camp.name}</span> has been confirmed. Get ready for your stellar Himalayan journey!
            </p>
            <p className="text-xs text-secondary-text animate-pulse font-semibold">Redirecting to checkout & invoice details...</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content (Details) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image & Title Header */}
              <div className="relative h-[280px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
                <img src={camp.image} alt={camp.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {camp.tags.map(t => (
                      <span key={t} className={`tag-badge ${TAG_COLORS[t] || 'bg-slate-500/20 text-slate-650'}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{camp.name}</h1>
                  <p className="text-gray-305 flex items-center text-sm sm:text-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-rose" />
                    {camp.location}
                  </p>
                </div>
              </div>

              {/* Highlights Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass rounded-2xl border border-slate-200/60 bg-white">
                <div className="text-center p-3">
                  <span className="text-xs text-slate-400 block mb-1">Elevation</span>
                  <span className="text-slate-800 font-bold text-lg">8,250 ft</span>
                </div>
                <div className="text-center p-3 border-l border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Campsite Rating</span>
                  <span className="text-secondary-text font-bold text-lg flex items-center justify-center">
                    <Star className="w-4 h-4 fill-current mr-1 text-secondary-text" />
                    {camp.rating}
                  </span>
                </div>
                <div className="text-center p-3 border-l border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Best Season</span>
                  <span className="text-slate-800 font-bold text-lg">Mar - Nov</span>
                </div>
                <div className="text-center p-3 border-l border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Campsite Size</span>
                  <span className="text-slate-800 font-bold text-lg">15 Dome Tents</span>
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white">
                <h3 className="font-display text-2xl font-bold text-slate-800 mb-4">About the Campsite</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {camp.description} experience the perfect escape from urban chaos. Located directly inside a clean high-altitude sanctuary, this camping zone offers unparalleled isolation and nature connection. Awaken to the bird songs of snow-crested barbets, hike to local streams, and enjoy organic Himalayan herbs.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-rose flex items-center justify-center">
                      <Check className="w-4 h-4 text-deep-forest" />
                    </div>
                    <span className="text-slate-600 text-sm">Drinking mountain spring water available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-rose flex items-center justify-center">
                      <Check className="w-4 h-4 text-deep-forest" />
                    </div>
                    <span className="text-slate-600 text-sm">Clean eco-friendly dry toilets</span>
                  </div>
                </div>
              </div>


            {/* Right Side (Booking Panel) */}
            <div className="w-full h-auto self-start">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-2xl bg-white w-full flex flex-col h-auto">
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-3xl font-black text-deep-forest">₹{basePrice.toLocaleString()}</span>
                    <span className="text-slate-400 text-sm"> / day</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-secondary-text font-semibold uppercase tracking-wider block">Eco Verified</span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 flex flex-col flex-grow mt-2">
                  {/* Select Check-in Date */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-deep-forest"
                        required
                      />
                    </div>
                  </div>

                  {/* Select Duration */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Duration (Days)</label>
                    <select
                      value={nights}
                      onChange={e => setNights(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-deep-forest"
                    >
                      {[1, 2, 3, 4, 5, 7, 10].map(n => <option key={n} value={n} className="bg-white text-slate-800">{n} {n === 1 ? 'Day' : 'Days'}</option>)}
                    </select>
                  </div>

                  {/* Select Guests */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Adventure Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
                      <select
                        value={guests}
                        onChange={e => setGuests(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-deep-forest"
                      >
                        {[1, 2, 3, 4, 6, 8].map(g => <option key={g} value={g} className="bg-white text-slate-800">{g} {g === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-2 pt-6 border-t border-slate-100 text-sm mt-auto">
                    <div className="flex justify-between text-slate-500">
                      <span>₹{basePrice.toLocaleString()} × {nights} {nights === 1 ? 'day' : 'days'} × {guests} guests</span>
                      <span className="text-slate-800 font-semibold">₹{(basePrice * nights * guests).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Local Eco Fee & Tax</span>
                      <span className="text-slate-800 font-semibold">₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-850 pt-2 border-t border-slate-100 text-base">
                      <span>Total Amount</span>
                      <span className="text-secondary-text font-black">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="space-y-3 mt-6">
                    <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold text-white text-base transition-all duration-300">
                      Book Camp
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => showToast('Booking request sent to host!')}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border border-slate-200"
                    >
                      Request Booking
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => showToast('Connecting you with an assistant...')}
                      className="w-full bg-white hover:bg-rose/20 text-deep-forest py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border border-deep-forest/20"
                    >
                      Connect with Assistant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

            {/* Full Width Sections Below */}
            <div className="space-y-12">
                {/* Amenities List */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white">
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-6">What this place offers</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {amenities.map((a, i) => (
                      <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-deep-forest/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-rose/40 flex items-center justify-center flex-shrink-0">
                          {a.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-0.5">{a.label}</h4>
                          <p className="text-slate-505 text-xs">{a.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Camp Gallery */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl font-bold text-slate-800">Recent Camp Images</h3>
                    <button className="text-secondary-text text-sm font-bold hover:underline">View all images</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryData.slice(0, 4).map((img, i) => (
                      <div key={i} className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer border border-slate-100">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Day Activity Itinerary */}
                <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white">
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-6">Curated Camp Itinerary</h3>
                  <div className="space-y-6">
                    <div className="relative pl-8 border-l border-deep-forest/30">
                      <div className="absolute top-1 -left-2.5 w-5 h-5 rounded-full bg-deep-forest flex items-center justify-center border-4 border-white" />
                      <span className="text-secondary-text text-xs font-bold uppercase tracking-wider block mb-1">Day 01 — Mountain Trek & Bonfire</span>
                      <h4 className="font-semibold text-slate-800 mb-2">Welcome Drink, Alpine Setup & Acclimatization Hike</h4>
                      <p className="text-slate-505 text-sm">Arrive at base camp by 12:00 PM. Have warm organic ginger tea, check into tents, and enjoy a mild 3km walk to a beautiful waterfall. Finish the night with a warm, starlit campfire session.</p>
                    </div>
                    <div className="relative pl-8 border-l border-deep-forest/30">
                      <div className="absolute top-1 -left-2.5 w-5 h-5 rounded-full bg-deep-forest flex items-center justify-center border-4 border-white" />
                      <span className="text-secondary-text text-xs font-bold uppercase tracking-wider block mb-1">Day 02 — High Peak Summit</span>
                      <h4 className="font-semibold text-slate-800 mb-2">Sunrise Meditation & High Altitude Meadows Ascent</h4>
                      <p className="text-slate-505 text-sm">Wake up to panoramic peaks. Guided ascent to the beautiful scenic ridge (9,500 ft elevation) for lunch. Descend to the campsite for organic local dinner.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
