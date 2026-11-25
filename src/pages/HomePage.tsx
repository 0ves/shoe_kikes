import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, ShoeCategory } from '../types';
import { useSeo } from '../hooks/useSeo';
import { SpatialHero } from '../components/hero/SpatialHero';
import { StoryCategories } from '../components/showcase/StoryCategories';
import { TrustBadgesBar } from '../components/ui/TrustBadgesBar';
import { PerfumeLuxuryGrid } from '../components/showcase/PerfumeLuxuryGrid';
import { ShoeCleanerShowcase } from '../components/showcase/ShoeCleanerShowcase';
import { EditorialSplit } from '../components/showcase/EditorialSplit';
import { ComparisonMatrix } from '../components/craft/ComparisonMatrix';
import { ShoppableLookbook } from '../components/showcase/ShoppableLookbook';
import { CustomerReviewsWall } from '../components/social/CustomerReviewsWall';
import { CampPuneAtelier } from '../components/local/CampPuneAtelier';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HomePageProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onOpenQuickView
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory | 'all'>('all');

  const featuredProducts = products.filter(p => p.featured);
  const flagshipProduct = products[0];

  useSeo({
    title: 'The Shoe Kicks™ | Luxury Handcrafted Shoes & Bespoke Footwear Atelier | Camp, Pune',
    description: 'The Shoe Kicks is an artisanal bespoke footwear atelier & luxury shoe store on Kolsa Lane, MG Road, Camp, Pune. 360° Goodyear welt oxfords, Chelsea boots, sculpted loafers & luxury kicks. Direct concierge: +91 73500 51590.',
    canonical: 'https://theshoekicks.com/',
    ogImage: 'https://theshoekicks.com/images/shoes/aesthetic-oxford-noir.jpg',
    keywords: 'The Shoe Kicks, luxury shoes Pune, shoe store Camp Pune, Kolsa Lane shoe store, MG Road Camp shoes, bespoke footwear Pune, handmade leather shoes India, Goodyear welted shoes Pune'
  });

  const handleCategorySelect = (cat: ShoeCategory | 'all') => {
    if (cat === 'all') {
      setSelectedCategory('all');
    } else {
      navigate(`/collection?cat=${cat}`);
    }
  };

  return (
    <main>
      {/* 1. Spatial Hero Section (Kinetic Motion Video + 3D Foaming Cleaner Turntable) */}
      <SpatialHero
        onExploreClick={() => navigate('/collection')}
        onOpenQuickView={onOpenQuickView}
        featuredProducts={featuredProducts}
      />

      {/* 2. TOP MOST FLAGSHIP PRODUCT: The Shoe Kicks Foaming Shoe Cleaner (150ml) Online Sale & Razorpay Showcase */}
      <ShoeCleanerShowcase onOpenQuickView={onOpenQuickView} />

      {/* 3. Circular Story Categories (Instant Visual Filter) */}
      <StoryCategories
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* 4. India Trust Badges Bar */}
      <TrustBadgesBar />

      {/* 5. Masterpieces Grid */}
      <PerfumeLuxuryGrid
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenQuickView={onOpenQuickView}
      />

      {/* View Full Collection Banner */}
      <div className={`py-10 border-b text-center transition-colors ${
        isDark ? 'bg-[#08080a] border-white/10' : 'bg-zinc-50 border-zinc-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className={`text-[10px] font-mono tracking-widest uppercase ${
              isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
            }`}>
              THE ENTIRE REPERTOIRE
            </span>
            <h3 className={`text-xl sm:text-2xl font-serif mt-1 ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
              Discover All Bespoke Masterpieces
            </h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Browse 360° Goodyear oxfords, Chelsea boots, sacchetto loafers & luxury kicks.
            </p>
          </div>
          <button
            onClick={() => navigate('/collection')}
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center gap-2 flex-shrink-0"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6. Haute Bespoke Signature Section */}
      <EditorialSplit
        flagshipProduct={flagshipProduct}
        onOpenQuickView={onOpenQuickView}
      />

      {/* 6. Camp, Pune Flagship Atelier Experience */}
      <CampPuneAtelier />

      {/* 7. Conversion Comparison Matrix */}
      <ComparisonMatrix />

      {/* 9. Shoppable Street Lookbook */}
      <ShoppableLookbook
        products={products}
        onOpenQuickView={onOpenQuickView}
      />

      {/* 10. Patron Social Proof Wall */}
      <CustomerReviewsWall />

      {/* Camp Pune Flagship Store Invitation */}
      <section className={`py-16 sm:py-20 border-t text-center ${
        isDark ? 'bg-[#060608] border-white/10' : 'bg-[#ffffff] border-zinc-200'
      }`}>
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-widest ${
            isDark ? 'bg-[#1a1710] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-200 text-red-600 font-bold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kolsa Lane, Camp, Pune Flagship</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-serif font-medium tracking-tight ${isDark ? 'text-white' : 'text-zinc-950 font-bold'}`}>
            Visit Our Camp Pune Flagship Atelier
          </h2>
          <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'}`}>
            Drop by our flagship atelier at 387 Kolsa Lane, MG Road, Camp, Pune. Experience our master collection in person, consult directly with our craftsmen, and find your perfect fit with no appointment required. Walk-ins always welcome.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?q=387+Kolsa+Lane+MG+Road+Camp+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-95 transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              Get Store Directions
            </a>
            <a
              href="tel:+917350051590"
              className={`px-6 py-3.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                isDark
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              Call Concierge: +91 73500 51590
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
