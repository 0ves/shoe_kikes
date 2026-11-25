import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Copy, Check, MapPin, Phone, Award } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AnnouncementBar: React.FC = () => {
  const { isDark } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const announcements = [
    {
      icon: <MapPin className="w-3.5 h-3.5 text-amber-400" />,
      text: '📍 Flagship Store: Kolsa Lane, MG Road, Camp, Pune - 411001 • Call: +91 73500 51590',
      badge: 'CAMP, PUNE',
      phone: '+917350051590'
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      text: '⚡ Special Atelier Privilege: Use Code "ROYAL10" for Extra 10% Instant In-Store & Online Savings',
      badge: 'LIMITED OFFER',
      hasCode: 'ROYAL10'
    },
    {
      icon: <Award className="w-3.5 h-3.5 text-amber-400" />,
      text: '👑 100% Full-Grain French Boxcalf & 360° Goodyear Welted • Private In-Store Fitting Salon',
      badge: 'CERTIFIED CRAFT'
    },
    {
      icon: <Phone className="w-3.5 h-3.5 text-emerald-400" />,
      text: '📞 Direct Concierge & WhatsApp Booking: +91 73500 51590 • Open Daily 9:00 AM – 10:00 PM',
      badge: 'CONCIERGE',
      phone: '+917350051590'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % announcements.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = announcements[currentIdx];

  return (
    <aside aria-label="Store Announcements" className={`relative z-50 text-[11px] sm:text-xs font-mono py-2 px-3 transition-colors duration-300 border-b select-none ${
      isDark
        ? 'bg-[#09090d] text-zinc-200 border-white/10'
        : 'bg-[#18181b] text-zinc-100 border-zinc-800'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white flex-shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Message with Transition */}
        <div className="flex items-center justify-center gap-2 overflow-hidden px-2 text-center flex-grow transition-all duration-300">
          <span className="hidden sm:inline-flex">{current.icon}</span>
          
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
            {current.badge}
          </span>

          <span className="truncate max-w-xl sm:max-w-none text-zinc-100 font-medium">
            {current.text}
          </span>

          {current.hasCode && (
            <button
              onClick={() => handleCopyCode(current.hasCode!)}
              className="ml-2 px-2 py-0.5 rounded bg-amber-400 text-black font-bold text-[10px] tracking-wider uppercase hover:bg-amber-300 transition-all flex items-center gap-1 active:scale-95 shadow-sm flex-shrink-0"
              title="Copy Discount Code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-black" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-black" />
                  <span>COPY: {current.hasCode}</span>
                </>
              )}
            </button>
          )}

          {current.phone && (
            <a
              href={`tel:${current.phone}`}
              className="ml-2 px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-amber-400/30 font-bold text-[10px] tracking-wider uppercase hover:bg-amber-400 hover:text-black transition-all hidden sm:inline-flex items-center gap-1 active:scale-95 flex-shrink-0"
              title="Call Concierge"
            >
              <Phone className="w-3 h-3" />
              <span>CALL NOW</span>
            </a>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white flex-shrink-0"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
};
