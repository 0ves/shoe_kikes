import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, Phone, Clock, Navigation, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';

export const CampPuneAtelier: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="flagship-atelier"
      aria-label="Camp Pune Flagship Atelier and Store"
      itemScope
      itemType="https://schema.org/ShoeStore"
      className={`py-16 sm:py-24 border-t transition-colors duration-500 relative overflow-hidden ${
        isDark
          ? 'bg-[#09090d] border-white/10 text-zinc-100'
          : 'bg-[#fafafa] border-zinc-200 text-zinc-950'
      }`}
    >
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase mb-4 ${
            isDark ? 'border-amber-400/30 text-amber-300 bg-amber-400/5' : 'border-red-500/30 text-red-600 bg-red-50 font-semibold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOLSA LANE, CAMP, PUNE • FLAGSHIP ATELIER & STORE</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-serif font-medium tracking-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Visit Our Flagship Store in <span itemProp="addressLocality" className={isDark ? 'text-gold-gradient' : 'text-red-600'}>Camp, Pune</span>
          </h2>
          
          <p className={`text-xs sm:text-sm font-normal mt-3 leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-700'
          }`}>
            Located at Kolsa Lane on historic MG Road, Camp, Pune. Step into our luxury footwear boutique for personal trials, foot measurement, custom hand-patina blending, and Master Lastmaker consultations.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0d0d14] border-white/10'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 dark:divide-white/10">
            
            {/* Left 7 Columns: Physical Address, Contact, Timings & Services */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              
              {/* Store Identity & Geo Details */}
              <div>
                <span className={`text-[10px] font-mono tracking-[0.25em] uppercase block mb-1 ${
                  isDark ? 'text-zinc-500' : 'text-red-600 font-semibold'
                }`}>
                  OFFICIAL STORE &amp; BESPOKE SALON
                </span>
                <h3 itemProp="name" className={`text-2xl sm:text-3xl font-serif font-semibold ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}>
                  The Shoe Kicks Atelier — Camp, Pune
                </h3>
                <p itemProp="description" className={`text-xs mt-1 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-700'
                }`}>
                  Handcrafted bespoke shoes, 360° Goodyear welted oxfords, boots &amp; sovereign luxury sneakers.
                </p>
              </div>

              {/* Address Card with Schema Attributes */}
              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  isDark ? 'bg-black/50 border-white/5' : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                  isDark ? 'bg-[#15151f] border-white/10 text-amber-400' : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-mono tracking-wider block font-semibold ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    Physical Store Address:
                  </span>
                  <div className="text-sm font-medium mt-0.5 leading-snug">
                    <span itemProp="streetAddress" className={`font-bold block text-base ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}>
                      387, Kolsa Gali (Kolsa Lane), MG Road, Camp
                    </span>
                    <span className={isDark ? 'text-zinc-300 text-xs' : 'text-zinc-700 text-xs font-medium'}>
                      <span itemProp="addressLocality">Pune</span>, <span itemProp="addressRegion">Maharashtra</span> — <span itemProp="postalCode">411001</span>, <span itemProp="addressCountry">India</span>
                    </span>
                  </div>
                  <span className={`text-[11px] block mt-1.5 font-mono ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    📍 Landmark: Off MG Road • Heart of Camp Shopping Precinct
                  </span>
                </div>
              </div>

              {/* Contact & Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Hours */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-red-600'}`} />
                    <span className={`font-mono uppercase tracking-wider text-[10px] font-bold ${
                      isDark ? 'text-zinc-400' : 'text-zinc-700'
                    }`}>Store Hours:</span>
                  </div>
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                    Open Daily: 9:00 AM – 10:00 PM
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Monday – Sunday: 9:00 AM – 10:00 PM IST
                  </div>
                </div>

                {/* Telephone */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-red-600'}`} />
                    <span className={`font-mono uppercase tracking-wider text-[10px] font-bold ${
                      isDark ? 'text-zinc-400' : 'text-zinc-700'
                    }`}>Concierge &amp; Enquiries:</span>
                  </div>
                  <a
                    href="tel:+917350051590"
                    className={`font-black text-sm font-mono block transition-colors ${
                      isDark ? 'text-amber-300 hover:text-white' : 'text-red-600 hover:text-red-700'
                    }`}
                  >
                    <span itemProp="telephone">+91 73500 51590</span>
                  </a>
                  <a
                    href="mailto:concierge@theshoekicks.com"
                    className={`text-[11px] hover:underline block truncate mt-0.5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    <span itemProp="email">concierge@theshoekicks.com</span>
                  </a>
                </div>
              </div>

              {/* In-Salon Services Checklist */}
              <div className={`space-y-2 pt-2 border-t text-xs ${
                isDark ? 'border-white/5 text-zinc-300' : 'border-zinc-200 text-zinc-800'
              }`}>
                <div className={`font-mono uppercase tracking-widest text-[10px] font-bold ${
                  isDark ? 'text-zinc-500' : 'text-zinc-600'
                }`}>
                  EXCLUSIVE CAMP, PUNE IN-STORE EXPERIENCES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>In-Store 3D Foot Digitization &amp; Fitting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>French Boxcalf Leather Swatch Library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Goodyear Welt Recrafting &amp; Polishing Bar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Master Cobbler Consultations (Walk-Ins Welcome)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-gold-gradient text-black hover:opacity-90'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Store Directions</span>
                </a>

                <a
                  href="tel:+917350051590"
                  className={`px-5 py-3 rounded-xl border text-xs font-semibold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                      : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-900 font-bold'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Call +91 73500 51590</span>
                </a>

                <a
                  href="https://wa.me/917350051590?text=Hi%20The%20Shoe%20Kicks,%20I%20would%20like%20to%20visit%20your%20Camp%20Pune%20store%20for%20a%20shoe%20fitting."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right 5 Columns: High Aesthetics Boutique Visual */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              {/* High Aesthetics Boutique Image Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-2xl">
                <img
                  src="/images/editorial/luxury-storefront.jpg"
                  alt="The Shoe Kicks Luxury Footwear Boutique in Kolsa Lane MG Road Camp Pune India"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl backdrop-blur-md bg-black/80 border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                      HERITAGE FLAGSHIP
                    </span>
                    <span className="text-xs font-bold text-white">
                      Kolsa Lane, MG Road, Camp, Pune
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Open Daily 9 AM – 10 PM
                  </span>
                </div>
              </div>

              {/* Boutique Highlights Card */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                isDark ? 'bg-black/50 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>CAMP PUNE FLAGSHIP SALON</span>
                  <span className="text-amber-500">IN-STORE TRIALS</span>
                </div>
                <p className={`text-xs font-normal leading-relaxed ${
                  isDark ? 'text-zinc-300' : 'text-zinc-800'
                }`}>
                  Visit our physical boutique on Kolsa Lane, MG Road for tailored trials, sizing consultations, and exclusive atelier patinas.
                </p>
                <div className={`pt-1 flex items-center gap-2 text-[10px] font-mono ${
                  isDark ? 'text-zinc-500' : 'text-zinc-600 font-medium'
                }`}>
                  <span>📍 PIN: 411001</span>
                  <span>•</span>
                  <span>Master Atelier</span>
                  <span>•</span>
                  <span>Instant Collection</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
