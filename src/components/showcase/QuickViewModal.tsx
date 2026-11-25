import React, { useState } from 'react';
import type { Product, ShoeColorway } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Check, Ruler, Phone, MessageSquare, CreditCard } from 'lucide-react';
import { RazorpayModal } from '../checkout/RazorpayModal';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

interface QuickViewModalDialogProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModalDialog: React.FC<QuickViewModalDialogProps> = ({
  product,
  onClose
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ShoeColorway>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || 9.5);
  const [selectedWidth, setSelectedWidth] = useState<'Standard (D)' | 'Wide (EE)'>(product.widths[0]);
  const [activeImageKey, setActiveImageKey] = useState<keyof typeof product.images>('hero');
  const [addedToast, setAddedToast] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedColor, selectedSize, selectedWidth, 1);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const imagesList = [
    { key: 'hero' as const, label: 'Hero 3/4 View', src: product.images.hero },
    { key: 'profile' as const, label: 'Side Profile', src: product.images.profile },
    { key: 'top' as const, label: 'Vamp & Lasting', src: product.images.top },
    { key: 'sole' as const, label: 'Sole & Welt', src: product.images.sole },
    { key: 'detail' as const, label: 'Leather Grain', src: product.images.detail }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      
      {/* Modal Dialog Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0c0c10] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Showcase & Thumbnails (6 Columns) */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-gradient-to-b from-[#121218] to-[#0a0a0d] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Main Stage View */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
              <img
                src={product.images[activeImageKey] || product.images.hero}
                alt={`${product.name} — Bespoke Footwear by The Shoe Kicks Atelier, Camp, Pune`}
                className="w-full h-full object-cover transition-all duration-500"
                loading="eager"
                decoding="async"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/40 text-[9px] font-mono tracking-widest text-[#e8caa4] uppercase">
                  {product.badge}
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                  isLiked
                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                    : 'bg-black/60 text-zinc-300 border-white/10 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2">
              {imagesList.map(img => (
                <button
                  key={img.key}
                  onClick={() => setActiveImageKey(img.key)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                    activeImageKey === img.key
                      ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={`${product.name} ${img.label} — The Shoe Kicks Camp Pune`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            {/* Micro Guarantee */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-zinc-400 text-xs font-light">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>360° Goodyear Welt Recraftable</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">Marche, Italy</span>
            </div>
          </div>

          {/* Right Column: Specifications & Configuration (6 Columns) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} Google &amp; store reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#e8caa4] font-serif italic mt-0.5">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
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
                <span className="text-[11px] text-amber-400 font-mono ml-auto">⚡ Camp, Pune Atelier</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Colorway Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                    Patina Finish: <span className="text-white font-normal">{selectedColor.name}</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">{selectedColor.material}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                        selectedColor.name === col.name
                          ? 'border-[#d4af37] bg-white/10 text-white font-semibold'
                          : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                    Size (US Mens): <span className="text-white font-semibold">{selectedSize}</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1 cursor-pointer hover:text-white">
                    <Ruler className="w-3 h-3" /> Fit Guide: True to Size
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all border ${
                        selectedSize === size
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-[#15151b] text-zinc-300 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Selector */}
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-1.5">
                  Footbed Width:
                </span>
                <div className="flex items-center gap-2">
                  {product.widths.map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWidth(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedWidth === w
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#e8caa4] font-medium'
                          : 'bg-[#15151b] border-white/10 text-zinc-400'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Olfactory / Atelier Craft Notes (Perfume luxury concept) */}
              {product.notes && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#131318] border border-white/5 text-[11px]">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 block mb-0.5">Top Note</span>
                    <span className="text-zinc-300 font-medium leading-tight block truncate" title={product.notes.head}>{product.notes.head}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131318] border border-white/5 text-[11px]">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 block mb-0.5">Heart Note</span>
                    <span className="text-zinc-300 font-medium leading-tight block truncate" title={product.notes.heart}>{product.notes.heart}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131318] border border-white/5 text-[11px]">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 block mb-0.5">Base Note</span>
                    <span className="text-zinc-300 font-medium leading-tight block truncate" title={product.notes.base}>{product.notes.base}</span>
                  </div>
                </div>
              )}

              {/* Technical Specifications Breakdown */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#131318] border border-white/5 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Upper:</span>
                  <span className="text-zinc-200">{product.craftDetails.upper}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Sole & Welt:</span>
                  <span className="text-zinc-200">{product.craftDetails.sole}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Construction:</span>
                  <span className="text-zinc-200">{product.craftDetails.construction}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Atelier Hours:</span>
                  <span className="text-[#d4af37]">{product.craftDetails.craftHours} Artisanal Hours</span>
                </div>
              </div>

              {/* Flagship Boutique & Bespoke Fitting Salon in Camp, Pune */}
              <div className="mt-4 p-4 rounded-2xl bg-[#14141c] border border-[#d4af37]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold">
                    CAMP, PUNE FLAGSHIP ATELIER
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open Daily 9:00 AM – 10:00 PM
                  </span>
                </div>
                <p className="text-xs text-zinc-200 font-medium">
                  📍 Kolsa Lane, MG Road, Camp, Pune - 411001, Maharashtra
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Experience in-person anatomical foot measuring, leather swatches, and private salon fitting.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <a
                    href="tel:+917350051590"
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>+91 73500 51590</span>
                  </a>
                  <a
                    href="https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20would%20like%20to%20reserve%20a%20fitting%20appointment%20for%20the%20Imperial%20collection%20at%20Kolsa%20Lane,%20Camp,%20Pune."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              {/* Primary Instant Buy with Razorpay */}
              <button
                type="button"
                onClick={() => setIsRazorpayOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0c2340] hover:from-[#0369a1] hover:to-[#08182b] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-900/40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4 text-sky-200" />
                <span>Instant Buy with Razorpay • ₹{Math.round(product.price * 83.5).toLocaleString('en-IN')}</span>
              </button>

              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price)}</span>
                  </>
                )}
              </button>

              <div className="w-full py-1 text-center text-xs text-zinc-400">
                Available online &amp; at <span className="text-[#d4af37] font-medium">Kolsa Lane, Camp, Pune Flagship</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amountInINR={Math.round(product.price * 83.5)}
        productName={product.name}
        orderDescription={`${product.name} (${selectedColor.name}, Size ${selectedSize})`}
        customerDetails={{
          name: '',
          email: 'concierge@theshoekicks.com',
          phone: '',
          address: 'Kolsa Lane, Camp, Pune - 411001'
        }}
        onSuccess={() => {
          setIsRazorpayOpen(false);
          handleAdd();
        }}
      />
    </div>
  );
};

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose
}) => {
  if (!product) return null;
  return (
    <QuickViewModalDialog
      product={product}
      onClose={onClose}
    />
  );
};
