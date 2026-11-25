import React, { useState } from 'react';
import { CRAFT_PILLARS, REVIEWS } from '../../data/stories';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Star, ChevronRight } from 'lucide-react';

export const AtelierCraft: React.FC = () => {
  const { isDark } = useTheme();
  const [activeLayer, setActiveLayer] = useState(0);

  const shoeLayers = [
    {
      name: 'Full-Grain French Boxcalf',
      tag: 'Tannery D’Annonay Selection',
      desc: 'Selected from the tightest 2% center grain of young Alpine calfskins. Milled and drum-dyed for 30 days to ensure supple resilience without creasing.',
      spec: '1.4mm Calibrated Thickness'
    },
    {
      name: 'Anatomical Cork Filling',
      tag: 'Thermal & Shock Insulation',
      desc: 'Granulated Portuguese cork compounded with natural tree sap fills the cavity beneath the insole. Over 20 hours of body warmth, it forms a customized orthopedic imprint.',
      spec: '5mm Granulated Virgin Cork'
    },
    {
      name: 'Tempered Spring Steel Shank',
      tag: 'Arch Stability & Propulsion',
      desc: 'Heat-treated spring steel ribbon anchored between the heel breast and ball line to prevent arch fatigue during extended metropolitan wear.',
      spec: '3-Rib Arch Reinforcement'
    },
    {
      name: '360° Goodyear Storm Welt',
      tag: 'Centennial Recraftability',
      desc: 'Stitched with continuous 9-strand braided linen thread boiled in natural pitch. Allows the entire bottom unit to be renewed indefinitely without altering the upper last.',
      spec: '240 Interlocked Stitches'
    },
    {
      name: 'Oak-Bark Tanned Leather Outsole',
      tag: 'J. & F.J. Baker Tannery',
      desc: 'Tanned in gentle river pits for 14 months using ground oak bark. Incomparable abrasion resistance and breathability, fitted with flush brass toe-taps.',
      spec: '14-Month Natural Pit Tanning'
    }
  ];

  return (
    <section id="atelier-heritage" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Watermark (Image 3 typography style) */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center pointer-events-none select-none overflow-hidden opacity-5">
        <span className="font-display font-extrabold text-[18vw] text-white tracking-tighter leading-none block">
          ARTISAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.25em] ${
            isDark ? 'bg-[#1b1915] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-500/25 text-red-600 font-semibold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Construction
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            The Architecture of an <span className="italic text-gold-gradient font-light">Immortal Shoe</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Every pair is constructed with intentional longevity. Below the mirror-glazed boxcalf lies a multi-layered mechanical assembly engineered for lifetime restoration.
          </p>
        </div>

        {/* 2. Interactive Anatomy Exploded Stack */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border p-6 sm:p-10 lg:p-12 transition-all duration-300 ${
          isDark ? 'bg-[#0c0c10] border-white/10' : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          
          {/* Left: Layer Selector Interactive Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className={`text-xs uppercase font-mono tracking-widest block mb-2 ${
              isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
            }`}>
              Select Anatomical Component:
            </span>
            {shoeLayers.map((layer, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLayer(idx)}
                className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between ${
                  activeLayer === idx
                    ? isDark
                      ? 'bg-[#181612] border-[#d4af37]/60 ring-1 ring-[#d4af37]/30 shadow-lg'
                      : 'bg-red-50 border-red-500 ring-2 ring-red-400/40 shadow-sm text-zinc-900'
                    : isDark
                    ? 'bg-[#121217]/50 border-white/5 hover:border-white/20 text-zinc-400'
                    : 'bg-zinc-50 border-zinc-200 hover:border-red-400 text-zinc-700'
                }`}
              >
                <div>
                  <div className={`text-sm font-serif font-semibold ${
                    activeLayer === idx
                      ? isDark ? 'text-white' : 'text-red-700 font-bold'
                      : isDark ? 'text-zinc-300' : 'text-zinc-900'
                  }`}>
                    0{idx + 1}. {layer.name}
                  </div>
                  <div className={`text-[11px] font-mono mt-0.5 ${
                    activeLayer === idx && !isDark ? 'text-red-600' : 'text-zinc-400'
                  }`}>
                    {layer.tag}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeLayer === idx 
                    ? isDark ? 'text-[#d4af37] translate-x-1' : 'text-red-600 translate-x-1 font-bold'
                    : 'text-zinc-400'
                }`} />
              </button>
            ))}
          </div>

          {/* Right: Active Component Visual Card */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between min-h-[360px] ${
            isDark
              ? 'bg-gradient-to-br from-[#16161f] to-[#0d0d12] border-white/10'
              : 'bg-zinc-50 border-zinc-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10">
                <span className={`text-xs font-mono uppercase tracking-widest ${
                  isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
                }`}>
                  Layer 0{activeLayer + 1} of 05
                </span>
                <span className={`text-xs font-mono px-2.5 py-1 rounded border ${
                  isDark ? 'bg-[#d4af37]/15 border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-300 text-red-600 font-bold'
                }`}>
                  {shoeLayers[activeLayer].spec}
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-serif mt-6 ${
                isDark ? 'text-white' : 'text-zinc-950 font-bold'
              }`}>
                {shoeLayers[activeLayer].name}
              </h3>
              <p className={`text-xs font-serif italic mt-1 ${isDark ? 'text-[#e8caa4]' : 'text-red-600 font-semibold'}`}>
                {shoeLayers[activeLayer].tag}
              </p>

              <p className={`text-sm mt-4 leading-relaxed ${isDark ? 'text-zinc-300 font-light' : 'text-zinc-700 font-normal'}`}>
                {shoeLayers[activeLayer].desc}
              </p>
            </div>

            <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs ${
              isDark ? 'border-white/10 text-zinc-500' : 'border-zinc-200 text-zinc-600'
            }`}>
              <span>Recraftable at any authorized salon worldwide</span>
              <span className={`font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>100% Biodegradable Tannage</span>
            </div>
          </div>

        </div>

        {/* 3. The 4 Pillars of Marche Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFT_PILLARS.map((pillar, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#0f0f13] border-white/5 hover:border-[#d4af37]/30'
                  : 'bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-red-400'
              }`}
            >
              <div>
                <span className={`text-xs font-mono tracking-widest uppercase ${
                  isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
                }`}>
                  Pillar {pillar.step}
                </span>
                <h4 className={`text-lg font-serif font-medium mt-1 transition-colors ${
                  isDark ? 'text-white group-hover:text-[#e8caa4]' : 'text-zinc-950 font-bold group-hover:text-red-600'
                }`}>
                  {pillar.title}
                </h4>
                <p className={`text-xs font-serif italic mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600 font-medium'}`}>
                  {pillar.subtitle}
                </p>
                <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-zinc-500 font-light' : 'text-zinc-700 font-normal'}`}>
                  {pillar.description}
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t text-[11px] font-mono ${
                isDark ? 'border-white/5 text-[#e8caa4]' : 'border-zinc-100 text-red-600 font-semibold'
              }`}>
                {pillar.spec}
              </div>
            </div>
          ))}
        </div>

        {/* 4. Client Testimonials */}
        <div className={`pt-12 border-t ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
          <div className="text-center mb-10">
            <span className={`text-xs font-mono uppercase tracking-widest ${
              isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
            }`}>
              Patron Reviews
            </span>
            <h3 className={`text-2xl sm:text-3xl font-serif mt-1 ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
              Words From Our <span className={`italic font-light ${isDark ? 'text-gold-gradient' : 'text-red-600'}`}>Global Patrons</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(rev => (
              <div
                key={rev.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                  isDark
                    ? 'bg-[#111116] border-white/5'
                    : 'bg-white border-zinc-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{rev.date}</span>
                  </div>

                  <h5 className={`text-sm font-serif font-semibold ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
                    "{rev.title}"
                  </h5>

                  <p className={`text-xs mt-2 leading-relaxed italic ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
                    {rev.comment}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-white/5' : 'border-zinc-100'
                }`}>
                  <div>
                    <div className={`text-xs font-medium ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>{rev.author}</div>
                    <div className={`text-[10px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{rev.location}</div>
                  </div>
                  <span className={`text-[10px] font-mono border px-2 py-0.5 rounded ${
                    isDark ? 'text-[#e8caa4] border-[#d4af37]/20 bg-[#d4af37]/10' : 'text-red-700 border-red-200 bg-red-50 font-semibold'
                  }`}>
                    Client Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
