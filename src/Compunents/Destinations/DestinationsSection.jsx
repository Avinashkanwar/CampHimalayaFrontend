import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Tent, Footprints, MapPin } from 'lucide-react'

export default function DestinationsSection() {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })

  const destinations = [
    { name: 'Manali',         tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=900&fit=crop' },
    { name: 'Lahaul Spiti',   tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=900&fit=crop' },
    { name: 'Shimla',         tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1531030096180-acaee5e36095?w=600&h=900&fit=crop' },
    { name: 'Kangra',         tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=600&h=900&fit=crop' },
    { name: 'Kasol',          tag: 'Parvati Valley',   image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&h=900&fit=crop' },
    { name: 'Tirthan Valley', tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=900&fit=crop' },
    { name: 'Dharamshala',    tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=600&h=900&fit=crop' },
    { name: 'Kinnaur',        tag: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=900&fit=crop' },
  ]

  return (
    <section className="py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 reveal">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose text-deep-forest border border-rose/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-deep-forest/60" />
            Special Collections
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-850 leading-tight">
            Find Your Perfect Getaway
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Tap a destination · Choose Camping or Trekking · Go explore
          </p>
        </div>

        {/* Slider */}
        <div className="relative group/slider reveal">

          {/* Left Arrow */}
          <button onClick={scrollLeft}
            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#EC5017] hover:scale-110 transition-all shadow-lg items-center justify-center opacity-0 group-hover/slider:opacity-100 cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map(dest => {
              const active = activeCard === dest.name
              return (
                <div
                  key={dest.name}
                  onClick={() => setActiveCard(active ? null : dest.name)}
                  className={`relative flex-none w-56 rounded-[1.75rem] overflow-hidden cursor-pointer snap-start select-none transition-all duration-500 ${
                    active
                      ? 'h-[28rem] shadow-2xl -translate-y-2'
                      : 'h-72 shadow-lg hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >

                  {/* Full Image */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      active ? 'scale-110 brightness-[0.3]' : 'scale-100 brightness-75 hover:scale-105'
                    }`}
                  />

                  {/* Bottom gradient (default only) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-100'}`} />

                  {/* DEFAULT: name at bottom */}
                  <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-400 ${active ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{dest.tag}</span>
                    </div>
                    <h3 className="font-display text-xl font-black text-white">{dest.name}</h3>
                    <p className="text-white/30 text-[9px] font-semibold mt-2 uppercase tracking-wider">Tap to choose</p>
                  </div>

                  {/* ACTIVE: map + buttons */}
                  <div className={`absolute inset-0 flex flex-col transition-all duration-400 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                    {/* Satellite Map — top portion, watermark clipped */}
                    <div className="relative w-full overflow-hidden rounded-t-[1.75rem]" style={{ height: '52%' }}>
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(dest.name + ', Himachal Pradesh')}&t=k&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="absolute inset-0 w-full border-none pointer-events-none"
                        style={{ height: '160%', top: '-15%' }}
                        allowFullScreen=""
                        loading="lazy"
                        title={dest.name}
                      />
                      {/* Bottom fade to hide watermark */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                      {/* Top left badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Satellite
                      </div>
                    </div>

                    {/* Info + Buttons panel */}
                    <div className="flex-1 flex flex-col justify-center px-4 py-4 bg-slate-950">
                      <h3 className="font-display text-base font-black text-white leading-none mb-0.5">{dest.name}</h3>
                      <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-4">{dest.tag} · Choose your adventure</p>

                      {/* Camping */}
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/explore/camping?q=${encodeURIComponent(dest.name)}`) }}
                        className="w-full mb-2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1E3E2F] hover:bg-[#27513d] text-white transition-all duration-200 hover:scale-[1.02] shadow-lg"
                      >
                        <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Tent className="w-3.5 h-3.5 text-emerald-300" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-black text-white leading-none">Camping</p>
                          <p className="text-[9px] text-white/35 font-medium mt-0.5">Find campsite spots</p>
                        </div>
                      </button>

                      {/* Trekking */}
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/explore/trekking?q=${encodeURIComponent(dest.name)}`) }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#EE9D45] hover:bg-[#d98c38] text-slate-900 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                      >
                        <div className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                          <Footprints className="w-3.5 h-3.5 text-amber-900" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-black text-slate-900 leading-none">Trekking</p>
                          <p className="text-[9px] text-slate-600 font-medium mt-0.5">Explore trek routes</p>
                        </div>
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button onClick={scrollRight}
            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#EC5017] hover:scale-110 transition-all shadow-lg items-center justify-center opacity-0 group-hover/slider:opacity-100 cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </section>
  )
}
