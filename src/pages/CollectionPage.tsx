import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import type { Product, ShoeCategory } from '../types';
import { useSeo } from '../hooks/useSeo';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Star, Heart, ShoppingBag, Eye, Check, SlidersHorizontal, 
  RotateCcw, Sparkles, ArrowRight, Phone 
} from 'lucide-react';

interface CollectionPageProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  products,
  onOpenQuickView
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isDark } = useTheme();

  // URL searchParams is the single source of truth for category filtering
  const selectedCategory = (searchParams.get('cat') as ShoeCategory) || 'all';

  const categoryTitles: Record<string, string> = {
    all: 'Complete Footwear Masterpiece Collection',
    'shoe-care': 'Atelier Foaming Shoe Cleaner (150ml)',
    oxfords: 'Hand-Welted Goodyear Oxfords',
    loafers: 'Sculpted Milanese Horsebit Loafers',
    'chelsea-boots': 'Wholecut Seamless Chelsea Boots',
    'luxury-sneakers': 'Sovereign Vitello Nappa Luxury Kicks'
  };

  const currentCategoryName = categoryTitles[selectedCategory] || 'Luxury Footwear Collection';

  useSeo({
    title: `${currentCategoryName} | The Shoe Kicks Atelier, Camp, Pune`,
    description: `Discover ${currentCategoryName.toLowerCase()} crafted from French boxcalf and Goodyear welted soles. Handcrafted at The Shoe Kicks flagship atelier, Kolsa Lane, MG Road, Camp, Pune - 411001. Concierge +91 73500 51590.`,
    canonical: `https://theshoekicks.com/collection${selectedCategory !== 'all' ? `?cat=${selectedCategory}` : ''}`,
    keywords: `${currentCategoryName}, bespoke shoes Pune, Goodyear welted Camp Pune, formal shoes MG Road, luxury footwear India`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${currentCategoryName} — The Shoe Kicks`,
      url: `https://theshoekicks.com/collection${selectedCategory !== 'all' ? `?cat=${selectedCategory}` : ''}`,
      description: `Handcrafted ${currentCategoryName.toLowerCase()} by The Shoe Kicks atelier in Camp, Pune.`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'The Shoe Kicks',
        url: 'https://theshoekicks.com/'
      }
    }
  });

  const [selectedWidth, setSelectedWidth] = useState<'all' | 'Standard (D)' | 'Wide (EE)'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Sync category param with URL
  const handleCategoryChange = (cat: ShoeCategory | 'all') => {
    if (cat === 'all') {
      const next = new URLSearchParams(searchParams);
      next.delete('cat');
      setSearchParams(next);
    } else {
      const next = new URLSearchParams(searchParams);
      next.set('cat', cat);
      setSearchParams(next);
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedWidth !== 'all' && !p.widths.includes(selectedWidth)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchUpper = p.craftDetails.upper.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          if (!matchName && !matchUpper && !matchTagline) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedWidth, sortBy, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[2] || 9.5, 'Standard (D)', 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleQuickAddSize = (e: React.MouseEvent, product: Product, size: number) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], size, 'Standard (D)', 1);
    setAddedId(`${product.id}-${size}`);
    setTimeout(() => setAddedId(null), 1800);
  };

  const categoriesList: { id: ShoeCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'shoe-care', label: 'Shoe Care (150ml)' },
    { id: 'oxfords', label: 'Goodyear Oxfords' },
    { id: 'chelsea-boots', label: 'Chelsea Boots' },
    { id: 'loafers', label: 'Sacchetto Loafers' },
    { id: 'luxury-sneakers', label: 'Vitello Sneakers' }
  ];

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      
      {/* 1. Collection Editorial Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <span className={isDark ? 'text-zinc-300' : 'text-zinc-800 font-semibold'}>Collection Catalog</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-amber-500 uppercase">{selectedCategory.replace('-', ' ')}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-mono tracking-[0.25em] uppercase font-bold ${
                isDark ? 'text-amber-400' : 'text-red-600'
              }`}>
                PERMANENT ATELIER ARCHIVE
              </span>
              <span className="w-8 h-[1px] bg-zinc-600/40" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight">
              Masterpiece Footwear
            </h1>
            <p className={`text-xs sm:text-sm mt-3 max-w-2xl font-light leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'
            }`}>
              Each silhouette is handcrafted from French boxcalf from Tannery D’Annonay, built with genuine 360° Goodyear welt construction and lasting sculpted for Indian foot anatomy. Fitted in-person at our Camp, Pune boutique atelier.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className={`p-4 rounded-2xl border flex items-center gap-6 flex-shrink-0 ${
            isDark ? 'bg-black/60 border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Available Models</span>
              <span className="text-2xl font-serif font-bold">{filteredProducts.length} Silhouettes</span>
            </div>
            <div className="w-[1px] h-8 bg-zinc-700/40" />
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Boutique Trial</span>
              <span className="text-xs font-semibold text-emerald-400">Camp, Pune Open</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Interactive Filter & Sorting Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categoriesList.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? isDark
                      ? 'bg-amber-400 text-black font-bold shadow-md'
                      : 'bg-red-600 text-white font-bold shadow-md'
                    : isDark
                    ? 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-300 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search oxfords, leathers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 rounded-xl text-xs outline-none border transition-colors ${
                isDark
                  ? 'bg-[#121217] border-white/10 text-white placeholder-zinc-500 focus:border-amber-400'
                  : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-red-600'
              }`}
            />
          </div>
        </div>

        {/* Secondary Filters Bar: Width, Sort, Reset */}
        <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'bg-[#0f0f14] border-white/10' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="font-mono uppercase text-[10px]">Anatomical Width:</span>
            </div>
            {(['all', 'Standard (D)', 'Wide (EE)'] as const).map(w => (
              <button
                key={w}
                onClick={() => setSelectedWidth(w)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedWidth === w
                    ? isDark
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-zinc-900 text-white font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {w === 'all' ? 'All Widths' : w}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="font-mono uppercase text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`bg-transparent outline-none text-xs font-mono cursor-pointer ${
                  isDark ? 'text-white' : 'text-zinc-900 font-semibold'
                }`}
              >
                <option value="featured" className={isDark ? 'bg-[#121217] text-white' : 'bg-white text-zinc-900'}>Featured Masterpieces</option>
                <option value="price-asc" className={isDark ? 'bg-[#121217] text-white' : 'bg-white text-zinc-900'}>Price: Low to High</option>
                <option value="price-desc" className={isDark ? 'bg-[#121217] text-white' : 'bg-white text-zinc-900'}>Price: High to Low</option>
                <option value="rating" className={isDark ? 'bg-[#121217] text-white' : 'bg-white text-zinc-900'}>Patron Rating (5.0★)</option>
              </select>
            </div>

            {(selectedCategory !== 'all' || selectedWidth !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  handleCategoryChange('all');
                  setSelectedWidth('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 text-[11px] text-amber-500 hover:underline font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 3. Products Luxury Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className={`group relative rounded-3xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0c0c11] border-white/10 hover:border-amber-400/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]'
                    : 'bg-white border-zinc-200 hover:border-red-400 hover:shadow-xl'
                }`}
              >
                {/* Visual Image Stage */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 flex items-center justify-center p-4">
                  <img
                    src={product.images.hero}
                    alt={`${product.name} — Handcrafted bespoke footwear by The Shoe Kicks, Camp, Pune`}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[#e8caa4]">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                      isInWishlist(product.id)
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuickView(product);
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        {product.serialNumber}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold">{product.rating}</span>
                        <span className="text-[10px] text-zinc-500">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-serif font-medium tracking-tight group-hover:text-amber-500 transition-colors line-clamp-1 ${
                      isDark ? 'text-white' : 'text-zinc-950 font-bold'
                    }`}>
                      {product.name}
                    </h3>

                    {/* Leather / Craft detail */}
                    <p className="text-[11px] text-zinc-400 font-light mt-0.5 line-clamp-1">
                      {product.craftDetails.upper}
                    </p>

                    {/* Price in INR */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-serif font-bold text-gold-gradient">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-zinc-500 line-through font-mono">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Instant Size Selector Chips */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        INSTANT SIZE:
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400">
                        Indian D/EE Last
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      {product.sizes.slice(0, 5).map(sz => (
                        <button
                          key={sz}
                          onClick={(e) => handleQuickAddSize(e, product, sz)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                            addedId === `${product.id}-${sz}`
                              ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                              : isDark
                              ? 'bg-white/5 border-white/10 hover:border-amber-400 text-zinc-300'
                              : 'bg-zinc-100 border-zinc-200 hover:border-red-600 text-zinc-800'
                          }`}
                          title={`Add Size ${sz}`}
                        >
                          {addedId === `${product.id}-${sz}` ? '✓' : sz}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          addedId === product.id
                            ? 'bg-emerald-600 text-white'
                            : isDark
                            ? 'bg-white text-black hover:bg-zinc-200'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {addedId === product.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        <span>{addedId === product.id ? 'Added' : 'Add to Bag'}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                        className={`p-2 rounded-xl border transition-colors ${
                          isDark
                            ? 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                            : 'border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-100'
                        }`}
                        title="View Details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-xl font-serif">No Silhouettes Matched Your Filter</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Try adjusting your category, width, or search criteria to view our handcrafted footwear.
            </p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSelectedWidth('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Bottom Atelier Bespoke Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className={`p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8 ${
          isDark
            ? 'bg-gradient-to-r from-[#14141d] to-[#0c0c11] border-[#d4af37]/30 shadow-2xl'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase ${
              isDark ? 'bg-amber-400/10 text-amber-300' : 'bg-red-50 text-red-600 font-bold'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span>CUSTOM LASTING & PATINA</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-serif font-medium ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
              Want a Tailored Last or Rare Exotic Leather?
            </h3>
            <p className={`text-xs sm:text-sm max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`}>
              Visit our flagship salon on Kolsa Lane, MG Road, Camp, Pune. Our Master Cobbler creates one-off lasts customized to your individual arches and foot measurements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              to="/boutique"
              className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg active:scale-95 transition-all text-center"
            >
              Visit Pune Atelier
            </Link>
            <a
              href="tel:+917350051590"
              className={`px-6 py-3.5 rounded-full border text-xs font-mono font-bold uppercase transition-colors flex items-center gap-2 ${
                isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 73500 51590</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
