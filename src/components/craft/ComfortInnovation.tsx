import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Feather, Wind, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ComfortInnovation: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'cloud-walk',
      icon: <Wind className="w-6 h-6 text-amber-400" />,
      tag: 'ERGONOMIC COMFORT',
      title: 'CloudWalk 5-Layer Ergo Cushioning',
      subtitle: 'Engineered for 14-Hour Walking Without Arch Fatigue',
      description: 'Unlike stiff traditional dress shoes or squishy foam sneakers that collapse in weeks, our hybrid footbed layers 5mm of natural Portuguese virgin cork over high-rebound orthopedic Poron foam. Within 7 days of wear, it mold-melts to your exact foot imprint.',
      bulletPoints: [
        'Absorbs 85% of heel impact on hard concrete floors',
        'Custom thermal contouring to your unique arch profile',
        'High-density micro-cell Poron that never flattens out',
        'Natural moisture-wicking cork layer prevents odor'
      ],
      stat: '85%',
      statLabel: 'Shock Reduction',
      image: '/images/shoes/aesthetic-craft-atelier.jpg'
    },
    {
      id: 'indian-fit',
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
      tag: 'BESPOKE INDIAN LAST',
      title: 'Engineered for Indian Foot Anatomy',
      subtitle: 'No More Painful Toe-Pinching or Blisters',
      description: 'Most imported European shoes are sculpted on ultra-narrow lasts that squeeze the metatarsals of Indian feet. We spent 3 years sculpting proprietary D & EE anatomical lasts with an expanded toe-box box and fortified heel pocket for natural toe spread.',
      bulletPoints: [
        '15% roomier ball-girth prevents bunions and rubbing',
        'Firm heel grip eliminates heel slipping and blister friction',
        'Available in both Standard (D) and Wide (EE) profiles',
        'Designed from 10,000+ Indian 3D foot scan datasets'
      ],
      stat: '0',
      statLabel: 'Break-in Blisters',
      image: '/images/shoes/aesthetic-loafer-noir.jpg'
    },
    {
      id: 'featherlight',
      icon: <Feather className="w-6 h-6 text-amber-400" />,
      tag: 'LIGHTWEIGHT AGILITY',
      title: 'Featherlight Architecture (< 320g)',
      subtitle: 'All-Day Performance Without Heavy Leg Drag',
      description: 'Traditional welted shoes weigh over 650 grams each, causing calf fatigue by afternoon. By integrating aerospace-grade spring-tempered steel shanks with lightweight blown-rubber outsoles, we cut weight in half while doubling structural stability.',
      bulletPoints: [
        'Weighs less than 320g per shoe (45% lighter than benchmark shoes)',
        'Tempered steel shank supports your plantar fascia ligament',
        'Seamless flex groove at ball of the foot for natural gait roll',
        'Effortless agility for airport sprints, driving, and boardroom stands'
      ],
      stat: '<320g',
      statLabel: 'Per Shoe Weight',
      image: '/images/shoes/aesthetic-craft-atelier.jpg'
    },
    {
      id: 'breathable',
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      tag: 'ALL-WEATHER CLIMATE',
      title: '100% Breathable Full-Grain Boxcalf',
      subtitle: 'Natural Micro-Porous Leather Keeps Feet Fresh at 42°C',
      description: 'Synthetic fake leather (rexine and PU) traps foot sweat, leading to bad odor and damp socks. We use unbroken full-grain French boxcalf drum-dyed with organic vegetable extracts, allowing millions of microscopic pores to breathe freely.',
      bulletPoints: [
        'Drum-dyed aniline leather with unsealed natural pore grain',
        'Butter-soft drum-tanned calfskin interior lining',
        'Natural antibacterial tannins eliminate odor-causing bacteria',
        'Resistant to rain and dust with easy mirror-wax maintenance'
      ],
      stat: '24h',
      statLabel: 'Odor-Free Freshness',
      image: '/images/shoes/aesthetic-oxford-noir.jpg'
    }
  ];

  const current = pillars[activeTab];

  return (
    <section id="comfort-innovation" className={`py-16 sm:py-24 border-t transition-colors duration-500 ${
      isDark
        ? 'bg-[#08080a] border-white/10 text-zinc-100'
        : 'bg-[#fafafa] border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Neeman's Comfort + Bacca Bucci Tech Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase mb-4 ${
            isDark ? 'border-amber-400/30 text-amber-300 bg-amber-400/5' : 'border-red-500/30 text-red-600 bg-red-50 font-semibold'
          }`}>
            COMFORT & ANATOMY LAB
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
            Why Indian Feet Choose <span className={isDark ? 'text-gold-gradient' : 'text-red-600'}>The Shoe Kicks</span>
          </h2>
          <p className={`text-sm sm:text-base mt-4 ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
            We obsessed over the 5 critical pain points of footwear—blisters, sweat, arch fatigue, narrow fit, and sole peeling—and re-engineered every millimetre.
          </p>
        </div>

        {/* Tab Buttons (Neeman's high-contrast selector) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-10">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                activeTab === idx
                  ? isDark
                    ? 'bg-[#14141d] border-amber-400/60 shadow-[0_10px_25px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/40'
                    : 'bg-white border-red-500 shadow-lg ring-1 ring-red-500'
                  : isDark
                  ? 'bg-[#0f0f14] border-white/5 hover:border-white/20 text-zinc-400'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`p-2 rounded-xl border ${
                  activeTab === idx
                    ? isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-red-50 border-red-200 text-red-600'
                    : isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-100 border-zinc-200'
                }`}>
                  {p.icon}
                </span>
                <span className={`text-[10px] font-mono font-bold ${
                  activeTab === idx
                    ? isDark ? 'text-amber-400' : 'text-red-600'
                    : 'text-zinc-500'
                }`}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase block text-zinc-500">
                  {p.tag}
                </span>
                <h3 className={`text-sm font-semibold tracking-tight mt-0.5 line-clamp-1 ${
                  activeTab === idx
                    ? isDark ? 'text-white' : 'text-zinc-950 font-bold'
                    : isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  {p.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Feature Detail Stage (Split 2-Column Showcase) */}
        <div className={`rounded-3xl border overflow-hidden p-6 sm:p-10 transition-all ${
          isDark
            ? 'bg-[#0d0d12] border-white/10 shadow-2xl'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left 7 Columns: Content & Proof Points */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className={`text-xs font-mono tracking-[0.2em] uppercase font-bold ${
                  isDark ? 'text-amber-400' : 'text-red-600'
                }`}>
                  {current.tag} • PROPRIETARY ATELIER TECH
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-medium tracking-tight">
                  {current.title}
                </h3>
                <p className={`text-sm font-medium italic ${isDark ? 'text-zinc-400' : 'text-zinc-600 font-semibold'}`}>
                  "{current.subtitle}"
                </p>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-zinc-300 font-light' : 'text-zinc-700 font-normal'
              }`}>
                {current.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {current.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      isDark ? 'text-amber-400' : 'text-red-600'
                    }`} />
                    <span className={`text-xs sm:text-sm ${
                      isDark ? 'text-zinc-300' : 'text-zinc-800 font-medium'
                    }`}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stat Highlight Banner */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between mt-6 ${
                isDark ? 'bg-black/50 border-white/10' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <span className={`text-xs uppercase font-mono tracking-wider block ${
                    isDark ? 'text-zinc-500' : 'text-zinc-600 font-medium'
                  }`}>
                    Observed Metric
                  </span>
                  <span className={`text-sm font-semibold ${
                    isDark ? 'text-zinc-200' : 'text-zinc-900'
                  }`}>
                    {current.statLabel}
                  </span>
                </div>
                <div className={`text-3xl sm:text-4xl font-serif font-black ${
                  isDark ? 'text-gold-gradient' : 'text-red-600'
                }`}>
                  {current.stat}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visual Image & Anatomy Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-2xl">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Corner floating badge */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl backdrop-blur-md bg-black/70 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 block">Tested Standard</span>
                    <span className="text-xs font-semibold text-white">Certified Marche Atelier Standard</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">100% Recraftable</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
