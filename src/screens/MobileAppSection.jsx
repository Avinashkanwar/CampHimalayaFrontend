import { Smartphone, Map, Bell, Gift } from 'lucide-react'

const AppleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.19.67-2.9 1.49-.61.7-1.15 1.84-1.01 2.96 1.1.09 2.21-.57 2.92-1.39z" />
  </svg>
)

const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
    <path d="M5 3.223c-.347-.367-.745-.306-.994-.127L12.986 12 4.006 20.904c.249.179.647.24 1 .127l14.776-8.528c.677-.39.677-1.026 0-1.417L5 3.223z" />
  </svg>
)

export default function MobileAppSection() {
  return (
    <section className="py-16 bg-mint relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-deep-forest/5 to-rose/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Mobile App</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-6">Book Your Adventure Anywhere</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Download the Camp Himalaya app and carry the entire Himalayan camping universe in your pocket. Instant bookings, offline maps, and exclusive app-only deals.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose/40 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-secondary-text" />
                </div>
                <span className="text-slate-650">Instant booking confirmation</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose/40 flex items-center justify-center">
                  <Map className="w-4 h-4 text-secondary-text" />
                </div>
                <span className="text-slate-650">Offline GPS navigation to campsites</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose/40 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-secondary-text" />
                </div>
                <span className="text-slate-650">Real-time weather alerts</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose/40 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-secondary-text" />
                </div>
                <span className="text-slate-650">Exclusive app-only discounts up to 30%</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-3">
                <AppleIcon className="w-6 h-6 text-white" />
                <div className="text-left">
                  <p className="text-xs opacity-70">Download on</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
              <button className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center space-x-3">
                <PlayIcon className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs opacity-70">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center reveal order-1 lg:order-2">
            <div className="phone-mockup w-72 animate-float bg-slate-800 p-3 rounded-[40px] shadow-xl">
              <div className="phone-screen aspect-[9/19] relative rounded-[32px] overflow-hidden bg-gradient-to-b from-sky-400 to-sky-600">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 flex items-center justify-between px-6 text-white text-xs">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px]">📶 📶 🔋</span>
                  </div>
                </div>

                {/* App Content */}
                <div className="pt-10 px-4 h-full bg-gradient-to-b from-deep-forest to-secondary-text">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <span className="text-xl">🏔️</span>
                    </div>
                    <h4 className="text-white font-bold text-lg">Camp Himalaya</h4>
                    <p className="text-white/70 text-xs">Find your perfect camp</p>
                  </div>

                  {/* Search Bar */}
                  <div className="bg-white/20 backdrop-blur rounded-xl p-3 mb-4">
                    <div className="flex items-center space-x-2 text-white/70 text-xs">
                      <span>🔍 Search destinations...</span>
                    </div>
                  </div>

                  {/* Featured Card */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=300&h=150&fit=crop" alt="Camp" className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <h5 className="font-bold text-gray-800 text-sm">Manali Valley Camp</h5>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-gray-500">Himachal</span>
                        <span className="text-[10px] font-bold text-secondary-text">₹2,499/night/person</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl p-3 flex justify-around text-gray-400">
                    <span className="text-[10px] text-deep-forest font-bold">🏠 Home</span>
                    <span className="text-[10px]">🧭 Explore</span>
                    <span className="text-[10px]">👤 Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
