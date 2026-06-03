import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Star } from 'lucide-react'
import { galleryData } from '../../screens/data'

const testimonials = [
  { name:'Anita Desai', loc:'Mumbai • 3 trips', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop', text:'"Found this hidden gem near Kasol through Camp Himalaya. The riverside camping experience was absolutely magical. Woke up to the sound of flowing water and birds chirping. Pure bliss!"' },
  { name:'Meera Kapoor', loc:'Delhi • 5 trips', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop', text:'"As a solo female traveler, safety was my biggest concern. Camp Himalaya\'s verified hosts and 24/7 support gave me confidence. The Tirthan Valley camp was beyond beautiful!"' },
  { name:'Vikram Singh', loc:'Bangalore • 2 trips', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop', text:'"Booked a luxury glamping experience in Manali for our anniversary. The bonfire dinner under stars was unforgettable. Best decision ever!"' },
]

function Lightbox({ index, onClose, onPrev, onNext }) {
  if (index === null) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onClose() }} className="absolute top-4 right-4 p-3 rounded-full glass z-10 hover:bg-white/20 transition-colors"><X className="w-6 h-6 text-white" /></button>
      <button onClick={e => { e.stopPropagation(); onPrev() }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass z-10 hover:bg-white/20"><ChevronLeft className="w-6 h-6 text-white" /></button>
      <button onClick={e => { e.stopPropagation(); onNext() }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass z-10 hover:bg-white/20"><ChevronRight className="w-6 h-6 text-white" /></button>
      <img src={galleryData[index].src} alt={galleryData[index].alt} className="max-w-full max-h-[85vh] rounded-2xl object-contain relative z-10" onClick={e => e.stopPropagation()} />
    </div>
  )
}

export default function GalleryTestimonialsSection() {
  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i - 1 + galleryData.length) % galleryData.length)
  const next = () => setLightbox(i => (i + 1) % galleryData.length)

  return (
    <>
      {/* Testimonials */}
      <section className="py-16 bg-mint relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Testimonials</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">What Travelers Say</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {testimonials.map(t => (
              <div key={t.name} className="glass rounded-3xl p-8 border border-slate-200 bg-white hover:border-deep-forest/30 transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-secondary-text fill-current" />)}
                </div>
                <p className="text-slate-650 mb-6 leading-relaxed">{t.text}</p>
                <div className="flex items-center space-x-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-deep-forest/30" />
                  <div>
                    <h4 className="font-semibold text-slate-800">{t.name}</h4>
                    <p className="text-sm text-slate-500">📍 {t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-white relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Gallery</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">Visual Journey</h2>
          </div>
          <div className="flex md:block md:columns-2 lg:columns-3 md:gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 reveal gap-4">
            {galleryData.map((item, i) => (
              <div key={i} className="flex-none w-[80vw] md:w-auto break-inside-avoid mb-0 md:mb-6 snap-start">
                <div className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-shadow duration-300" onClick={() => setLightbox(i)}>
                  <img src={item.src} alt={item.alt} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">{item.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox index={lightbox} onClose={() => setLightbox(null)} onPrev={prev} onNext={next} />
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  )
}
