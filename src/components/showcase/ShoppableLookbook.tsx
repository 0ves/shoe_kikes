import React, { useState } from 'react';
import type { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';

interface ShoppableLookbookProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const ShoppableLookbook: React.FC<ShoppableLookbookProps> = ({
  products,
  onOpenQuickView
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isDark } = useTheme();

  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const lookbooks = [
    {
      id: 1,
      title: 'Look 01: The Street Tailoring Silhouette',
      subtitle: 'Charcoal Pleated Trousers with Sovereign Kicks',
      image: '/images/shoes/aesthetic-sneaker-noir.jpg',
      tag: 'STREET LUXE',
      product: products.find(p => p.category === 'luxury-sneakers') || products[0],
      hotspot: { x: '52%', y: '82%' }
    },
    {
      id: 2,
      title: 'Look 02: Sartorial Royal Atelier',
      subtitle: 'Bespoke Double-Breasted Suit & Imperial Oxford',
      image: '/images/shoes/aesthetic-oxford-cognac.jpg',
      tag: 'ROYAL BESPOKE',
      product: products[0],
      hotspot: { x: '48%', y: '85%' }
    },
    {
      id: 3,
      title: 'Look 03: Raw Selvedge Weekend Roaming',
      subtitle: 'Japanese Kuroki Denim & Chelsea Boot',
      image: '/images/shoes/aesthetic-chelsea-noir.jpg',
      tag: 'HERITAGE CASUAL',
      product: products.find(p => p.category === 'chelsea-boots') || products[1],
      hotspot: { x: '50%', y: '80%' }
    }
  ];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[2] || 9.5, 'Standard (D)', 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="shoppable-lookbook" className={`py-16 sm:py-24 border-t transition-colors duration-500 ${
      isDark
        ? 'bg-[#08080b] border-white/10 text-zinc-100'
        : 'bg-[#fafafa] border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-mono tracking-[0.25em] uppercase font-bold ${
                isDark ? 'text-amber-400' : 'text-red-600'
              }`}>
                03 / SHOP THE STREET & LOOKBOOK
              </span>
              <span className="w-8 h-[1px] bg-zinc-600/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
              Curated Styled Ensembles
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
            Interactive street styling inspired by Indian urban fashion tastemakers. Tap any glowing pin to shop the exact silhouette worn.
          </p>
        </div>

        {/* 3-Column Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {lookbooks.map((look) => {
            const isHovered = activeHotspot === look.id;

            return (
              <div
                key={look.id}
                onMouseEnter={() => setActiveHotspot(look.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                className={`relative rounded-3xl overflow-hidden border group transition-all duration-500 shadow-xl ${
                  isDark ? 'bg-[#0d0d12] border-white/10' : 'bg-white border-zinc-200 shadow-lg'
                }`}
              >
                {/* Main Look Photo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
                  <img
                    src={look.image}
                    alt={`${look.title} — ${look.subtitle} | The Shoe Kicks Street Lookbook, Camp, Pune`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md border border-white/10 text-white flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      {look.tag}
                    </span>
                  </div>

                  {/* Pulsing Interactive Hotspot Pin */}
                  <div
                    style={{ left: look.hotspot.x, top: look.hotspot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                    onClick={() => setActiveHotspot(isHovered ? null : look.id)}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-400 text-black font-bold text-xs items-center justify-center shadow-lg border-2 border-white">
                        +
                      </span>
                    </span>
                  </div>

                  {/* Floating Shoppable Mini Product Card (Revealed on Hover or Tap) */}
                  <div className={`absolute bottom-4 inset-x-4 z-30 transition-all duration-300 transform ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
                  }`}>
                    <div className="p-3.5 rounded-2xl bg-[#0e0e14]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-3">
                      {/* Product Thumbnail */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10 flex items-center justify-center p-1">
                        <img
                          src={look.product.images.hero}
                          alt={`${look.product.name} — Handcrafted by The Shoe Kicks, Camp, Pune`}
                          className="w-full h-full object-contain filter drop-shadow-md"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow min-w-0">
                        <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block">
                          AS WORN IN LOOK
                        </span>
                        <h4 className="text-xs font-serif font-medium text-white truncate">
                          {look.product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xs font-serif font-bold text-white">
                            {formatPrice(look.product.price)}
                          </span>
                          {look.product.compareAtPrice && (
                            <span className="text-[10px] text-zinc-500 line-through">
                              {formatPrice(look.product.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(e, look.product)}
                        className={`p-2.5 rounded-xl transition-all shadow-md active:scale-95 flex-shrink-0 ${
                          addedId === look.product.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gold-gradient text-black font-bold hover:opacity-90'
                        }`}
                        title="Add to Bag"
                      >
                        {addedId === look.product.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onOpenQuickView(look.product)}
                        className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Card Bottom Meta */}
                <div className="p-5">
                  <h3 className="text-base font-serif font-medium tracking-tight">
                    {look.title}
                  </h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
                    {look.subtitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
