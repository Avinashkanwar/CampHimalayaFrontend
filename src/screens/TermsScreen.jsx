import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, ShieldCheck, Scale, AlertTriangle, Leaf, Eye, CreditCard, Ban, UserCheck } from 'lucide-react'

const SECTIONS = [
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: '1. Property Ownership & Accuracy',
    points: [
      'The Host confirms that they are the legal owner or authorized representative of the listed property.',
      'All property details, descriptions, photos, and pricing provided must be accurate and not misleading.',
      'Camp Himalaya reserves the right to remove or suspend any listing found to contain false or inaccurate information.',
    ]
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: '2. Safety & Maintenance Standards',
    points: [
      'The Host agrees to maintain the campsite in a safe, clean, and habitable condition for all guests at all times.',
      'Proper fire safety measures, first aid kits, and emergency contact information must be available on-site.',
      'The Host must comply with all local government regulations, permits, and safety standards for operating a campsite.',
      'Any incidents, accidents, or safety concerns must be reported to Camp Himalaya within 24 hours.',
    ]
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: '3. Commission & Payments',
    points: [
      'Camp Himalaya charges a 15% service commission on each confirmed booking made through the platform.',
      'Payments will be processed and transferred to the Host\'s registered bank account within 3–5 business days after guest check-in.',
      'The Host is responsible for maintaining accurate banking details. Camp Himalaya is not liable for failed transactions due to incorrect bank information.',
      'All prices listed must include applicable taxes unless explicitly stated otherwise.',
    ]
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: '4. Booking & Cancellation Policy',
    points: [
      'The Host must respond to all booking requests within 24 hours. Failure to respond may result in automatic cancellation.',
      'Once a booking is confirmed, the Host must honor the reservation. Repeated cancellations by the Host may lead to listing suspension.',
      'Guests may cancel bookings according to the following schedule: Full refund if cancelled 7+ days before check-in; 50% refund if cancelled 3–6 days before; No refund if cancelled within 48 hours.',
      'The Host may set their own blackout dates and seasonal pricing through the host dashboard.',
    ]
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: '5. Eco-Friendly & Community Guidelines',
    points: [
      'The Host agrees to follow eco-friendly practices including proper waste disposal, minimizing plastic usage, and preserving natural surroundings.',
      'No permanent structures may be built in protected forest or wildlife areas without proper government authorization.',
      'The Host must respect local communities, traditions, and indigenous rights in the area.',
      'Guests must be informed about Leave No Trace principles and local environmental regulations.',
    ]
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: '6. Verification & Inspections',
    points: [
      'Camp Himalaya reserves the right to conduct on-site property verification before activating any listing.',
      'The verification process typically takes 2–3 business days after listing submission.',
      'Periodic re-inspections may be conducted to ensure continued compliance with platform standards.',
      'The Host must provide access to the property for verification visits upon reasonable notice.',
    ]
  },
  {
    icon: <Ban className="w-5 h-5" />,
    title: '7. Prohibited Activities',
    points: [
      'The Host must not engage in any illegal activities on the listed property.',
      'Discrimination based on race, gender, religion, nationality, disability, or sexual orientation is strictly prohibited.',
      'The Host must not list properties they do not own or have authorization to operate.',
      'Subletting or unauthorized transfer of bookings to third-party properties is not allowed.',
    ]
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: '8. Liability & Disputes',
    points: [
      'Camp Himalaya acts as a marketplace platform and is not directly liable for incidents occurring at the Host\'s property.',
      'The Host assumes full responsibility for guest safety and property conditions during their stay.',
      'Any disputes between Host and Guest will be mediated by Camp Himalaya\'s support team. Both parties agree to cooperate in the resolution process.',
      'Camp Himalaya reserves the right to temporarily suspend a listing during an active dispute investigation.',
    ]
  },
]

export default function TermsScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-mint pt-24 pb-20 relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-deep-forest/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="btn-secondary px-5 py-2.5 rounded-xl font-semibold mb-8 inline-flex items-center space-x-2 bg-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose text-deep-forest border border-rose/30 mb-4">Legal</span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-800 mb-3">Terms & Conditions</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Camp Himalaya Host Agreement — Please read carefully before listing your property.</p>
        </div>

        {/* Intro Card */}
        <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white shadow-lg mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-deep-forest/10 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-deep-forest" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Camp Himalaya Host Agreement</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                This Host Agreement ("Agreement") is entered into between the property owner ("Host") and Camp Himalaya Private Limited ("Platform"), a company registered in Manali, Himachal Pradesh, India. By listing your property on Camp Himalaya, you acknowledge and agree to the following terms and conditions.
              </p>
              <p className="text-slate-400 text-xs mt-3">Effective Date: May 2026 • Version 1.0</p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section, idx) => (
            <div key={idx} className="glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-forest/10 to-rose/20 flex items-center justify-center text-deep-forest">
                  {section.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-800">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-deep-forest/10 text-deep-forest flex items-center justify-center text-[9px] font-bold mt-0.5">
                      {String.fromCharCode(97 + i)}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 glass rounded-3xl p-6 sm:p-8 border border-slate-200/60 bg-white shadow-sm text-center">
          <p className="text-slate-500 text-sm mb-2">
            By proceeding with your listing on Camp Himalaya, you confirm that you have read, understood, and agree to all the terms stated above.
          </p>
          <p className="text-slate-400 text-xs">
            Last updated: May 2026 • Camp Himalaya Pvt. Ltd. • Manali, Himachal Pradesh, India 175131
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate(-1)} className="btn-primary px-8 py-3 rounded-xl font-bold text-white text-sm">
              I Understand, Go Back
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary px-8 py-3 rounded-xl font-semibold text-sm">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
