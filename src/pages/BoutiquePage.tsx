import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSeo } from '../hooks/useSeo';
import { 
  MapPin, Phone, MessageSquare, Clock, 
  Sparkles, ShieldCheck, Navigation, 
  Award, Layers, Ruler
} from 'lucide-react';

export const BoutiquePage: React.FC = () => {
  const { isDark } = useTheme();

  useSeo({
    title: 'Camp Pune Flagship Boutique & Bespoke Fitting Salon | The Shoe Kicks',
    description: 'Visit The Shoe Kicks luxury footwear flagship boutique at Kolsa Lane, MG Road, Camp, Pune - 411001. Private bespoke fitting appointments, 3D foot digitization, and Master Last-Maker consultations. Tel: +91 73500 51590.',
    canonical: 'https://theshoekicks.com/boutique',
    keywords: 'The Shoe Kicks Camp Pune, luxury shoe store Camp, bespoke fitting salon Pune, Kolsa Lane shoe shop, MG Road Pune luxury shoes',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ShoeStore',
      name: 'The Shoe Kicks Bespoke Footwear Atelier & Salon',
      url: 'https://theshoekicks.com/boutique',
      telephone: '+91 73500 51590',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kolsa Lane, MG Road, Camp',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.5167,
        longitude: 73.8795
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '22:00'
        }
      ]
    }
  });

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      
      {/* 1. Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.25em] ${
            isDark ? 'bg-[#181610] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-200 text-red-600 font-bold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMP, PUNE FLAGSHIP ATELIER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight">
            The Bespoke Fitting Salon
          </h1>

          <p className={`text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'
          }`}>
            Step into our sanctuary of traditional Goodyear-welted shoemaking nestled in the historical heart of Camp, Pune. Experience personalized anatomical lasting, hand-dyed patina blending, and private fittings.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+917350051590"
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-semibold text-xs font-mono tracking-wider flex items-center gap-2 shadow-lg hover:opacity-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Concierge: +91 73500 51590</span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-zinc-300 text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-amber-500" />
              <span>Open on Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Visual Editorial Gallery: Storefront & Interior Atelier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Storefront Image (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 relative group aspect-[16/10] bg-black shadow-2xl">
            <img
              src="/images/editorial/luxury-storefront.jpg"
              alt="The Shoe Kicks Luxury Flagship Storefront, Kolsa Lane, Camp, Pune"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                CAMP PUNE ARCHITECTURE
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium mt-1">
                The Heritage Arcade Boutique
              </h2>
              <p className="text-xs text-zinc-300 font-light mt-1 max-w-lg">
                Located on Kolsa Lane, right off MG Road. Designed with Italian honed travertine, velvet consultation lounges, and a live hand-lasting workbench.
              </p>
            </div>
          </div>

          {/* Interior Salon Image (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/10 relative group aspect-[16/10] lg:aspect-auto bg-black shadow-2xl">
            <img
              src="/images/editorial/camp-pune-boutique.jpg"
              alt="The Shoe Kicks Private Bespoke Fitting Salon, Camp, Pune"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                PRIVATE FITTING SALON
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium mt-1">
                The Lasting Chamber
              </h2>
              <p className="text-xs text-zinc-300 font-light mt-1">
                3D digitization of your arches, private champagne lounge, and bespoke hide curation from French tanneries.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Address, Hours & Landmark Dossier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`p-8 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">Atelier Location</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              <strong className={isDark ? 'text-white' : 'text-zinc-950 font-bold'}>The Shoe Kicks Atelier</strong><br />
              Kolsa Lane, MG Road, Camp,<br />
              Pune - 411001, Maharashtra, India
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-500">
              Landmark: Off MG Road near Pune Cantonment, walking distance from East Street.
            </div>
          </div>

          <div className={`p-8 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">Boutique Hours</h3>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Monday – Sunday:</span>
                <span className={isDark ? 'text-white font-mono' : 'text-zinc-950 font-mono font-semibold'}>9:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Daily Status:</span>
                <span className="text-emerald-400 font-mono font-semibold">Open All 7 Days</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Private After-Hours:</span>
                <span className="text-amber-500 font-mono">By Appointment</span>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">Direct Concierge</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Connect directly with our Master Last-Maker or Bespoke Concierge for sizing consultations or salon directions.
            </p>
            <div className="pt-2 space-y-2">
              <a
                href="tel:+917350051590"
                className="block text-sm font-mono font-bold text-amber-400 hover:underline"
              >
                +91 73500 51590
              </a>
              <a
                href="https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20would%20like%20to%20inquire%20about%20a%20private%20fitting%20appointment%20at%20Kolsa%20Lane,%20Camp,%20Pune."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4. The 4 Salon Privileges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
            isDark ? 'text-amber-400' : 'text-red-600'
          }`}>
            IN-STORE EXPERIENCE
          </span>
          <h2 className="text-3xl font-serif font-medium mt-1">
            The In-Person Fitting Ritual
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Why visiting our Camp, Pune boutique guarantees zero break-in blisters and generational footwear comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Ruler className="w-5 h-5 text-amber-400" />,
              step: '01',
              title: '3D Foot Digitization',
              desc: 'High-precision scanning of your metatarsal girth, arch depth, and plantar pressure points.'
            },
            {
              icon: <Layers className="w-5 h-5 text-amber-400" />,
              step: '02',
              title: 'Leather Swatch Curation',
              desc: 'Select from 40+ French Boxcalf, Tuscan crust, and English waterproof suede leather swatches.'
            },
            {
              icon: <Award className="w-5 h-5 text-amber-400" />,
              step: '03',
              title: 'Master Last Matching',
              desc: 'Experience our proprietary anatomical Indian D & EE lasts tailored for zero toe-pinch.'
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
              step: '04',
              title: 'Goodyear Recrafting',
              desc: 'Every pair built in our atelier can be returned for full sole renewal and mirror wax polish.'
            }
          ].map(priv => (
            <div
              key={priv.step}
              className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-[#0f0f15] border-white/5' : 'bg-white border-zinc-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-white/5 border border-white/10">{priv.icon}</span>
                <span className="text-xs font-mono font-bold text-amber-500">{priv.step}</span>
              </div>
              <h3 className="text-base font-serif font-medium">{priv.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{priv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Visit Our Camp, Pune Flagship Atelier Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl ${
          isDark ? 'bg-[#0d0d13] border-white/10' : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          <div className="text-center space-y-2 mb-10">
            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
              isDark ? 'text-amber-400' : 'text-red-600'
            }`}>
              WALK-INS WELCOME • NO APPOINTMENT NEEDED
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-medium">
              Visit The Shoe Kicks Flagship Atelier
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Experience the full Goodyear welted repertoire in person. Try on every size, feel unbroken French boxcalf hides, and consult directly with our master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Store Information */}
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-5 flex flex-col justify-between ${
              isDark ? 'bg-[#15151c] border-white/5' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-zinc-400">Atelier Address</div>
                    <div className="text-sm font-medium mt-0.5">387, Kolsa Gali (Kolsa Lane)</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Off M.G. Road, Camp, Pune - 411001, Maharashtra, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-zinc-400">Visiting Hours</div>
                    <div className="text-sm font-medium mt-0.5">Monday – Sunday: 9:00 AM – 10:00 PM</div>
                    <div className="text-xs text-zinc-400 mt-0.5">Open all 7 days for walk-in fittings & master consultations</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono font-bold uppercase text-zinc-400">Store Direct Line</div>
                    <a href="tel:+917350051590" className="text-sm font-mono font-bold hover:underline">
                      +91 73500 51590
                    </a>
                  </div>
                </div>
              </div>

              <div className={`pt-4 border-t text-[11px] font-mono ${
                isDark ? 'border-white/10 text-zinc-400' : 'border-zinc-200 text-zinc-600'
              }`}>
                ✓ Complimentary anatomical foot sizing • Zero-break-in guarantee
              </div>
            </div>

            {/* Direct Concierge & Directions Actions */}
            <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-4 ${
              isDark ? 'bg-[#15151c] border-white/5' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-amber-500 block">Instant Concierge</span>
                <h4 className="text-lg font-serif font-medium">Planning Your Visit?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our concierge team can assist with driving directions, parking assistance on MG Road, or checking stock availability for specific shoe sizes prior to your arrival.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:+917350051590"
                    className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-300 hover:bg-zinc-100 text-zinc-900'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href="https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20am%20planning%20to%20visit%20your%20store%20at%20Kolsa%20Lane,%20Camp,%20Pune."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
