import React, { useState } from 'react';
import { 
  Check, ShieldCheck, ShoppingBag, 
  CreditCard, Star, Flame, Eye 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { RazorpayModal } from '../checkout/RazorpayModal';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface ShoeCleanerShowcaseProps {
  onOpenQuickView?: (product: Product) => void;
}

export const ShoeCleanerShowcase: React.FC<ShoeCleanerShowcaseProps> = ({
  onOpenQuickView
}) => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();

  const cleanerProduct = PRODUCTS.find(p => p.id === 'sk-cleaner-150') || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>('/images/cleaner/cleaner-luxury-gradient.jpg');
  const [selectedBundle, setSelectedBundle] = useState<'single' | 'kit'>('single');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const priceSingleINR = 599;
  const priceKitINR = 999;
  const activePriceINR = selectedBundle === 'single' ? priceSingleINR : priceKitINR;

  const handleAddToCart = () => {
    const colorway = selectedBundle === 'single' 
      ? cleanerProduct.colors[0] 
      : (cleanerProduct.colors[1] || cleanerProduct.colors[0]);

    addToCart(cleanerProduct, colorway, 150, 'Standard (D)', 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const galleryImages = [
    { label: 'Luxury Studio Gradient', src: '/images/cleaner/cleaner-luxury-gradient.jpg' },
    { label: 'Colorblock Pop Editorial', src: '/images/cleaner/cleaner-colorblock-pop.jpg' },
    { label: 'Obsidian Studio Hero', src: '/images/cleaner/cleaner-studio-hero.jpg' },
    { label: 'Minimalist Packshot', src: '/images/cleaner/cleaner-white-studio.jpg' },
    { label: 'Atelier Care Kit', src: '/images/cleaner/cleaner-lifestyle-kit.jpg' },
    { label: 'Active Dense Foam', src: '/images/cleaner/cleaner-action-foam.jpg' }
  ];

  return (
    <section className={`py-16 sm:py-24 border-t relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#09090d] border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
    }`}>
      {/* Subtle Luxury Atmospheric Glow */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{ background: isDark ? '#0284c7' : '#d4af37' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Overline Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-mono tracking-[0.3em] uppercase font-bold px-2.5 py-1 rounded-full border ${
                isDark 
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                ATELIER CARE INNOVATION • 150 ML
              </span>
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                OFFICIAL FORMULATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
              The Shoe Kicks <span className="text-gold-gradient font-bold">Foaming Cleaner</span>
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-600'}`}>
              Artisanal self-foaming deep cleaner engineered to preserve fine French boxcalf, delicate suede, nubuck, and sovereign sneakers without water immersion.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              <Check className="w-3.5 h-3.5" />
              <span>In Stock • Ready to Dispatch</span>
            </span>
          </div>
        </div>

        {/* Main Bento Layout: Left Gallery + Right Purchase Matrix */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 Cols): Studio Photography Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Featured Product Image with Zoom Lens Styling */}
            <div className={`relative rounded-3xl overflow-hidden border shadow-2xl aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center transition-all ${
              isDark ? 'bg-black/60 border-white/10' : 'bg-zinc-100 border-zinc-200'
            }`}>
              <img
                src={activeImage}
                alt="The Shoe Kicks Foaming Shoe Cleaner 150ml - Commercial Studio Product Photography"
                className="w-full h-full object-cover transition-all duration-500 filter contrast-105"
                loading="eager"
              />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-[#d4af37] font-bold flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>SALON GRADE FORMULA</span>
              </div>

              {/* Verified Razorpay Trust Pill */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-sky-950/80 backdrop-blur-md border border-sky-500/40 text-[10px] font-mono tracking-wider text-sky-300 font-semibold flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Razorpay Instant Checkout</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryImages.map((img) => {
                const isActive = activeImage === img.src;
                return (
                  <button
                    key={img.label}
                    onClick={() => setActiveImage(img.src)}
                    className={`p-1.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? isDark
                          ? 'border-sky-400 ring-2 ring-sky-400/40 bg-sky-950/20'
                          : 'border-red-600 ring-2 ring-red-600/30 bg-red-50'
                        : isDark
                        ? 'border-white/10 bg-[#121217] hover:border-white/30'
                        : 'border-zinc-200 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-black/30 mb-1">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[9px] font-mono block truncate text-zinc-400 font-medium">
                      {img.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 5-Step Application Instructions from the physical bottle */}
            <div className={`p-5 rounded-2xl border space-y-2.5 text-xs ${
              isDark ? 'bg-[#0f0f14] border-white/10' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                  DIRECTIONS AS PRINTED ON BOTTLE:
                </span>
                <span className="text-[10px] font-mono text-zinc-500">150 ML • SELF-FOAMING</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#d4af37] font-bold block">01. UNLACE</span>
                  <span className="text-zinc-400 text-[10px]">Remove laces from shoe</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#d4af37] font-bold block">02. PUMP</span>
                  <span className="text-zinc-400 text-[10px]">Apply foam directly</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#d4af37] font-bold block">03. BRUSH</span>
                  <span className="text-zinc-400 text-[10px]">Scrub gently in circle</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#d4af37] font-bold block">04. MICROFIBER</span>
                  <span className="text-zinc-400 text-[10px]">Wipe excess &amp; dry</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[#d4af37] font-bold block">05. REPEAT</span>
                  <span className="text-zinc-400 text-[10px]">For tough ground dirt</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): Pricing, Bundles & Razorpay Instant Buy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rating & Serial */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                  SKU: SK-FOAM-150ML
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">4.99/5</span>
                  <span className="text-zinc-500 font-mono">(340+ verified patrons)</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                Artisanal Foaming Solution
              </h3>
              <p className="text-xs text-zinc-400 font-serif italic">
                "It works on all types of materials including suede, nubuck, patent leather, synthetics, and canvas."
              </p>
            </div>

            {/* Price Tag with Razorpay Discount Banner */}
            <div className={`p-4 rounded-2xl border flex items-baseline justify-between ${
              isDark ? 'bg-[#111116] border-white/10' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div>
                <span className="text-xs font-mono uppercase text-zinc-400 block">Offer Price (Incl. GST)</span>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient">
                    ₹{activePriceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm line-through text-zinc-500 font-mono">
                    ₹{(selectedBundle === 'single' ? 899 : 1499).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SAVE {selectedBundle === 'single' ? '33%' : '33%'}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Stock
              </span>
            </div>

            {/* Bundle Selector: Single Bottle vs Full Care Kit */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                Select Option:
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Option 1: Solo Bottle */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBundle('single');
                    setActiveImage('/images/cleaner/cleaner-studio-hero.jpg');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedBundle === 'single'
                      ? isDark
                        ? 'border-sky-400 bg-sky-950/20 ring-1 ring-sky-400'
                        : 'border-red-600 bg-red-50 ring-1 ring-red-600'
                      : isDark
                      ? 'border-white/10 bg-[#121217] hover:border-white/20'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <span className="text-xs font-bold block">150ml Solo Bottle</span>
                  <span className="text-[10px] font-mono text-zinc-400 mt-0.5 block">Self-Foam Dispenser</span>
                  <span className="text-sm font-bold font-mono text-amber-400 mt-1 block">₹599</span>
                </button>

                {/* Option 2: Full Atelier Kit */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBundle('kit');
                    setActiveImage('/images/cleaner/cleaner-lifestyle-kit.jpg');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    selectedBundle === 'kit'
                      ? isDark
                        ? 'border-sky-400 bg-sky-950/20 ring-1 ring-sky-400'
                        : 'border-red-600 bg-red-50 ring-1 ring-red-600'
                      : isDark
                      ? 'border-white/10 bg-[#121217] hover:border-white/20'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded bg-amber-400 text-black text-[8px] font-mono font-bold uppercase">
                    Best Value
                  </span>
                  <span className="text-xs font-bold block">Atelier Kit Bundle</span>
                  <span className="text-[10px] font-mono text-zinc-400 mt-0.5 block">Bottle + Brush + Cloth</span>
                  <span className="text-sm font-bold font-mono text-amber-400 mt-1 block">₹999</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Water Immersion needed — prevents leather rot &amp; sole delamination</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Safe for fine French boxcalf, Italian suede, nubuck, canvas, and sneakers</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct Camp, Pune atelier concierge &amp; refill support (+91 73500 51590)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              {/* PRIMARY: Instant Buy with Razorpay */}
              <button
                type="button"
                onClick={() => setIsRazorpayOpen(true)}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0c2340] hover:from-[#0369a1] hover:to-[#08182b] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-sky-900/40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4 text-sky-200" />
                <span>Buy Now via Razorpay • ₹{activePriceINR.toLocaleString('en-IN')}</span>
              </button>

              {/* SECONDARY: Add to Bag */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-2xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              {/* Quick View Trigger */}
              {onOpenQuickView && (
                <button
                  type="button"
                  onClick={() => onOpenQuickView(cleanerProduct)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Quick Inspect Product Specifications</span>
                </button>
              )}

              {/* WhatsApp Atelier Concierge Direct Link */}
              <a
                href={`https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20would%20like%20to%20order%20the%20Foaming%20Shoe%20Cleaner%20(150ml)%20for%20delivery.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-xs font-mono text-zinc-300 hover:text-emerald-300 flex items-center justify-center gap-2 transition-all"
              >
                <span>💬 Order via WhatsApp: +91 73500 51590</span>
              </a>
            </div>

            {/* Payment & Store Assurance */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Razorpay UPI, GPay, Cards &amp; NetBanking</span>
              </div>
              <span>Camp, Pune - 411001</span>
            </div>

          </div>

        </div>

      </div>

      {/* Razorpay Modal for Instant Buy */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amountInINR={activePriceINR}
        productName={`The Shoe Kicks Foaming Cleaner (${selectedBundle === 'single' ? '150ml Bottle' : 'Full Care Kit'})`}
        orderDescription="Official The Shoe Kicks self-foaming deep cleaner"
        customerDetails={{
          name: '',
          email: 'concierge@theshoekicks.com',
          phone: '',
          address: 'Kolsa Lane, Camp, Pune - 411001'
        }}
        onSuccess={() => {
          setIsRazorpayOpen(false);
          handleAddToCart();
        }}
      />
    </section>
  );
};
