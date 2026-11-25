import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Product, ShoeColorway } from '../types';
import { useSeo } from '../hooks/useSeo';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Star, Heart, ShoppingBag, ShieldCheck, Check, Ruler, 
  Phone, MessageSquare, ArrowLeft, ArrowRight, Sparkles, 
  ChevronDown, ChevronUp, Clock, CreditCard 
} from 'lucide-react';
import { RazorpayModal } from '../components/checkout/RazorpayModal';
import type { RazorpaySuccessResponse } from '../services/razorpay';

interface ProductDetailPageProps {
  products: Product[];
  onOpenQuickView?: (product: Product) => void;
}

interface ProductDetailViewProps {
  product: Product;
  products: Product[];
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  products
}) => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isDark } = useTheme();

  const [selectedColor, setSelectedColor] = useState<ShoeColorway>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || 9.5);
  const [selectedWidth, setSelectedWidth] = useState<'Standard (D)' | 'Wide (EE)'>(product.widths[0]);
  const [activeImageKey, setActiveImageKey] = useState<keyof typeof product.images>('hero');
  const [addedToast, setAddedToast] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('welting');
  const [isRazorpayDirectOpen, setIsRazorpayDirectOpen] = useState(false);
  const [razorpayDirectSuccess, setRazorpayDirectSuccess] = useState<RazorpaySuccessResponse | null>(null);

  const isLiked = isInWishlist(product.id);

  useSeo({
    title: `${product.name} | The Shoe Kicks Atelier, Camp, Pune`,
    description: `${product.description} Handcrafted from French boxcalf leather with 360° Goodyear welt. Flagship store: Kolsa Lane, MG Road, Camp, Pune. Tel: +91 73500 51590.`,
    canonical: `https://theshoekicks.com/product/${product.id}`,
    ogType: 'product',
    ogImage: `https://theshoekicks.com${product.images.hero}`,
    ogImageAlt: `${product.name} by The Shoe Kicks, Camp, Pune`,
    keywords: `${product.name}, ${product.category}, bespoke shoes Pune, Goodyear welted Camp Pune, French boxcalf leather shoes`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: [
        `https://theshoekicks.com${product.images.hero}`,
        `https://theshoekicks.com${product.images.profile}`,
        `https://theshoekicks.com${product.images.sole}`
      ],
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'The Shoe Kicks'
      },
      offers: {
        '@type': 'Offer',
        url: `https://theshoekicks.com/product/${product.id}`,
        priceCurrency: 'INR',
        price: product.price,
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'ShoeStore',
          name: 'The Shoe Kicks, Camp, Pune',
          telephone: '+91 73500 51590',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kolsa Lane, MG Road, Camp',
            addressLocality: 'Pune',
            addressRegion: 'Maharashtra',
            postalCode: '411001',
            addressCountry: 'IN'
          }
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toString(),
        reviewCount: product.reviewsCount.toString()
      }
    }
  });

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, selectedWidth, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const imagesList = [
    { key: 'hero' as const, label: '3/4 Perspective', src: product.images.hero },
    { key: 'profile' as const, label: 'Side Elevation', src: product.images.profile },
    { key: 'top' as const, label: 'Vamp & Lasting', src: product.images.top },
    { key: 'sole' as const, label: 'Oak-Bark Sole', src: product.images.sole },
    { key: 'detail' as const, label: 'Leather Grain', src: product.images.detail }
  ];

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-white/10 dark:border-white/10">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-zinc-500">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-amber-400 transition-colors">Collection</Link>
            <span>/</span>
            <Link to={`/collection?cat=${product.category}`} className="hover:text-amber-400 uppercase transition-colors">
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className={`truncate max-w-[180px] sm:max-w-none ${isDark ? 'text-zinc-300' : 'text-zinc-800 font-semibold'}`}>
              {product.name}
            </span>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Primary 2-Column Product Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (7 Columns): Image Visualizer Stage */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            
            {/* Main Primary Visual */}
            <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden border flex items-center justify-center p-6 sm:p-10 transition-all ${
              isDark
                ? 'bg-gradient-to-b from-[#14141a] to-[#0c0c10] border-white/10 shadow-2xl'
                : 'bg-white border-zinc-200 shadow-xl'
            }`}>
              <img
                src={product.images[activeImageKey] || product.images.hero}
                alt={`${product.name} — Handcrafted bespoke footwear by The Shoe Kicks Atelier, Camp, Pune`}
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transition-all duration-700 hover:scale-105"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-mono tracking-widest text-[#e8caa4] uppercase">
                  {product.badge}
                </div>
              )}

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all ${
                  isLiked
                    ? 'bg-red-600 text-white border-red-500 shadow-lg'
                    : 'bg-black/60 text-zinc-300 border-white/10 hover:text-white hover:scale-105'
                }`}
                title={isLiked ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-5 gap-3">
              {imagesList.map(img => (
                <button
                  key={img.key}
                  onClick={() => setActiveImageKey(img.key)}
                  className={`p-2 rounded-2xl border text-center transition-all ${
                    activeImageKey === img.key
                      ? isDark
                        ? 'border-amber-400 bg-white/10 ring-2 ring-amber-400/30'
                        : 'border-red-600 bg-red-50 ring-2 ring-red-400/30'
                      : isDark
                      ? 'border-white/10 bg-[#0f0f14] opacity-60 hover:opacity-100'
                      : 'border-zinc-200 bg-white opacity-75 hover:opacity-100 shadow-sm'
                  }`}
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/30 mb-1">
                    <img src={img.src} alt={`${product.name} (${img.label}) — The Shoe Kicks Atelier, Camp, Pune`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <span className="text-[9px] font-mono block truncate text-zinc-400">{img.label}</span>
                </button>
              ))}
            </div>

            {/* Micro Craftsmanship Badges */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs ${
              isDark ? 'bg-[#0f0f14] border-white/10 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="font-medium">360° Goodyear Welt Recraftable</span>
              </div>
              <div className="w-[1px] h-4 bg-zinc-600/30" />
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-500" />
                <span className="font-medium">Indian D & EE Anatomical Last</span>
              </div>
              <div className="w-[1px] h-4 bg-zinc-600/30" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-medium">{product.craftDetails.craftHours} Craft Hours</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 Columns): Configuration & Booking */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono uppercase tracking-widest font-bold ${
                  isDark ? 'text-amber-400' : 'text-red-600'
                }`}>
                  {product.serialNumber}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} Google &amp; store reviews)</span>
                </div>
              </div>

              <h1 className={`text-3xl sm:text-4xl font-serif font-medium tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950 font-bold'
              }`}>
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm font-serif italic text-amber-500 mt-1">
                "{product.tagline}"
              </p>
            </div>

            {/* Price Strip */}
            <div className={`p-4 rounded-2xl border flex items-baseline justify-between ${
              isDark ? 'bg-[#101017] border-white/10' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif font-bold text-gold-gradient">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-sm text-zinc-500 line-through font-mono">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      SAVE {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                ● In Stock at Camp Salon
              </span>
            </div>

            {/* Description */}
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {product.description}
            </p>

            {/* Colorway Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-zinc-400">
                  Select Leather Patina:
                </span>
                <span className="font-bold text-amber-400">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                      selectedColor.name === col.name
                        ? isDark
                          ? 'border-amber-400 bg-white/10 text-white font-bold ring-1 ring-amber-400/40'
                          : 'border-red-600 bg-red-50 text-red-600 font-bold ring-1 ring-red-400/40'
                        : isDark
                        ? 'border-white/10 bg-[#121217] text-zinc-400 hover:text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Indian Lasting Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-zinc-400">
                  Select Size (US/UK Mens):
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> True Indian Fit
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-gold-gradient text-black border-amber-400 shadow-md'
                        : isDark
                        ? 'bg-[#121217] text-zinc-300 border-white/10 hover:border-white/30'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Footbed Width Selection (Anatomical Indian D vs EE) */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Footbed Last Profile:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.widths.map(w => (
                  <button
                    key={w}
                    onClick={() => setSelectedWidth(w)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedWidth === w
                        ? isDark
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                          : 'border-red-600 bg-red-50 text-red-600 font-bold'
                        : isDark
                        ? 'border-white/10 bg-[#121217] text-zinc-400'
                        : 'border-zinc-200 bg-white text-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{w}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      {w === 'Standard (D)' ? 'Regular metatarsal taper' : '15% roomier toe spread'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory / Material Notes */}
            {product.notes && (
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-[#101017] border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                  CRAFT SENSORY SPECS:
                </span>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono block">UPPER GRAIN</span>
                    <span className="font-medium text-zinc-300 truncate block">{product.notes.head}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono block">CUSHIONING</span>
                    <span className="font-medium text-zinc-300 truncate block">{product.notes.heart}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 font-mono block">SOLE LEATHER</span>
                    <span className="font-medium text-zinc-300 truncate block">{product.notes.base}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              {/* Instant Razorpay Buy Button */}
              <button
                onClick={() => setIsRazorpayDirectOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0c2340] hover:from-[#0369a1] hover:to-[#08182b] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-sky-900/40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4 text-sky-200" />
                <span>Instant Buy with Razorpay • ₹{Math.round(product.price * 83.5).toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-2xl bg-gold-gradient text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Added {product.name} to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price)}</span>
                  </>
                )}
              </button>

              {razorpayDirectSuccess && (
                <div className="p-3.5 rounded-2xl bg-sky-950/50 border border-sky-400 text-left space-y-1 animate-in zoom-in-95">
                  <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono font-bold">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Razorpay Payment Verified!</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-300">
                    Payment ID: <strong className="text-white">{razorpayDirectSuccess.razorpay_payment_id}</strong>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    Order logged at The Shoe Kicks Camp Pune atelier. Concierge WhatsApp: +91 73500 51590.
                  </div>
                </div>
              )}

              <a
                href={`https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20have%20an%20inquiry%20about%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-2xl border text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'border-amber-400/40 text-[#e8caa4] hover:bg-amber-400/10'
                    : 'border-red-600 text-red-600 hover:bg-red-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquire with Atelier Concierge</span>
              </a>
            </div>

            {/* Camp Pune Flagship Boutique Contact Card */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-[#0f0f15] border-[#d4af37]/30' : 'bg-white border-zinc-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                  FLAGSHIP BOUTIQUE & SALON
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Open Daily 9:00 AM – 10:00 PM</span>
              </div>
              <p className="text-xs font-medium">
                📍 Kolsa Lane, MG Road, Camp, Pune - 411001, Maharashtra
              </p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Try on this silhouette in person. Full 3D anatomical foot measuring, leather swatches, and private trial.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="tel:+917350051590"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>+91 73500 51590</span>
                </a>
                <a
                  href={`https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20am%20interested%20in%20trying%20on%20${encodeURIComponent(product.name)}%20at%20your%20Kolsa%20Lane,%20Camp,%20Pune%20boutique.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Craftsmanship Accordions */}
        <div className="mt-20 pt-10 border-t border-white/10 dark:border-white/10 max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
              isDark ? 'text-amber-400' : 'text-red-600'
            }`}>
              TECHNICAL PEDIGREE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-1">
              Anatomy & Construction Dossier
            </h2>
          </div>

          {[
            {
              id: 'welting',
              title: '360° Hand-Welted Goodyear Architecture',
              desc: 'Every pair is stitched using genuine 360° Goodyear welt construction. The upper and insole are connected via a leather welt strip, allowing the sole to be removed and recrafted infinite times throughout your life without altering the shoe upper.'
            },
            {
              id: 'anatomy',
              title: '5-Layer Poron & Portuguese Cork Bed',
              desc: 'Beneath the insole rests 5mm of granulated natural virgin cork from Portugal, layered over high-resilience medical-grade Poron foam. Within 7 days of wear, body heat and pressure mold the footbed into a permanent custom orthotic footprint.'
            },
            {
              id: 'last',
              title: 'Anatomical Indian D & EE Width Lasting',
              desc: 'Engineered over 3 years of foot scan data from 10,000+ Indian feet. Features a 15% roomier ball-girth to eliminate bunion pressure and toe-crowding, paired with a tapered heel pocket that stops blisters and heel lift completely.'
            },
            {
              id: 'care',
              title: 'Mirror Glaze & Leather Preservation Guide',
              desc: 'Wipe with a soft horsehair brush after each wear. Apply organic beeswax or carnauba cream monthly. Store with the complimentary aromatic cedar shoe trees included with your purchase.'
            }
          ].map(acc => (
            <div
              key={acc.id}
              className={`rounded-2xl border transition-all ${
                isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium"
              >
                <span>{acc.title}</span>
                {openAccordion === acc.id ? (
                  <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                )}
              </button>
              {openAccordion === acc.id && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-3">
                  {acc.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* You May Also Admire: Related Silhouettes Carousel */}
        <div className="mt-24 pt-10 border-t border-white/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                isDark ? 'text-amber-400' : 'text-red-600'
              }`}>
                CURATED COMPANIONS
              </span>
              <h3 className="text-2xl font-serif font-medium mt-1">You May Also Admire</h3>
            </div>
            <Link
              to="/collection"
              className="text-xs font-mono uppercase tracking-wider text-amber-500 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/product/${rel.id}`)}
                className={`p-4 rounded-3xl border cursor-pointer transition-all hover:-translate-y-1 ${
                  isDark ? 'bg-[#0c0c11] border-white/10 hover:border-amber-400/40' : 'bg-white border-zinc-200 shadow-sm hover:shadow-lg'
                }`}
              >
                <div className="aspect-[4/3] w-full bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-3">
                  <img src={rel.images.hero} alt={`${rel.name} — Handcrafted Goodyear welt shoe by The Shoe Kicks, Camp, Pune`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500">{rel.serialNumber}</div>
                <h4 className="font-serif font-medium text-sm truncate mt-0.5">{rel.name}</h4>
                <div className="font-serif font-bold text-xs text-gold-gradient mt-1">{formatPrice(rel.price)}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Direct Razorpay Instant Checkout Modal */}
      <RazorpayModal
        isOpen={isRazorpayDirectOpen}
        onClose={() => setIsRazorpayDirectOpen(false)}
        amountInINR={Math.round(product.price * 83.5)}
        productName={product.name}
        orderDescription={`${product.name} (${selectedColor.name}, Size ${selectedSize})`}
        customerDetails={{
          name: '',
          email: 'concierge@theshoekicks.com',
          phone: '',
          address: 'Camp, Pune - 411001'
        }}
        onSuccess={(res) => {
          setIsRazorpayDirectOpen(false);
          setRazorpayDirectSuccess(res);
          addToCart(product, selectedColor, selectedSize, selectedWidth, 1);
        }}
      />
    </div>
  );
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  products
}) => {
  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();

  if (products.length === 0) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-[#08080a] text-zinc-300' : 'bg-[#fafafa] text-zinc-700'
      }`}>
        <div className="text-center font-mono text-xs uppercase tracking-widest">
          Loading Atelier Archives...
        </div>
      </div>
    );
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
        isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
      }`}>
        <div className="max-w-md mx-auto text-center px-4 space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500">
            Archive Silhouette Unavailable
          </span>
          <h2 className="text-3xl font-serif">Footwear Silhouette Not Found</h2>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            The requested footwear edition could not be located in our reserve vault. Explore our active Goodyear welted oxfords, boots, and luxury sneakers.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/collection"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider"
            >
              Browse Entire Collection
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/5"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailView
      key={product.id}
      product={product}
      products={products}
    />
  );
};
