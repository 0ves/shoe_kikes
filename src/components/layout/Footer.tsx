import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoeKicksApi } from '../../services/api';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await ShoeKicksApi.subscribeNewsletter(email);
    setIsSubmitting(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#060608] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden text-zinc-400">
      
      {/* Giant Monumental Watermark */}
      <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none overflow-hidden opacity-5">
        <span className="font-display font-black text-[20vw] text-white tracking-tighter leading-none block uppercase">
          THE SHOE KICKS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top: Newsletter & Salon Induction */}
        <div className="rounded-3xl bg-gradient-to-br from-[#121218] via-[#0d0d12] to-[#08080a] border border-white/10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1a14] border border-[#d4af37]/30 text-xs font-mono uppercase tracking-[0.2em] text-[#e8caa4]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              Private Salon Induction
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              Receive Invitations to <span className="italic text-gold-gradient font-light">Numbered Releases</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Subscribers receive 48-hour advance access to limited atelier runs and private salon appointments.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[280px] sm:min-w-[380px]">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are inducted into The Shoe Kicks Private Salon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-xl bg-[#171720] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 sm:px-6 py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50"
                >
                  <span>{isSubmitting ? '...' : 'Request Access'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4" itemScope itemType="https://schema.org/ShoeStore">
            <Link to="/" className="inline-block group">
              <BrandLogo layout="horizontal" size="md" variant="white" />
            </Link>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Engineered with 360° Goodyear welt construction, unbroken single-piece French boxcalf, and anatomical Indian lasts.
            </p>

            {/* Camp, Pune Flagship Atelier Physical Address */}
            <div className="pt-1 space-y-1 text-xs" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="text-zinc-200 font-medium flex items-center gap-1.5">
                <span className="text-amber-400 font-mono text-[10px] uppercase tracking-wider">Flagship Boutique:</span>
                <span itemProp="streetAddress" className="font-semibold text-white">Kolsa Lane, MG Road, Camp</span>
              </div>
              <div className="text-zinc-400 text-[11px]">
                <span itemProp="addressLocality">Pune</span>, <span itemProp="addressRegion">Maharashtra</span> — <span itemProp="postalCode">411001</span>, <span itemProp="addressCountry">India</span>
              </div>
              <div className="text-zinc-300 text-xs font-mono pt-0.5">
                Direct Line: <a href="tel:+917350051590" className="text-amber-400 hover:text-white font-bold transition-colors" itemProp="telephone">+91 73500 51590</a>
              </div>
              <div className="text-zinc-400 text-[11px] font-mono">
                Email: <a href="mailto:concierge@theshoekicks.com" className="text-zinc-300 hover:underline" itemProp="email">concierge@theshoekicks.com</a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
              <span className="text-emerald-400 font-semibold">● Open All 7 Days: 9:00 AM – 10:00 PM</span>
              <span>•</span>
              <a href="https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline transition-colors">
                Google Maps &amp; Reviews
              </a>
            </div>
          </div>

          {/* Salons Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Salons & Lounges
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <div className="text-amber-400 font-bold">Camp Flagship (Pune)</div>
                <div className="text-[11px] text-zinc-300">Kolsa Lane, MG Road - 411001</div>
                <div className="text-[10px] text-zinc-400 font-mono">Tel: +91 73500 51590</div>
              </li>
              <li>
                <div className="text-zinc-200">Milan Flagship</div>
                <div className="text-[11px] text-zinc-500">Via Montenapoleone 18</div>
              </li>
              <li>
                <div className="text-zinc-200">London Mayfair</div>
                <div className="text-[11px] text-zinc-500">42 Old Bond Street</div>
              </li>
              <li>
                <div className="text-zinc-200">Parisian Atelier</div>
                <div className="text-[11px] text-zinc-500">12 Rue Saint-Honoré</div>
              </li>
            </ul>
          </div>

          {/* Curated Reserve */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Atelier Archive
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link to="/collection?cat=oxfords" className="hover:text-white transition-colors">Hand-Welted Oxfords</Link></li>
              <li><Link to="/collection?cat=loafers" className="hover:text-white transition-colors">Milanese Loafers</Link></li>
              <li><Link to="/collection?cat=chelsea-boots" className="hover:text-white transition-colors">Wholecut Chelsea Boots</Link></li>
              <li><Link to="/collection?cat=luxury-sneakers" className="hover:text-white transition-colors">Sovereign Vitello Kicks</Link></li>
              <li><Link to="/collection" className="text-amber-400 hover:underline">Complete Collection →</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Bespoke Concierge
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link to="/boutique" className="text-[#e8caa4] hover:underline">
                  Camp Pune Atelier (Walk-Ins)
                </Link>
              </li>
              <li><Link to="/boutique" className="hover:text-white transition-colors">Camp Pune Flagship Boutique</Link></li>
              <li><Link to="/craftsmanship" className="hover:text-white transition-colors">Goodyear Recrafting Rights</Link></li>
              <li><Link to="/story" className="hover:text-white transition-colors">Brand Story & Heritage</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Concierge & Contact</Link></li>
              <li><a href="tel:+917350051590" className="text-amber-400 hover:underline block pt-1 font-mono font-bold">+91 73500 51590</a></li>
            </ul>
          </div>

        </div>

        {/* Indian Payment Modes & Boutique Trust Strip */}
        <div className="pt-6 pb-2 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Accepted Payments:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">UPI (GPay / PhonePe / Paytm)</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">In-Store Salon Checkout</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">Credit / Debit / NetBanking</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">RuPay / Visa / Mastercard</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="text-zinc-500 font-bold">Flagship Boutique:</span>
            <span>Kolsa Lane, MG Road, Camp, Pune</span>
            <span>•</span>
            <a href="tel:+917350051590" className="text-amber-400 hover:underline font-bold">+91 73500 51590</a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © The Shoe Kicks Atelier. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Bespoke Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Salon Service</span>
            <span>•</span>
            <span className="hover:text-zinc-300 cursor-pointer">Authentication Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
