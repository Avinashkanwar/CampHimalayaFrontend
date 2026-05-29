import { useState } from 'react'
import { Footprints, Flame, Waves, Car, Sparkles, Mountain, X } from 'lucide-react'

const activities = [
  { id:'trekking', icon:<Footprints className="w-7 h-7 text-secondary-text"/>, label:'Trekking', count:'45+ Routes', bg:'from-deep-forest/20 to-secondary-text/20',
    title:'Trekking Adventures', desc:'Explore majestic Himalayan trails with experienced local guides',
    items:[['Popular Treks',['Triund Trek (Easy - 2 days)','Kheerganga Trek (Moderate - 3 days)','Hampta Pass Trek (Hard - 5 days)']],['What\'s Included',['Certified guide','All meals during trek','Camping equipment']]] },
  { id:'bonfire', icon:<Flame className="w-7 h-7 text-secondary-text"/>, label:'Bonfire Nights', count:'Every Evening', bg:'from-deep-forest/20 to-secondary-text/20',
    title:'Bonfire Nights', desc:'Gather around crackling fires under starlit Himalayan skies',
    items:[['Experience Includes',['Bonfire setup with wood','BBQ dinner options','Music & acoustic sessions']],['Perfect For',['Group getaways','Romantic evenings','Solo reflection time']]] },
  { id:'river', icon:<Waves className="w-7 h-7 text-blue-700"/>, label:'River Camping', count:'12 Spots', bg:'from-blue-700/20 to-blue-500/20',
    title:'River Camping', desc:'Sleep to the soothing sounds of Himalayan rivers',
    items:[['Top River Camps',['Parvati River, Kasol','Beas River, Manali','Ganges, Rishikesh']],['Activities',['Trout fishing','River crossing','Natural jacuzzi pools']]] },
  { id:'jeep', icon:<Car className="w-7 h-7 text-secondary-text"/>, label:'Jeep Safari', count:'8 Trails', bg:'from-deep-forest/20 to-secondary-text/20',
    title:'Jeep Safari', desc:'Thrilling off-road adventures through remote Himalayan terrain',
    items:[['Popular Routes',['Spiti Circuit (7 days)','Zanskar Expedition (10 days)','Leh-Manali Highway (2 days)']],['Vehicle Options',['Modified Thar (4 seats)','Scorpio (6 seats)','Tempo Traveller (12 seats)']]] },
  { id:'stargazing', icon:<Sparkles className="w-7 h-7 text-deep-forest"/>, label:'Stargazing', count:'Clear Skies', bg:'from-deep-forest/20 to-rose/20',
    title:'Stargazing Sessions', desc:'Witness the Milky Way from high-altitude locations',
    items:[['Best Locations',['Ladakh (lowest light pollution)','Spiti Valley','Sandhan Valley']],['Equipment',['Professional telescopes','Astrophotography gear','Expert guidance']]] },
  { id:'hiking', icon:<Mountain className="w-7 h-7 text-secondary-text"/>, label:'Mountain Hiking', count:'All Levels', bg:'from-deep-forest/20 to-secondary-text/20',
    title:'Mountain Hiking', desc:'Day hikes for all fitness levels with breathtaking views',
    items:[['Difficulty Levels',['Easy: 2-4 km trails','Moderate: 5-8 km trails','Challenging: 10+ km trails']],['We Provide',['Trail snacks & water','First aid kit','Local guide']]] },
]

export default function AdventureSection() {
  const [active, setActive] = useState(null)
  const act = activities.find(a => a.id === active)

  return (
    <section id="adventures" className="py-16 bg-mint relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Experiences</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">Adventure Activities</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">From serene treks to thrilling expeditions, find your perfect Himalayan adventure</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal">
          {activities.map(a => (
            <button key={a.id} onClick={() => setActive(active === a.id ? null : a.id)}
              className={`activity-card glass rounded-2xl p-6 text-center border bg-white ${active === a.id ? 'border-deep-forest bg-deep-forest/5' : 'border-slate-100'}`}>
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${a.bg} flex items-center justify-center`}>{a.icon}</div>
              <h3 className="font-semibold text-slate-800 text-sm">{a.label}</h3>
              <p className="text-xs text-slate-500 mt-1">{a.count}</p>
            </button>
          ))}
        </div>

        {act && (
          <div className="mt-12 reveal">
            <div className="glass rounded-3xl p-8 border border-slate-200/60 bg-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">{act.title}</h3>
                  <p className="text-slate-500">{act.desc}</p>
                </div>
                <button onClick={() => setActive(null)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {act.items.map(([title, list]) => (
                  <div key={title} className="bg-slate-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
                    <ul className="space-y-2 text-slate-500 text-sm">{list.map(i => <li key={i}>• {i}</li>)}</ul>
                  </div>
                ))}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-800 mb-2">Book Now</h4>
                  <button className="mt-2 btn-primary w-full py-2.5 rounded-xl text-white font-semibold text-sm">View All Options</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Us */}
        <div className="mt-24 text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Why Us</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-4">Why Choose Camp Himalaya</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 reveal">
          {[
            { bg:'from-deep-forest/10 to-rose/30', color:'text-secondary-text', title:'Verified Hosts', desc:'Every campsite is personally verified by our team' },
            { bg:'from-blue-700/10 to-blue-500/10', color:'text-blue-700', title:'Offbeat Locations', desc:"Hidden gems you won't find on other platforms" },
            { bg:'from-rose/30 to-mint-50/50', color:'text-secondary-text', title:'Safe Travel', desc:'24/7 support and emergency assistance included' },
            { bg:'from-deep-forest/10 to-rose/30', color:'text-secondary-text', title:'Local Guides', desc:'Expert guides who know every trail and story' },
            { bg:'from-deep-forest/15 to-mint-50/50', color:'text-secondary-text', title:'Best Prices', desc:'Direct bookings mean better rates for you' },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-6 text-center group bg-white hover:bg-card-bg transition-all duration-300">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${f.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className={`text-2xl ${f.color}`}>✓</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
