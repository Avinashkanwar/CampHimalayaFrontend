import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Upload, MapPin, DollarSign, Image, FileText, Check, ChevronDown, Mountain, Tent, TreePine, Sparkles, ShieldCheck, ArrowLeft, ExternalLink } from 'lucide-react'

const CAMP_TYPES = [
  { id: 'campsite', label: 'Campsite', icon: <Tent className="w-5 h-5" />, desc: 'Traditional tent camping area' },
  { id: 'glamping', label: 'Glamping', icon: <Sparkles className="w-5 h-5" />, desc: 'Luxury glamping tents or domes' },
  { id: 'hidden', label: 'Hidden Place', icon: <TreePine className="w-5 h-5" />, desc: 'Off-the-grid secret paradise' },
  { id: 'trekking', label: 'Trekking Base', icon: <Mountain className="w-5 h-5" />, desc: 'Base camp for treks & hikes' },
]

const AMENITY_OPTIONS = [
  'Bonfire & BBQ', 'Hot Water', 'Meals Included', 'WiFi Available',
  'Parking', 'Trekking Guide', 'First Aid Kit', 'River Access',
  'Mountain View', 'Stargazing Spot', 'Pet Friendly', 'Eco Toilets',
]


export default function BecomeHostScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [form, setForm] = useState({
    campName: '', location: '', state: 'Himachal Pradesh', type: '',
    description: '', price: '', maxGuests: '4', elevation: '',
    amenities: [], images: [],
    hostName: '', hostPhone: '', hostEmail: '',
  })

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map(f => URL.createObjectURL(f))
    setForm(f => ({ ...f, images: [...f.images, ...previews].slice(0, 6) }))
  }

  const removeImage = (idx) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  }

  const canProceed = () => {
    if (step === 1) return form.campName && form.location && form.type
    if (step === 2) return form.description && form.price && form.maxGuests
    if (step === 3) return form.hostName && form.hostPhone && form.hostEmail
    if (step === 4) return termsAccepted
    return false
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-mint pt-28 pb-20 px-4">
        <div className="max-w-lg mx-auto text-center glass rounded-3xl border border-slate-200 p-10 bg-white shadow-xl">
          <div className="w-20 h-20 mx-auto bg-rose rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-deep-forest" />
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 mb-4">Listing Submitted!</h2>
          <p className="text-slate-500 mb-2">
            Your campsite <span className="text-slate-800 font-bold">"{form.campName}"</span> has been submitted for review.
          </p>
          <p className="text-slate-400 text-sm mb-8">Our team will verify your property within 2–3 business days and notify you via email.</p>
          <button onClick={() => navigate('/')} className="btn-primary px-8 py-3.5 rounded-xl font-bold text-white">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mint pt-24 pb-20 relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-deep-forest/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back */}
        <button onClick={() => navigate('/')} className="btn-secondary px-5 py-2.5 rounded-xl font-semibold mb-8 inline-flex items-center space-x-2 bg-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Host Program</span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-800 mb-3">List Your Camp on Himalaya</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Share your campsite, glamping dome, or hidden paradise with thousands of adventure seekers across India.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Property', 'Details', 'Contact', 'Terms'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > i + 1 ? 'bg-deep-forest text-white' : step === i + 1 ? 'bg-[#EC5017] text-white shadow-lg shadow-[#EC5017]/20' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-bold hidden sm:block ${step === i + 1 ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
              {i < 3 && <div className={`w-8 sm:w-14 h-0.5 rounded ${step > i + 1 ? 'bg-deep-forest' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass rounded-3xl p-6 sm:p-10 border border-slate-200/60 bg-white shadow-xl">

          {/* Step 1: Property Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Property Information</h3>
              <p className="text-slate-500 text-sm mb-6">Tell us about your campsite or hidden place.</p>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Camp / Property Name *</label>
                <input type="text" value={form.campName} onChange={e => update('campName', e.target.value)} placeholder="e.g. Whispering Pines Campsite" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest transition-colors" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
                    <input type="text" value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Tirthan Valley, Himachal" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">State</label>
                  <select value={form.state} onChange={e => update('state', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest">
                    {['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh', 'Sikkim', 'Arunachal Pradesh', 'Meghalaya', 'Other'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">Property Type *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CAMP_TYPES.map(t => (
                    <button key={t.id} type="button" onClick={() => update('type', t.id)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${form.type === t.id ? 'border-deep-forest bg-deep-forest/5 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${form.type === t.id ? 'bg-deep-forest text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {t.icon}
                      </div>
                      <p className="text-xs font-bold text-slate-800">{t.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details & Amenities */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Camp Details & Amenities</h3>
              <p className="text-slate-500 text-sm mb-6">Provide details to attract adventurers to your listing.</p>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Description *</label>
                <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4} placeholder="Describe the camping experience, surroundings, unique features..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest resize-none" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Price per Night (₹) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
                    <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="2499" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Max Guests *</label>
                  <select value={form.maxGuests} onChange={e => update('maxGuests', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest">
                    {['2','4','6','8','10','15','20','30+'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Elevation (ft)</label>
                  <input type="text" value={form.elevation} onChange={e => update('elevation', e.target.value)} placeholder="e.g. 8,500" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">Amenities & Features</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map(a => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${form.amenities.includes(a) ? 'bg-deep-forest text-white border-deep-forest' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                      {form.amenities.includes(a) && <Check className="w-3 h-3 inline mr-1" />}{a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">Upload Photos (up to 6)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {form.images.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                    </div>
                  ))}
                  {form.images.length < 6 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-deep-forest hover:bg-deep-forest/5 transition-all">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-400 font-semibold">Add</span>
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Host Contact */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Host Contact Information</h3>
              <p className="text-slate-500 text-sm mb-6">We'll use this to verify your identity and send booking notifications.</p>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Full Name *</label>
                <input type="text" value={form.hostName} onChange={e => update('hostName', e.target.value)} placeholder="Your full name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Phone Number *</label>
                  <input type="tel" value={form.hostPhone} onChange={e => update('hostPhone', e.target.value)} placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Email Address *</label>
                  <input type="email" value={form.hostEmail} onChange={e => update('hostEmail', e.target.value)} placeholder="host@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-deep-forest" />
                </div>
              </div>

              {/* Host benefits info */}
              <div className="bg-gradient-to-r from-deep-forest/5 to-rose/20 rounded-2xl p-6 border border-rose/20 mt-4">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center text-sm"><ShieldCheck className="w-5 h-5 text-secondary-text mr-2" />What you get as a Camp Himalaya Host</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {['Free listing on our platform with premium visibility', 'Dedicated host dashboard to manage bookings', 'Professional photography session for your property', '24/7 host support and assistance', 'Secure payments directly to your bank account'].map(b => (
                    <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 text-secondary-text mt-0.5 shrink-0" />{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Terms & Conditions */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Terms & Conditions</h3>
              <p className="text-slate-500 text-sm mb-6">Please review our hosting agreement before submitting your listing.</p>

              {/* Link to full Terms page */}
              <div className="bg-gradient-to-r from-deep-forest/5 to-rose/20 rounded-2xl p-6 border border-rose/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-deep-forest/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-deep-forest" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-slate-800 mb-1">Camp Himalaya Host Agreement</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      Read the complete terms covering property ownership, safety standards, commission structure, cancellation policies, eco-guidelines, and more.
                    </p>
                    <Link
                      to="/terms"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-deep-forest/30 px-5 py-2.5 rounded-xl text-sm font-bold text-deep-forest hover:bg-deep-forest/5 transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Read Full Terms & Conditions
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Summary of key terms */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-800 mb-3 text-sm">Key Points Summary</h4>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {[
                    '15% service commission on each confirmed booking',
                    'Property verification required before listing goes live',
                    'Must respond to bookings within 24 hours',
                    'Eco-friendly practices and waste disposal required',
                    'Camp Himalaya may remove listings violating guidelines',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-deep-forest mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl border border-slate-200 hover:border-deep-forest/30 transition-colors bg-white">
                <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1 w-5 h-5 rounded border-slate-300 text-deep-forest focus:ring-deep-forest accent-[#263F26]" />
                <div>
                  <p className="text-sm font-bold text-slate-800">I accept the Terms & Conditions</p>
                  <p className="text-xs text-slate-500 mt-0.5">By checking this box, I confirm I have read and agree to the <Link to="/terms" target="_blank" className="text-secondary-text underline hover:text-deep-forest">Camp Himalaya Host Agreement</Link>.</p>
                </div>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-6 py-3 rounded-xl font-semibold text-sm">
                Previous
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${canProceed() ? 'btn-primary text-white cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!termsAccepted} className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all ${termsAccepted ? 'btn-primary text-white cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                Submit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
