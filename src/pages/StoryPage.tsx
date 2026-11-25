import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { Sparkles, ShieldCheck, Award, Compass } from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { isDark } = useTheme();

  useSeo({
    title: 'Our Story & Cantonment Heritage | The Shoe Kicks, Camp, Pune',
    description: 'Discover the genesis of The Shoe Kicks in the historical Cantonment heart of Camp, Pune. Bespoke footwear elegance built with anatomical Indian lasts and French boxcalf.',
    canonical: 'https://theshoekicks.com/story',
    keywords: 'The Shoe Kicks story, Camp Pune shoe brand, Indian anatomical lasts, handmade footwear story Pune',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Story & Heritage — The Shoe Kicks',
      url: 'https://theshoekicks.com/story',
      description: 'The genesis and heritage of The Shoe Kicks bespoke footwear atelier in Camp, Pune, Maharashtra.'
    }
  });

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      
      {/* 1. Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.25em] ${
            isDark ? 'bg-[#181610] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-200 text-red-600 font-bold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ATELIER MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight">
            Our Story & Heritage
          </h1>

          <p className={`text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'
          }`}>
            Born out of a refusal to compromise between timeless bespoke elegance and all-day anatomical comfort for Indian feet.
          </p>
        </div>
      </div>

      {/* 2. Split Editorial Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
              isDark ? 'text-amber-400' : 'text-red-600'
            }`}>
              THE GENESIS • CAMP, PUNE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight">
              A Legacy Born in the Cantonment Heart of Pune
            </h2>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700 font-normal'
            }`}>
              For over a century, the historic lanes of Camp, Pune—flanked by MG Road and East Street—have been home to military officers, polo players, and refined patrons who valued precision bespoke tailoring and hand-stitched leather.
            </p>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700 font-normal'
            }`}>
              Yet, modern gentlemen were faced with a frustrating paradox: imported European formal shoes were built on razor-narrow lasts that squeezed the metatarsals of Indian feet, while commercial mass-market shoes relied on toxic glued plastic soles that disintegrated within six months.
            </p>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700 font-normal'
            }`}>
              <strong>The Shoe Kicks</strong> was founded to dismantle that compromise. We united traditional 360° Goodyear welted construction with leathers from the finest French tanneries and proprietary lasts sculpted to honor the unique contours of Indian feet.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-black">
              <img
                src="/images/editorial/luxury-storefront.jpg"
                alt="The Shoe Kicks Camp Pune Flagship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Atelier Flagship</span>
                <span className="text-sm font-serif text-white">Kolsa Lane, MG Road, Camp, Pune - 411001</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. The 4 Core Philosophies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
            isDark ? 'text-amber-400' : 'text-red-600'
          }`}>
            OUR PILLARS
          </span>
          <h2 className="text-3xl font-serif font-medium mt-1">What Guides Every Stitch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium">Anatomical Reverence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We spent three years mapping 10,000+ Indian foot scans. We will never design a shoe purely for aesthetic shape if it compromises the comfort of your toes, arches, and joints.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium">Generational Durability</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We reject planned obsolescence. Every pair is 360° Goodyear welted with solid leather insoles and oak-bark soles that can be resoled again and again over decades.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-medium">Unbroken French Boxcalf</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We cut each vamp from single unbroken hides from Tannery D’Annonay in France. Zero bonded leather, zero plastic PU, zero synthetic coatings.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Invitation to the Camp Salon */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-medium">
          Meet the Cobbler in Person
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          We invite you to visit our salon on Kolsa Lane, Camp, Pune. Enjoy an unhurried conversation, 3D foot digitization, and feel the weight of authentic boxcalf leather.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/boutique"
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg"
          >
            Visit Camp Pune Atelier
          </Link>
          <Link
            to="/collection"
            className={`px-6 py-3.5 rounded-full border text-xs font-mono font-bold uppercase transition-all ${
              isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            View Collection
          </Link>
        </div>
      </div>

    </div>
  );
};
