import React, { useState, useMemo } from 'react';
import type { Product, ShoeCategory } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Heart, ShoppingBag, Check, Star } from 'lucide-react';

interface PerfumeLuxuryGridProps {
  products: Product[];
  selectedCategory: ShoeCategory;
  onSelectCategory: (cat: ShoeCategory) => void;
  onOpenQuickView: (product: Product) => void;
}

export const PerfumeLuxuryGrid: React.FC<PerfumeLuxuryGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenQuickView
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isDark } = useTheme();

  const activeTab = selectedCategory;
  const [addedId, setAddedId] = useState<string | null>(null);
  const [addedSizeId, setAddedSizeId] = useState<string | null>(null);

  const handleTabChange = (cat: ShoeCategory) => {
    onSelectCategory(cat);
  };

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return products;
    return products.filter(p => p.category === activeTab);
  }, [products, activeTab]);

  const flagshipProduct = products[0];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[2] || 9.5, 'Standard (D)', 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleQuickAddSize = (e: React.MouseEvent, product: Product, size: number) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], size, 'Standard (D)', 1);
    setAddedId(product.id);
    setAddedSizeId(`${product.id}-${size}`);
    setTimeout(() => {
      setAddedId(null);
      setAddedSizeId(null);
    }, 2000);
  };

  const categoriesList: { id: ShoeCategory; label: string }[] = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'shoe-care', label: 'Foam Cleaner (150ml)' },
    { id: 'oxfords', label: 'Hand-Welted Oxfords' },
    { id: 'loafers', label: 'Sculpted Loafers' },
    { id: 'chelsea-boots', label: 'Chelsea Boots' },
    { id: 'luxury-sneakers', label: 'Sovereign Kicks' }
  ];

  return (
    <section id="collection-grid" className={`py-16 sm:py-24 border-t transition-colors duration-500 ${
      isDark
        ? 'bg-[#08080a] border-white/10 text-zinc-100'
        : 'bg-[#fafafa] border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Minimalist Top Editorial Header (Behance Luxury Perfume Concept style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 dark:border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono tracking-[0.3em] uppercase ${
                isDark ? 'text-zinc-500' : 'text-red-600 font-semibold'
              }`}>
                01 / THE ARCHIVE COLLECTION
              </span>
              <span className="w-8 h-[1px] bg-zinc-600/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase">
              Curated Masterpieces
            </h2>
          </div>

          {/* Clean Apple-style Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  activeTab === cat.id
                    ? isDark
                      ? 'bg-white text-black shadow-md'
                      : 'bg-red-600 text-white shadow-md'
                    : isDark
                    ? 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Behance Luxury Bento Grid Structure (Asymmetric Hero Card + 1px Grid Cells) */}
        <div className="mt-8 border border-white/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Bento Tier: Large Feature Card (Left) + 2 Product Cells (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 dark:divide-white/10">
            
            {/* Left Col (7 Cols): Masterpiece Spotlight with Sensory/Atelier Notes */}
            <div 
              onClick={() => onOpenQuickView(flagshipProduct)}
              className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between cursor-pointer group transition-colors duration-500 ${
                isDark ? 'bg-[#0b0b0e] hover:bg-[#0e0e13]' : 'bg-white hover:bg-zinc-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{flagshipProduct.serialNumber || 'REF. 01 / MASTERPIECE'}</span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] tracking-wider uppercase font-semibold ${
                    isDark ? 'border-[#d4af37]/30 text-[#e8caa4] bg-[#d4af37]/10' : 'border-red-500/30 text-red-600 bg-red-50'
                  }`}>
                    Flagship Silhouette
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif font-medium mt-4 tracking-tight group-hover:text-red-500 dark:group-hover:text-[#e8caa4] transition-colors">
                  {flagshipProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                  {flagshipProduct.tagline}
                </p>
              </div>

              {/* Consistent Studio Center Image with Smooth Hover Zoom */}
              <div className="my-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[#0c0c10] flex items-center justify-center p-4">
                <img
                  src={flagshipProduct.images.hero}
                  alt={`${flagshipProduct.name} — Handcrafted Bespoke Shoe by The Shoe Kicks Atelier, Camp, Pune`}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Olfactory / Atelier Notes Section (Perfume store inspiration!) */}
              <div className="space-y-4 pt-6 border-t border-white/10 dark:border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">Top Note</span>
                    <span className="text-[11px] font-medium leading-tight block">{flagshipProduct.notes?.head}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">Heart Note</span>
                    <span className="text-[11px] font-medium leading-tight block">{flagshipProduct.notes?.heart}</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">Base Note</span>
                    <span className="text-[11px] font-medium leading-tight block">{flagshipProduct.notes?.base}</span>
                  </div>
                </div>

                {/* Price & Savings Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-serif font-bold">
                        {formatPrice(flagshipProduct.price)}
                      </span>
                      {flagshipProduct.compareAtPrice && (
                        <>
                          <span className="text-sm text-zinc-500 line-through font-mono">
                            {formatPrice(flagshipProduct.compareAtPrice)}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            SAVE {Math.round((1 - flagshipProduct.price / flagshipProduct.compareAtPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                    <span className={`text-[11px] font-mono block mt-0.5 ${
                      isDark ? 'text-amber-400' : 'text-amber-700 font-semibold'
                    }`}>
                      ⚡ Masterpiece • Boutique Fitting at Kolsa Lane, Camp, Pune
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleQuickAdd(e, flagshipProduct)}
                      className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                        addedId === flagshipProduct.id
                          ? 'bg-emerald-600 text-white'
                          : isDark
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {addedId === flagshipProduct.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      <span>{addedId === flagshipProduct.id ? 'Added' : 'Add to Bag'}</span>
                    </button>
                  </div>
                </div>

                {/* Instant Size Selector Strip (Neeman's & Bacca Bucci Conversion Feature) */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600 font-semibold'
                    }`}>
                      INSTANT SIZE (US/UK):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {flagshipProduct.sizes.slice(0, 6).map(sz => (
                        <button
                          key={sz}
                          onClick={(e) => handleQuickAddSize(e, flagshipProduct, sz)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                            addedSizeId === `${flagshipProduct.id}-${sz}`
                              ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                              : isDark
                              ? 'bg-white/5 border-white/10 hover:border-amber-400 hover:text-white text-zinc-300'
                              : 'bg-zinc-100 border-zinc-200 hover:border-red-600 hover:text-red-600 text-zinc-800'
                          }`}
                          title={`Add Size ${sz}`}
                        >
                          {addedSizeId === `${flagshipProduct.id}-${sz}` ? '✓' : sz}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">True to Size • Indian Last</span>
                </div>
              </div>
            </div>

            {/* Right Col (5 Cols): 2 Stacked Grid Cells */}
            <div className="lg:col-span-5 grid grid-cols-1 divide-y divide-white/10 dark:divide-white/10">
              {filteredProducts.slice(1, 3).map((product) => (
                <div
                  key={product.id}
                  onClick={() => onOpenQuickView(product)}
                  className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition-colors duration-500 ${
                    isDark ? 'bg-[#09090c] hover:bg-[#0e0e13]' : 'bg-white hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>{product.serialNumber}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-zinc-500'}`} />
                    </button>
                  </div>

                  {/* Consistent Studio Center Image */}
                  <div className="my-4 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0c0c10] flex items-center justify-center p-3">
                    <img
                      src={product.images.hero}
                      alt={`${product.name} — Handcrafted Luxury Shoe by The Shoe Kicks, Camp, Pune`}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="pt-2">
                    {/* Rating & Serial */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-semibold">{product.rating}</span>
                        <span className="text-[10px] text-zinc-500">({product.reviewsCount})</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">In Stock</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-serif font-medium group-hover:text-red-500 dark:group-hover:text-[#e8caa4] transition-colors truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 flex-shrink-0">
                        <span className="text-sm font-serif font-bold">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[11px] text-zinc-500 line-through font-mono">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 font-light mt-0.5 truncate">
                      {product.craftDetails.upper}
                    </p>

                    {/* Quick Size Bar (Neeman's style) */}
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {product.sizes.slice(0, 5).map(sz => (
                          <button
                            key={sz}
                            onClick={(e) => handleQuickAddSize(e, product, sz)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-all ${
                              addedSizeId === `${product.id}-${sz}`
                                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                                : isDark
                                ? 'bg-white/5 border-white/10 hover:border-amber-400 hover:text-white text-zinc-400'
                                : 'bg-zinc-100 border-zinc-200 hover:border-red-600 hover:text-red-600 text-zinc-700'
                            }`}
                            title={`Add Size ${sz}`}
                          >
                            {addedSizeId === `${product.id}-${sz}` ? '✓' : sz}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`p-1.5 rounded-full transition-all ${
                          addedId === product.id
                            ? 'bg-emerald-600 text-white'
                            : isDark
                            ? 'bg-white/10 hover:bg-white text-zinc-300 hover:text-black'
                            : 'bg-zinc-100 hover:bg-red-600 text-zinc-700 hover:text-white'
                        }`}
                        title="Add to Bag"
                      >
                        {addedId === product.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Middle Editorial Sensory Quote Banner */}
          <div className={`p-8 sm:p-12 border-t border-b border-white/10 dark:border-white/10 text-center space-y-2 ${
            isDark ? 'bg-[#070709]' : 'bg-zinc-100/80'
          }`}>
            <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isDark ? 'text-zinc-500' : 'text-red-600 font-bold'}`}>
              CRAFTSMANSHIP MANIFESTO
            </span>
            <p className={`text-lg sm:text-2xl font-serif italic max-w-2xl mx-auto transition-colors ${
              isDark ? 'text-zinc-300' : 'text-zinc-950 font-medium'
            }`}>
              "In bespoke shoemaking, what is hidden beneath the insole matters just as much as the mirror glaze upon the vamp."
            </p>
            <span className={`text-xs font-mono block pt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-700 font-medium'}`}>
              360° GOODYEAR WELT • FRENCH BOXCALF • BESPOKE SALON CAMP PUNE
            </span>
          </div>

          {/* Bottom Grid Tier: Equal 3-Column Architectural Cells with 1px dividing lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 dark:divide-white/10">
            {filteredProducts.slice(3, 9).map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenQuickView(product)}
                className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition-colors duration-500 ${
                  isDark ? 'bg-[#09090c] hover:bg-[#0e0e13]' : 'bg-white hover:bg-zinc-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>{product.serialNumber}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-zinc-500'}`} />
                    </button>
                  </div>

                  {/* Consistent Studio Center Image */}
                  <div className="my-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0c0c10] flex items-center justify-center p-4">
                    <img
                      src={product.images.hero}
                      alt={`${product.name} — Handcrafted Goodyear Welted Footwear by The Shoe Kicks, Camp, Pune`}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div>
                  {/* Rating Stars & Stock */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-semibold">{product.rating}</span>
                      <span className="text-[10px] text-zinc-500">({product.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Camp Pune Salon</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base sm:text-lg font-serif font-medium group-hover:text-red-500 dark:group-hover:text-[#e8caa4] transition-colors truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 flex-shrink-0">
                      <span className="text-sm font-serif font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-[11px] text-zinc-500 line-through font-mono">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-light mt-0.5 truncate">
                    {product.craftDetails.upper}
                  </p>

                  {/* Inline Quick Size Chips (Neeman's / Bacca Bucci Instant Selection) */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {product.sizes.slice(0, 5).map(sz => (
                        <button
                          key={sz}
                          onClick={(e) => handleQuickAddSize(e, product, sz)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono border transition-all ${
                            addedSizeId === `${product.id}-${sz}`
                              ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                              : isDark
                              ? 'bg-white/5 border-white/10 hover:border-amber-400 hover:text-white text-zinc-400'
                              : 'bg-zinc-100 border-zinc-200 hover:border-red-600 hover:text-red-600 text-zinc-700'
                          }`}
                          title={`Add Size ${sz}`}
                        >
                          {addedSizeId === `${product.id}-${sz}` ? '✓' : sz}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`p-1.5 rounded-full transition-all ${
                        addedId === product.id
                          ? 'bg-emerald-600 text-white'
                          : isDark
                          ? 'bg-white/10 hover:bg-white text-zinc-300 hover:text-black'
                          : 'bg-zinc-100 hover:bg-red-600 text-zinc-700 hover:text-white'
                      }`}
                      title="Add to Bag"
                    >
                      {addedId === product.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
