import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { AtelierCraft } from '../components/craft/AtelierCraft';
import { ComparisonMatrix } from '../components/craft/ComparisonMatrix';
import { Sparkles, ShieldCheck, ArrowRight, Award, Flame, Leaf } from 'lucide-react';

export const CraftsmanshipPage: React.FC = () => {
  const { isDark } = useTheme();

  useSeo({
    title: 'Goodyear Welted Craftsmanship & French Boxcalf Leathers | The Shoe Kicks',
    description: 'Learn about The Shoe Kicks 360° Goodyear welt construction, unbroken French boxcalf leathers, and anatomical lasts sculpted for Indian feet in Camp, Pune.',
    canonical: 'https://theshoekicks.com/craftsmanship',
    keywords: 'Goodyear welted shoes, French boxcalf leather, bespoke shoe lasting Pune, shoe recrafting India, shoe craftsmanship Camp Pune',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'The Sacred Art of Bespoke Lasting — The Shoe Kicks',
      url: 'https://theshoekicks.com/craftsmanship',
      description: 'The Shoe Kicks artisanal Goodyear-welted shoemaking, unbroken French Boxcalf, and anatomical lasts tailored for Indian foot anatomy.'
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
            <span>HERITAGE & LASTING LAB</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight">
            The Sacred Art of Bespoke Lasting
          </h1>

          <p className={`text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'
          }`}>
            In an era of mass-machine stamping and disposable plastic footwear, we honor the unhurried craft of 360° Goodyear-welted shoemaking, unbroken French Boxcalf, and anatomical lasts tailored for Indian foot anatomy.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono text-zinc-500">
            <span>42 Artisanal Stages</span>
            <span>•</span>
            <span>21 Days on Hornbeam Last</span>
            <span>•</span>
            <span>100% Recraftable</span>
          </div>
        </div>
      </div>

      {/* 2. Leather Provenance Triad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Tannery D’Annonay, France</span>
            <h3 className="text-lg font-serif font-medium">100% French Boxcalf (1.4mm)</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Sourced from the historic French Rhône-Alpes tanneries supplying Hermès and John Lobb. Drum-dyed with organic vegetable extracts, retaining microscopic open pores that breathe naturally even at 42°C.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Alentejo, Portugal</span>
            <h3 className="text-lg font-serif font-medium">Portuguese Virgin Cork Filler</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Harvested without felling cork oak trees. Granulated and pressed into a 5mm pliable cavity between the insole and welted outsole. Forms a customized orthopedic imprint of your foot within 7 days of wear.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Devon, England</span>
            <h3 className="text-lg font-serif font-medium">Oak-Bark Pit-Tanned Soles</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Tanned for 14 continuous months in traditional river-water oak-bark ground pits by J. & F.J. Baker. Dense, pliable, waterproof, and abrasion-resistant leather that outlasts commercial soles by 400%.
            </p>
          </div>

        </div>
      </div>

      {/* 3. The 5-Layer Interactive Shoe Exploded Architecture */}
      <AtelierCraft />

      {/* 4. The Honest Comparison Matrix */}
      <ComparisonMatrix />

      {/* 6. Recrafting & Longevity Pledge Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-4 ${
          isDark ? 'bg-[#0e0e14] border-[#d4af37]/30 shadow-2xl' : 'bg-white border-zinc-200 shadow-xl'
        }`}>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase ${
            isDark ? 'bg-amber-400/10 text-amber-300' : 'bg-red-50 text-red-600 font-bold'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>THE 25-YEAR COBBLER GUARANTEE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium">
            A Pair Built to Outlive Fast Fashion
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            When you purchase from The Shoe Kicks, you become a lifelong patron of our Camp, Pune atelier. Bring your pair back anytime for sole renewal, heel-tip replacement, or custom patina re-glaze.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/collection"
              className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
