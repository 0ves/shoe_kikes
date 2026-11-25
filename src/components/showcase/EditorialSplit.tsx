import React, { useState } from 'react';
import type { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';

interface EditorialSplitProps {
  flagshipProduct: Product;
  onOpenQuickView: (product: Product) => void;
}

export const EditorialSplit: React.FC<EditorialSplitProps> = ({
  flagshipProduct,
  onOpenQuickView
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isDark } = useTheme();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize] = useState(10);
  const [addedToast, setAddedToast] = useState(false);

  const activeColor = flagshipProduct.colors[selectedColorIdx] || flagshipProduct.colors[0];

  const handleInstantBuy = () => {
    addToCart(flagshipProduct, activeColor, selectedSize, 'Standard (D)', 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-white' : 'bg-[#f4f4f8] text-zinc-950'
    }`}>
      
      {/* Editorial Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 border-x border-white/5">
          <div className="border-r border-white/5 h-full" />
          <div className="border-r border-white/5 h-full" />
          <div className="border-r border-white/5 h-full" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto space-y-16">

        {/* 1. Haute Bren Shoes Section (Direct Recreation of Image 1 Hero) */}
        <div className={`relative rounded-3xl overflow-hidden border p-8 sm:p-12 lg:p-16 transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-[#121217] via-[#0b0b0e] to-[#070709] border-white/10'
            : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          
          {/* Subtle Leather Texture Vignette */}
          <div className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_70%)]'
              : 'bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.06),transparent_70%)]'
          }`} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (Haute Bren Shoes) */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.2em] ${
                isDark ? 'bg-[#1c1a14] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-500/25 text-red-600 font-semibold'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                Haute Atelier Signature
              </div>

              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.05] ${
                isDark ? 'text-white' : 'text-zinc-950 font-medium'
              }`}>
                Haute Bespoke <br />
                <span className="italic font-light text-gold-gradient">Shoes</span>
              </h2>

              <p className={`text-sm sm:text-base font-light leading-relaxed max-w-md ${
                isDark ? 'text-zinc-300' : 'text-zinc-700 font-normal'
              }`}>
                Hand-sculpted in our Marche atelier over 42 meticulous stages. Cut from French boxcalf from Tannery D’Annonay and welted with closed-channel leather soles.
              </p>

              {/* Price Tag with Currency Support */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className={`text-3xl sm:text-4xl font-serif font-bold ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}>
                  {formatPrice(flagshipProduct.price)}
                </span>
                {flagshipProduct.compareAtPrice && (
                  <span className="text-base text-zinc-500 line-through">
                    {formatPrice(flagshipProduct.compareAtPrice)}
                  </span>
                )}
                <span className={`text-xs uppercase font-mono tracking-widest px-2 py-0.5 rounded border ${
                  isDark ? 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/20' : 'text-red-700 bg-red-50 border-red-200 font-bold'
                }`}>
                  Complimentary Trees
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleInstantBuy}
                  className="px-8 py-3.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Step Now</span>
                </button>

                <button
                  onClick={() => onOpenQuickView(flagshipProduct)}
                  className={`px-6 py-3.5 rounded-xl border text-xs uppercase tracking-widest transition-all ${
                    isDark
                      ? 'glass-panel text-zinc-200 hover:text-white hover:border-[#d4af37]/40'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300 font-semibold'
                  }`}
                >
                  Inspect Lasting
                </button>
              </div>

              {addedToast && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Added {flagshipProduct.name} ({activeColor.name}) to bag.
                </div>
              )}
            </div>

            {/* Right Visual (The Floating Shoe on Leather Bag with Gold Badge 'S' / 'SK') */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              
              {/* Dark Leather Bag Oval Backdrop Silhouette (Image 1 inspired) */}
              <div className="absolute w-[320px] sm:w-[420px] lg:w-[460px] h-[320px] sm:h-[420px] lg:h-[460px] rounded-full bg-gradient-to-tr from-[#141318] via-[#1d1b22] to-[#121116] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* Leather texture grain simulation */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.06),transparent_60%)]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-white/5" />
              </div>

              {/* The Hero Shoe Image (Angled floating over the bag as in Image 1) */}
              <div className="relative z-10 w-full max-w-lg transition-transform duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <img
                  src={flagshipProduct.images.hero}
                  alt={`${flagshipProduct.name} — Handcrafted Goodyear Welted Shoe by The Shoe Kicks Atelier, Camp, Pune`}
                  onClick={() => onOpenQuickView(flagshipProduct)}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] -rotate-6"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 3. Bottom Featured Pricing Strip (Image 1 Bottom Section) */}
        <div className={`rounded-2xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 ${
          isDark
            ? 'bg-[#111116] border-white/10'
            : 'bg-white border-zinc-200 shadow-lg'
        }`}>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'}`}>
                Artisanal Reserve
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500">Marche Bespoke Series</span>
            </div>
            <h4 className={`text-xl sm:text-2xl font-serif ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
              The Imperial Obsidian Wholecut
            </h4>
            <p className={`text-xs max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'}`}>
              Individually numbered. Hand-stitched welt, oak bark tanned leather sole, bespoke lasting cedar shoe trees included.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-black/50 border-white/10' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>Color:</span>
              <div className="flex items-center gap-1.5">
                {flagshipProduct.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      selectedColorIdx === i 
                        ? isDark ? 'ring-2 ring-[#d4af37] scale-110' : 'ring-2 ring-red-500 scale-110'
                        : 'border-black/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-zinc-950 font-black'}`}>
                {formatPrice(flagshipProduct.price)}
              </span>
              <button
                onClick={handleInstantBuy}
                className="px-5 py-2.5 rounded-xl bg-gold-gradient font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md text-black"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
