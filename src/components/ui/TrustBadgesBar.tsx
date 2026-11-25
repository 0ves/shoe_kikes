import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, Phone, Award, Sparkles } from 'lucide-react';

export const TrustBadgesBar: React.FC = () => {
  const { isDark } = useTheme();

  const trustFeatures = [
    {
      icon: <MapPin className="w-5 h-5 text-amber-400" />,
      title: 'Camp, Pune Flagship Atelier',
      subtitle: 'Visit Kolsa Lane, MG Road for personal trials and foot measurement',
      highlight: 'KOLSA LANE, CAMP',
      link: '#flagship-atelier'
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      title: 'Concierge: +91 73500 51590',
      subtitle: 'Call or WhatsApp our Master Lastmaker for appointments & inquiries',
      highlight: 'DIRECT LINE',
      link: 'tel:+917350051590'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Bespoke Fitting & Lasting',
      subtitle: 'Proprietary Indian lasts with 15% roomier toe spread for zero break-in pain',
      highlight: 'VIP SALON',
      link: '#comfort-innovation'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: '100% French Boxcalf Leather',
      subtitle: 'Hand-welted 360° Goodyear construction from Tannery D’Annonay',
      highlight: 'CERTIFIED CRAFT',
      link: '#collection-grid'
    }
  ];

  return (
    <section aria-label="Store Guarantees" className={`py-6 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#0c0c11] border-white/10 text-zinc-100'
        : 'bg-[#ffffff] border-zinc-200 text-zinc-950 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10 dark:divide-white/10">
          {trustFeatures.map((feat, idx) => {
            const Wrapper = feat.link.startsWith('http') || feat.link.startsWith('tel:') ? 'a' : 'a';

            return (
              <Wrapper
                key={feat.title}
                href={feat.link}
                className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all group ${
                  idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                } ${
                  isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-zinc-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl border flex-shrink-0 transition-transform group-hover:scale-105 ${
                  isDark ? 'bg-black/60 border-white/10 shadow-inner' : 'bg-red-50 border-red-200 shadow-sm text-red-600'
                }`}>
                  {feat.icon}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors ${
                      isDark ? 'text-zinc-100 group-hover:text-amber-300' : 'text-zinc-950 group-hover:text-red-600 font-bold'
                    }`}>
                      {feat.title}
                    </h3>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      isDark ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {feat.highlight}
                    </span>
                  </div>
                  <p className={`text-[11px] font-normal mt-1 leading-snug transition-colors ${
                    isDark ? 'text-zinc-400' : 'text-zinc-700 font-medium'
                  }`}>
                    {feat.subtitle}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
