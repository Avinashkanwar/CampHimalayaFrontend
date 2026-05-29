import { MountainSnow, Mail, Phone, MapPin } from 'lucide-react'

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-12 pb-6 border-t border-slate-200 bg-card-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-deep-forest to-secondary-text flex items-center justify-center">
                <MountainSnow className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">Camp</span>
                <span className="text-xl font-bold gradient-text">Himalaya</span>
              </div>
            </a>
            <p className="text-slate-500 mb-6 max-w-md leading-relaxed">Connecting adventurous souls with hidden Himalayan paradises. Experience nature like never before with verified campsites and local hosts.</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary-text hover:bg-deep-forest/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us','All Campsites','Become a Host','Adventure Packages','Travel Blog'].map(l => (
                <li key={l}><a href="#" className="text-slate-500 hover:text-secondary-text transition-colors text-sm">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Support</h4>
            <ul className="space-y-3">
              {['Help Center','Safety Info','Cancellation Policy','Contact Support','FAQs'].map(l => (
                <li key={l}><a href="#" className="text-slate-500 hover:text-secondary-text transition-colors text-sm">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3"><Mail className="w-4 h-4 text-secondary-text mt-0.5 flex-shrink-0" /><span className="text-slate-500 text-sm">hello@camphimalaya.com</span></li>
              <li className="flex items-start space-x-3"><Phone className="w-4 h-4 text-secondary-text mt-0.5 flex-shrink-0" /><span className="text-slate-500 text-sm">+91 98765 43210</span></li>
              <li className="flex items-start space-x-3"><MapPin className="w-4 h-4 text-secondary-text mt-0.5 flex-shrink-0" /><span className="text-slate-500 text-sm">Manali, Himachal Pradesh<br />India 175131</span></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-12 bg-white border border-slate-200/80 shadow-md shadow-slate-150">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-slate-500">Get exclusive deals, new campsite alerts, and travel tips delivered to your inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-deep-forest transition-colors" />
              <button type="submit" className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">© 2024 Camp Himalaya. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
              <a key={l} href="#" className="text-slate-400 hover:text-slate-650 text-sm transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
