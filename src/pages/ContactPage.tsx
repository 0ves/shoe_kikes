import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSeo } from '../hooks/useSeo';
import { 
  MapPin, Phone, MessageSquare, 
  Sparkles, Navigation, Send, Check, ChevronDown, ChevronUp 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { isDark } = useTheme();

  useSeo({
    title: 'Contact & Atelier Concierge | The Shoe Kicks™ | Camp, Pune',
    description: 'Connect with The Shoe Kicks atelier concierge at Kolsa Lane, MG Road, Camp, Pune. Inquire about bespoke Goodyear welt fittings, private salon appointments & nationwide shipping. Phone: +91 73500 51590.',
    canonical: 'https://theshoekicks.com/contact',
    keywords: 'Contact The Shoe Kicks, shoe store Camp Pune, Kolsa Lane footwear, luxury shoe atelier Pune contact, bespoke shoe appointment Pune',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact The Shoe Kicks Bespoke Atelier',
      url: 'https://theshoekicks.com/contact',
      description: 'Atelier concierge, private fitting inquiries, and bespoke customer assistance in Camp, Pune.',
      mainEntity: {
        '@type': 'ShoeStore',
        name: 'The Shoe Kicks',
        image: 'https://theshoekicks.com/images/shoes/aesthetic-oxford-noir.jpg',
        telephone: '+91 73500 51590',
        email: 'concierge@theshoekicks.com',
        priceRange: '₹₹₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kolsa Lane, MG Road',
          addressLocality: 'Camp, Pune',
          addressRegion: 'Maharashtra',
          postalCode: '411001',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '18.5167',
          longitude: '73.8778'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '22:00'
          }
        ]
      }
    }
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: 'Where is The Shoe Kicks flagship atelier located in Pune?',
      a: 'Our flagship bespoke footwear atelier and fitting salon is situated at Kolsa Lane, MG Road, Camp, Pune - 411001, Maharashtra, India. Visitors can experience personalized 3D foot measuring, hand-lasting demonstrations, and private fitting appointments. Direct phone: +91 73500 51590.'
    },
    {
      q: 'Can I visit the store for an in-person bespoke fitting?',
      a: 'Yes, we warmly welcome patrons to our Camp, Pune salon. You can walk in during boutique hours (9:00 AM – 10:00 PM daily) or schedule a private 45-minute consultation with our Master Last-Maker for 3D foot digitization and custom leather patina selection.'
    },
    {
      q: 'How are your shoes sculpted for Indian foot anatomy?',
      a: 'We developed proprietary anatomical D (Standard) and EE (Wide) lasts based on 10,000+ Indian 3D foot scans. They feature a 15% roomier ball-girth to eliminate bunion rubbing and toe-pinching, paired with 5-layer Poron memory foam and Portuguese virgin cork for 14-hour all-day comfort.'
    },
    {
      q: 'What is Goodyear welted construction and can these shoes be resoled?',
      a: 'Every formal shoe and boot is crafted with genuine 360° Goodyear welt construction. The upper and sole are stitched via an interlocking leather welt, which allows the sole to be removed and replaced multiple times over decades without compromising the upper.'
    },
    {
      q: 'What payment modes are accepted at the Camp salon?',
      a: 'We accept all major payment modes including UPI (GPay, PhonePe, Paytm), Visa, Mastercard, RuPay, American Express, Net Banking, and direct salon checkout.'
    }
  ];

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.25em] ${
            isDark ? 'bg-[#181610] border-[#d4af37]/30 text-[#e8caa4]' : 'bg-red-50 border-red-200 text-red-600 font-bold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE CONCIERGE HOTLINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight">
            Connect With Our Atelier
          </h1>

          <p className={`text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-700 font-normal'
          }`}>
            Have questions regarding anatomical sizing, bespoke fittings, or directions to our Camp, Pune boutique? Our master concierge is at your service.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">Direct Telephone</h3>
            <p className="text-xs text-zinc-400">Available Mon–Sun 9:00 AM – 10:00 PM</p>
            <a href="tel:+917350051590" className="block text-base font-mono font-bold text-amber-400 hover:underline pt-2">
              +91 73500 51590
            </a>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">WhatsApp Concierge</h3>
            <p className="text-xs text-zinc-400">Instant fitting queries & photos</p>
            <a
              href="https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks,%20I%20have%20an%20inquiry%20regarding%20your%20bespoke%20footwear%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:underline pt-2"
            >
              <span>Launch WhatsApp Chat</span>
            </a>
          </div>

          <div className={`p-8 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-medium">Camp Flagship Salon</h3>
            <p className="text-xs text-zinc-400">
              Kolsa Lane, MG Road, Camp,<br />
              Pune - 411001, Maharashtra
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:underline pt-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>

        {/* 2-Column: Inquiry Form + Storefront Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24">
          
          {/* Left: Message Form (7 Cols) */}
          <div className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl border shadow-xl ${
            isDark ? 'bg-[#0e0e14] border-white/10' : 'bg-white border-zinc-200'
          }`}>
            <h3 className="text-2xl font-serif font-medium mb-1">Send a Private Note</h3>
            <p className="text-xs text-zinc-400 mb-6">Our master concierge responds within 3 hours.</p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-serif text-white">Message Transmitted</h4>
                <p className="text-xs text-zinc-300">Thank you. Our concierge will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Your Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none border ${
                        isDark ? 'bg-[#15151c] border-white/10 text-white focus:border-amber-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-red-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 73500 51590"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none border ${
                        isDark ? 'bg-[#15151c] border-white/10 text-white focus:border-amber-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-red-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none border ${
                        isDark ? 'bg-[#15151c] border-white/10 text-white focus:border-amber-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-red-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Inquiry Type:</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none border ${
                        isDark ? 'bg-[#15151c] border-white/10 text-white focus:border-amber-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-red-600'
                      }`}
                    >
                      <option value="General Inquiry">General Footwear Inquiry</option>
                      <option value="Bespoke Lasting">Custom Lasting / Special Fit</option>
                      <option value="Goodyear Resoling">Goodyear Resoling & Care</option>
                      <option value="Salon Visit">Flagship Salon Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Message:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the silhouette or fitting requirements you'd like to discuss..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none border resize-none ${
                      isDark ? 'bg-[#15151c] border-white/10 text-white focus:border-amber-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-red-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Note to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Map / Direction Visual (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black aspect-[4/3] shadow-xl relative group">
              <img
                src="/images/editorial/luxury-storefront.jpg"
                alt="The Shoe Kicks Kolsa Lane, Camp, Pune"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Flagship Boutique</span>
                <span className="text-base font-serif text-white font-medium">Kolsa Lane, MG Road, Camp, Pune</span>
                <p className="text-[11px] text-zinc-300 mt-1">Valet parking assistance available on arrival.</p>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border space-y-3 ${
              isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-md'
            }`}>
              <h4 className="font-serif font-medium text-base">Key Transit Distances:</h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between pb-1 border-b border-white/5">
                  <span>Pune Railway Station:</span>
                  <span className="font-mono text-zinc-300">3.2 km (~10 mins)</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/5">
                  <span>Pune International Airport (PNQ):</span>
                  <span className="font-mono text-zinc-300">9.8 km (~25 mins)</span>
                </div>
                <div className="flex justify-between">
                  <span>East Street / Aurora Towers:</span>
                  <span className="font-mono text-zinc-300">Walking distance (~3 mins)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
              isDark ? 'text-amber-400' : 'text-red-600'
            }`}>
              CLARIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium mt-1">Frequently Asked Questions</h2>
          </div>

          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isDark ? 'bg-[#0f0f15] border-white/10' : 'bg-white border-zinc-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
