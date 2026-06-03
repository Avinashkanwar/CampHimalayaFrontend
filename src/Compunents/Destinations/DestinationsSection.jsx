import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DestinationsSection() {
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  const destinations = [
    { name: 'Manali', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop' },
    { name: 'Lahaul Spiti', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=800&fit=crop' },
    { name: 'Shimla', image: 'https://images.unsplash.com/photo-1531030096180-acaee5e36095?w=600&h=800&fit=crop' },
    { name: 'Kangra', image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=600&h=800&fit=crop' },
    { name: 'Kasol', image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&h=800&fit=crop' },
    { name: 'Tirthan Valley', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=800&fit=crop' },
    { name: 'Dharamshala', image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=600&h=800&fit=crop' },
    { name: 'Kinnaur', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=800&fit=crop' },
  ]

  return (
    <section className="pt-12 pb-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6 reveal">
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-3">
              Special Collections
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-850 mb-2">
              Find Your Camping Getaway
            </h2>
            <p className="text-slate-500 text-base max-w-2xl">
              Explore the best camping destinations across the most beautiful regions in the Himalayas.
            </p>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div className="reveal relative group/slider">
          
          {/* Overlay Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-[calc(50%+16px)] z-20 p-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white hover:text-[#EC5017] hover:scale-110 transition-all duration-300 shadow-xl opacity-0 group-hover/slider:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
          >
            {destinations.map(dest => (
              <div 
                key={dest.name}
                onClick={() => {
                  navigate(`/explore/all?q=${encodeURIComponent(dest.name)}`)
                }}
                className="group relative flex-none w-64 sm:w-72 h-80 rounded-[2.2rem] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-350 cursor-pointer snap-start"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <h3 className="font-display text-2xl font-black text-white leading-tight mb-2 tracking-tight">
                    {dest.name}
                  </h3>
                  <button className="text-[10px] font-extrabold text-white uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-white hover:text-slate-900 transition-colors duration-300 border border-white/30">
                    Explore <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay Right Arrow */}
          <button 
            onClick={scrollRight}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-[calc(50%+16px)] z-20 p-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white hover:text-[#EC5017] hover:scale-110 transition-all duration-300 shadow-xl opacity-0 group-hover/slider:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
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
