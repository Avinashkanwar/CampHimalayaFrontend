import { useNavigate } from 'react-router-dom'

export default function HostSection() {
  const navigate = useNavigate()

  return (
    <section id="hosts" className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="reveal relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[480px] flex items-center bg-slate-800 bg-cover bg-center select-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80')` }}
        >
          {/* Dark overlay for rich depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent z-0" />

          {/* Overlaid Orange Card */}
          <div 
            className="relative z-10 w-full max-w-md text-white rounded-[2rem] p-8 md:p-10 shadow-xl m-6 sm:m-8 md:ml-16 select-none text-left"
            style={{ backgroundColor: 'var(--primary-700, #EC5017)' }}
          >
            <h2 className="font-sans text-2xl sm:text-3xl font-black mb-4 leading-tight">
              Grow your campground or glamping business.
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed mb-8">
              Host our community of good-natured RVers and campers at your property, campground, or RV resort.
            </p>
            <button
              onClick={() => navigate('/become-host')}
              className="bg-white hover:bg-neutral-50 font-bold px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg inline-block text-center cursor-pointer"
              style={{ color: 'var(--primary-700, #EC5017)' }}
            >
              Become a Host
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

