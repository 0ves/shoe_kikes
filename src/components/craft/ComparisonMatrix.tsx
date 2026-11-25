import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Check, X, Crown, AlertTriangle } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const { isDark } = useTheme();

  const comparisonRows = [
    {
      feature: 'Upper Material',
      shoekicks: '100% Full-Grain French Boxcalf (1.4mm)',
      competitor: 'Synthetic PU, Plastic Rexine or Split Leather',
      winner: true
    },
    {
      feature: 'Insole & Cushioning',
      shoekicks: '5-Layer Poron Memory Foam + Portuguese Virgin Cork Bed',
      competitor: '1mm Flat Cardboard + Cheap Eva Sponge',
      winner: true
    },
    {
      feature: 'Sole Construction',
      shoekicks: '360° Hand-Welted Goodyear (Resoleable for 10+ Years)',
      competitor: 'Glued Toxic Cement (Sole separates within 6 months)',
      winner: true
    },
    {
      feature: 'Fit & Ergonomics',
      shoekicks: 'Anatomical Indian D/EE Lasts (Roomy Toe-Spread)',
      competitor: 'Narrow European Lasts (Causes Bunions & Pinching)',
      winner: true
    },
    {
      feature: 'Breathability & Odor',
      shoekicks: 'Natural Unsealed Pores (All-Day Odor Free at 42°C)',
      competitor: 'Traps Sweat and Humidity (Sweaty Socks & Odor)',
      winner: true
    },
    {
      feature: 'Weight Per Shoe',
      shoekicks: 'Featherlight (< 320g) with Tempered Steel Shank',
      competitor: 'Heavy & Clunky (600g+ causes Leg Drag)',
      winner: true
    },
    {
      feature: 'Fitting & Bespoke Trial',
      shoekicks: 'Private In-Store Salon Fitting & Custom Lasting (Kolsa Lane, Camp, Pune)',
      competitor: 'Standard Mass Sizing with No Individual Lasting',
      winner: true
    }
  ];

  return (
    <section className={`py-16 sm:py-24 border-t transition-colors duration-500 ${
      isDark
        ? 'bg-[#09090d] border-white/10 text-zinc-100'
        : 'bg-[#ffffff] border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase mb-3 ${
            isDark ? 'border-amber-400/30 text-amber-300 bg-amber-400/5' : 'border-red-500/30 text-red-600 bg-red-50 font-semibold'
          }`}>
            <Crown className="w-3.5 h-3.5" />
            <span>THE HONEST COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
            The Shoe Kicks vs <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Mass-Market Footwear</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-3 ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
            Why settling for cheaper fast-fashion shoes ends up costing more in foot pain and constant replacements.
          </p>
        </div>

        {/* Table Container */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0c0c11] border-white/10'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          {/* Mobile swipe helper */}
          <div className={`sm:hidden text-center text-[10px] font-mono py-1.5 border-b tracking-wider ${
            isDark ? 'text-zinc-500 border-white/5 bg-white/[0.02]' : 'text-zinc-600 border-zinc-200 bg-zinc-100'
          }`}>
            ⇄ Swipe horizontally to inspect comparison specs
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[560px] sm:min-w-0">
              {/* Header Row */}
              <div className={`grid grid-cols-12 p-4 sm:p-6 border-b items-center text-xs font-mono tracking-wider uppercase ${
                isDark ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50'
              }`}>
                <div className={`col-span-4 font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Engineering Metric
                </div>
                <div className={`col-span-4 sm:col-span-4 font-bold flex items-center gap-2 ${
                  isDark ? 'text-amber-400' : 'text-red-600'
                }`}>
                  <Crown className="w-4 h-4" />
                  <span>THE SHOE KICKS</span>
                </div>
                <div className={`col-span-4 font-bold flex items-center gap-1 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>REGULAR MASS BRANDS</span>
                </div>
              </div>

              {/* Rows */}
              <div className={`divide-y text-xs sm:text-sm ${isDark ? 'divide-white/10' : 'divide-zinc-200'}`}>
                {comparisonRows.map((row, idx) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-12 p-4 sm:p-5 items-center transition-colors ${
                      idx % 2 === 0
                        ? isDark ? 'bg-transparent' : 'bg-transparent'
                        : isDark ? 'bg-white/[0.02]' : 'bg-zinc-50/70'
                    }`}
                  >
                    {/* Metric Name */}
                    <div className={`col-span-4 font-medium pr-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-900 font-semibold'
                    }`}>
                      <span className="block">{row.feature}</span>
                    </div>

                    {/* The Shoe Kicks Spec */}
                    <div className="col-span-4 pr-3 flex items-start gap-2">
                      <div className={`p-1 rounded-full flex-shrink-0 mt-0.5 ${
                        isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-50 text-red-600'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={`font-semibold leading-tight ${
                        isDark ? 'text-white' : 'text-zinc-950 font-bold'
                      }`}>
                        {row.shoekicks}
                      </span>
                    </div>

                    {/* Competitor Spec */}
                    <div className="col-span-4 flex items-start gap-2">
                      <div className="p-1 rounded-full bg-rose-500/10 text-rose-400 flex-shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span className={`leading-tight text-xs ${
                        isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'
                      }`}>
                        {row.competitor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Callout */}
          <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'border-white/10 bg-black/60' : 'border-zinc-200 bg-zinc-100'
          }`}>
            <span className={`text-center sm:text-left ${isDark ? 'text-zinc-400' : 'text-zinc-700 font-medium'}`}>
              💡 <strong>Invest in Quality:</strong> One pair of The Shoe Kicks outlasts 4–5 pairs of disposable mass-market sneakers.
            </span>
            <a
              href="#collection-grid"
              className={`px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Shop The Masterpieces
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
