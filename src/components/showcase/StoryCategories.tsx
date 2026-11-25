import React from 'react';
import type { ShoeCategory } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Flame, Sparkles } from 'lucide-react';

interface StoryCategoriesProps {
  selectedCategory: ShoeCategory;
  onSelectCategory: (cat: ShoeCategory) => void;
}

export const StoryCategories: React.FC<StoryCategoriesProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { isDark } = useTheme();

  const categories = [
    {
      id: 'all' as ShoeCategory,
      title: 'All Silhouettes',
      subtitle: 'Complete Vault',
      image: '/images/shoes/aesthetic-oxford-noir.jpg',
      badge: 'ALL 8'
    },
    {
      id: 'luxury-sneakers' as ShoeCategory,
      title: 'Sovereign Kicks',
      subtitle: 'Urban Streetwear',
      image: '/images/shoes/aesthetic-sneaker-white.jpg',
      badge: 'HOT DROP',
      isHot: true
    },
    {
      id: 'oxfords' as ShoeCategory,
      title: 'Imperial Oxfords',
      subtitle: 'Hand-Welted 360°',
      image: '/images/shoes/aesthetic-oxford-cognac.jpg',
      badge: 'FORMAL'
    },
    {
      id: 'loafers' as ShoeCategory,
      title: 'Sculpted Loafers',
      subtitle: 'Belgian & Horsebit',
      image: '/images/shoes/aesthetic-loafer-noir.jpg',
      badge: 'TIMELESS'
    },
    {
      id: 'chelsea-boots' as ShoeCategory,
      title: 'Chelsea Boots',
      subtitle: 'Ankle Armour',
      image: '/images/shoes/aesthetic-chelsea-noir.jpg',
      badge: 'ICONIC'
    },
    {
      id: 'limited-edition' as ShoeCategory,
      title: 'Atelier Vault',
      subtitle: 'Rare Patinas',
      image: '/images/shoes/aesthetic-monkstrap-cognac.jpg',
      badge: 'LIMITED',
      isAtelier: true
    },
    {
      id: 'shoe-care' as ShoeCategory,
      title: 'Foam Cleaner',
      subtitle: '150ml Self-Foaming',
      image: '/images/cleaner/cleaner-studio-hero.jpg',
      badge: 'ATELIER CARE',
      isHot: true
    }
  ];

  const handleCategoryClick = (id: ShoeCategory) => {
    onSelectCategory(id);
    const target = document.getElementById('collection-grid');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section aria-label="Shoe Silhouettes" className={`py-6 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#0a0a0d] border-white/10'
        : 'bg-[#ffffff] border-zinc-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Header (Neeman's style) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono tracking-[0.25em] uppercase font-bold ${
              isDark ? 'text-amber-400' : 'text-red-600'
            }`}>
              EXPLORE BY SILHOUETTE
            </span>
            <span className="w-6 h-[1px] bg-zinc-500/40" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Engineered for Indian Ergonomics
          </span>
        </div>

        {/* Horizontal Story Pills Scroll Row */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none select-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center flex-shrink-0 transition-transform active:scale-95 text-center focus:outline-none"
              >
                {/* Circular Shoe Thumbnail Container */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? 'ring-2 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-105'
                      : 'ring-2 ring-red-600 shadow-[0_0_20px_rgba(220,38,38,0.35)] scale-105'
                    : isDark
                    ? 'ring-1 ring-white/10 hover:ring-white/40 bg-[#121218]'
                    : 'ring-1 ring-zinc-200 hover:ring-zinc-400 bg-zinc-50'
                }`}>
                  {/* Inner Image Ring */}
                  <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2 ${
                    isDark ? 'bg-gradient-to-b from-[#181822] to-[#0c0c10]' : 'bg-gradient-to-b from-zinc-100 to-zinc-200'
                  }`}>
                    <img
                      src={cat.image}
                      alt={`${cat.title} — ${cat.subtitle} by The Shoe Kicks Atelier, Camp, Pune`}
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Micro Floating Badge */}
                  {cat.badge && (
                    <div className={`absolute -bottom-1 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-wider uppercase border shadow-md flex items-center gap-1 ${
                      cat.isHot
                        ? 'bg-rose-600 text-white border-rose-500'
                        : cat.isAtelier
                        ? 'bg-amber-500 text-black border-amber-400'
                        : isDark
                        ? 'bg-[#1e1e28] text-zinc-300 border-white/20'
                        : 'bg-white text-zinc-800 border-zinc-300'
                    }`}>
                      {cat.isHot && <Flame className="w-2.5 h-2.5" />}
                      {cat.isAtelier && <Sparkles className="w-2.5 h-2.5" />}
                      <span>{cat.badge}</span>
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <span className={`mt-3 text-xs sm:text-sm font-serif font-medium tracking-tight block transition-colors ${
                  isActive
                    ? isDark ? 'text-amber-400 font-semibold' : 'text-red-600 font-bold'
                    : isDark ? 'text-zinc-200 group-hover:text-white' : 'text-zinc-800 group-hover:text-zinc-950'
                }`}>
                  {cat.title}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider block -mt-0.5">
                  {cat.subtitle}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
