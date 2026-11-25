import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Maximize2,
  Film,
  Zap
} from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

interface SpatialHeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts: Product[];
}

interface SilhouetteModel {
  id: string;
  category: string;
  name: string;
  tagline: string;
  price: number;
  productIdx: number;
  angles: {
    label: string;
    sublabel: string;
    image: string;
    rotationDeg: string;
  }[];
  hotspots: {
    id: string;
    x: number;
    y: number;
    title: string;
    detail: string;
  }[];
}

export const SpatialHero: React.FC<SpatialHeroProps> = ({
  onOpenQuickView,
  featuredProducts
}) => {
  const { formatPrice } = useCurrency();
  const { isDark } = useTheme();

  // Mode: Default to 'video' at first as requested!
  const [viewMode, setViewMode] = useState<'video' | 'scrub'>('video');

  // Video & Audio synchronization refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoTime, setVideoTime] = useState({ current: '0:00', total: '0:00' });

  // 3D Turntable state
  const [selectedSilhouetteIdx, setSelectedSilhouetteIdx] = useState(0);
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [orbitProgress, setOrbitProgress] = useState(0);
  const [showHotspots, setShowHotspots] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // 3D Mouse Parallax & Dynamic Lighting
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Drag-to-scrub rotation
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragRotationRef = useRef(0);
  const [manualRotation, setManualRotation] = useState(0);

  // Scroll Position tracking for dynamic text animation on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Curated Silhouette Models for 360° Turntable Mode (Foaming Shoe Cleaner as Flagship #0)
  const silhouettes: SilhouetteModel[] = useMemo(() => [
    {
      id: 'cleaner',
      category: 'FOAMING CLEANER',
      name: 'FOAMING SHOE CLEANER',
      tagline: 'OFFICIAL 150ML DEEP SELF-FOAMING SOLUTION',
      price: 7.17,
      productIdx: 0,
      angles: [
        { label: '01 GRADIENT', sublabel: 'Luxury Studio Gradient', image: '/images/cleaner/cleaner-luxury-gradient.jpg', rotationDeg: '0°' },
        { label: '02 COLORBLOCK', sublabel: 'Editorial Pop Studio', image: '/images/cleaner/cleaner-colorblock-pop.jpg', rotationDeg: '45°' },
        { label: '03 OBSIDIAN', sublabel: 'Studio Marble Pedestal', image: '/images/cleaner/cleaner-studio-hero.jpg', rotationDeg: '90°' },
        { label: '04 CARE KIT', sublabel: 'Atelier Set with Brush', image: '/images/cleaner/cleaner-lifestyle-kit.jpg', rotationDeg: '180°' }
      ],
      hotspots: [
        { id: 'hc1', x: 50, y: 32, title: 'Instant Micro-Foam Pump', detail: 'Aeration pump creates dense foam without water soaking' },
        { id: 'hc2', x: 50, y: 68, title: 'All-Material Safe Formulation', detail: 'Safe for suede, nubuck, patent leather, synthetics & canvas' }
      ]
    },
    {
      id: 'kicks',
      category: 'KICKS',
      name: 'VITELLO COURT KICK',
      tagline: 'ARCHITECTURAL LUXURY STREETWEAR',
      price: 520,
      productIdx: 5,
      angles: [
        { label: '01 VITELLO', sublabel: 'Pure White Calf', image: '/images/shoes/aesthetic-sneaker-white.jpg', rotationDeg: '0°' },
        { label: '02 OBSIDIAN', sublabel: 'Triple Noir Nappa', image: '/images/shoes/aesthetic-sneaker-noir.jpg', rotationDeg: '45°' },
        { label: '03 CONTRAST', sublabel: 'Margom Cupsole', image: '/images/shoes/sneaker-white-sole.jpg', rotationDeg: '90°' },
        { label: '04 ATELIER', sublabel: 'Perimeter Stitch', image: '/images/shoes/aesthetic-craft-atelier.jpg', rotationDeg: '180°' }
      ],
      hotspots: [
        { id: 'h1', x: 48, y: 76, title: 'Margom Cupsole', detail: '360° sidewall lockstitch' },
        { id: 'h2', x: 60, y: 44, title: 'Vitello Nappa', detail: 'Glove-tanned calfskin' }
      ]
    },
    {
      id: 'oxford',
      category: "MEN'S SHOES",
      name: 'IMPERIAL WHOLECUT',
      tagline: 'EXCLUSIVE ATELIER FOOTWEAR',
      price: 1190,
      productIdx: 1,
      angles: [
        { label: '01 PROFILE', sublabel: 'Sculpted Silhouette', image: '/images/shoes/aesthetic-oxford-noir.jpg', rotationDeg: '0°' },
        { label: '02 QUARTER', sublabel: '45° Studio Angle', image: '/images/shoes/oxford-studio-angle.jpg', rotationDeg: '45°' },
        { label: '03 PATINA', sublabel: 'Tuscan Burnish', image: '/images/shoes/aesthetic-oxford-cognac.jpg', rotationDeg: '90°' },
        { label: '04 ATELIER', sublabel: 'Welt & Stitching', image: '/images/shoes/aesthetic-craft-atelier.jpg', rotationDeg: '180°' }
      ],
      hotspots: [
        { id: 'h3', x: 48, y: 68, title: 'Goodyear Welt', detail: 'Closed-channel hand lockstitch' },
        { id: 'h4', x: 64, y: 42, title: 'French Boxcalf', detail: 'Unbroken single-piece hide' }
      ]
    },
    {
      id: 'loafer',
      category: 'LOAFERS',
      name: 'SCULPTED LOAFER',
      tagline: 'MILANESE BESPOKE ARISTOCRACY',
      price: 740,
      productIdx: 4,
      angles: [
        { label: '01 HORSEBIT', sublabel: 'Noir Boxcalf', image: '/images/shoes/aesthetic-loafer-noir.jpg', rotationDeg: '0°' },
        { label: '02 VENETIAN', sublabel: 'Tuscan Tan Patina', image: '/images/shoes/aesthetic-loafer-brown.jpg', rotationDeg: '45°' },
        { label: '03 PENNY', sublabel: 'Classic Saddle Strap', image: '/images/shoes/loafer-penny.jpg', rotationDeg: '90°' },
        { label: '04 ATELIER', sublabel: 'Hand-Sewn Apron', image: '/images/shoes/aesthetic-craft-atelier.jpg', rotationDeg: '180°' }
      ],
      hotspots: [
        { id: 'h5', x: 52, y: 46, title: '18K Gold Bit', detail: 'Solid electroplated brass' },
        { id: 'h6', x: 66, y: 52, title: 'Saddle Apron', detail: 'Double-needle hand stitch' }
      ]
    },
    {
      id: 'chelsea',
      category: 'BOOTS',
      name: 'SOVEREIGN CHELSEA',
      tagline: 'SEAMLESS LEATHER SILHOUETTE',
      price: 890,
      productIdx: 3,
      angles: [
        { label: '01 NOIR', sublabel: 'Wholecut Silhouette', image: '/images/shoes/aesthetic-chelsea-noir.jpg', rotationDeg: '0°' },
        { label: '02 STUDIO', sublabel: 'Shaft & Contour', image: '/images/shoes/chelsea-studio.jpg', rotationDeg: '45°' },
        { label: '03 SUEDE', sublabel: 'Tuscan Reverse Suede', image: '/images/shoes/aesthetic-chelsea-suede.jpg', rotationDeg: '90°' },
        { label: '04 ATELIER', sublabel: 'Sole & Lasting', image: '/images/shoes/aesthetic-craft-atelier.jpg', rotationDeg: '180°' }
      ],
      hotspots: [
        { id: 'h7', x: 52, y: 72, title: 'Storm Welt 360°', detail: 'Moisture-sealed all-weather' },
        { id: 'h8', x: 46, y: 35, title: 'Single-Cut Upper', detail: 'Zero exterior seam friction' }
      ]
    }
  ], []);

  const activeSilhouette = silhouettes[selectedSilhouetteIdx];
  const activeAngle = activeSilhouette.angles[activeAngleIdx];
  const activeProduct = featuredProducts[activeSilhouette.productIdx] || featuredProducts[0] || null;

  // Preload all frames for instant scrubbing
  useEffect(() => {
    silhouettes.forEach((s) => {
      s.angles.forEach((ang) => {
        const img = new Image();
        img.src = ang.image;
      });
    });
  }, [silhouettes]);

  // Video playback time & progress listener
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      const pct = (cur / dur) * 100;
      setVideoProgress(isNaN(pct) ? 0 : pct);

      const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      };

      setVideoTime({
        current: formatTime(cur),
        total: isNaN(dur) ? '0:00' : formatTime(dur)
      });

      // Keep audio synced with video
      if (audioRef.current && !isVideoMuted) {
        if (Math.abs(audioRef.current.currentTime - cur) > 0.3) {
          audioRef.current.currentTime = cur;
        }
      }
    }
  };

  // Toggle video Play/Pause
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      if (audioRef.current && !isVideoMuted) {
        audioRef.current.play();
      }
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsVideoPlaying(false);
    }
  };

  // Toggle video Audio Mute / Unmute
  const toggleAudio = () => {
    const nextMuted = !isVideoMuted;
    setIsVideoMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }

    if (audioRef.current && videoRef.current) {
      if (nextMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = videoRef.current.currentTime;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Seek video by clicking timeline
  const handleTimelineSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = pos * videoRef.current.duration;
    videoRef.current.currentTime = targetTime;
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Auto-orbit turntable progress timer (advances angle every 3s in scrub mode)
  useEffect(() => {
    if (viewMode !== 'scrub' || !isAutoOrbit || isHoveringStage) {
      setOrbitProgress(0);
      return;
    }

    const stepMs = 50;
    const durationMs = 3000;
    const increment = (stepMs / durationMs) * 100;

    const interval = setInterval(() => {
      setOrbitProgress(prev => {
        if (prev >= 100) {
          setActiveAngleIdx(a => (a + 1) % activeSilhouette.angles.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [viewMode, isAutoOrbit, isHoveringStage, activeSilhouette.angles.length]);

  // Mouse Parallax for Spatial 3D Feel
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  // Drag to scrub interaction in 360° mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== 'scrub') return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragRotationRef.current = manualRotation;
    setIsAutoOrbit(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== 'scrub') return;
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      dragRotationRef.current = manualRotation;
      setIsAutoOrbit(false);
    }
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current || viewMode !== 'scrub') return;
    const deltaX = clientX - startXRef.current;
    const rotation = dragRotationRef.current + deltaX * 0.45;
    setManualRotation(rotation);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const rotateX = isHoveringStage ? -mousePos.y * 12 : 0;
  const rotateY = (isHoveringStage ? mousePos.x * 16 : 0) + manualRotation;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringStage(true)}
      onMouseLeave={() => {
        setIsHoveringStage(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={`relative min-h-[94vh] flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-4 transition-colors duration-500 select-none ${
        isDark ? 'bg-[#08080a] text-white' : 'bg-[#f7f7fa] text-zinc-950'
      }`}
    >
      {/* 1. SCROLL-DRIVEN KINETIC WATERMARKS (Dual Parallax Text on Scroll) */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none select-none overflow-hidden z-0 py-6 sm:py-10">
        {/* Track 1: Translates Left on Scroll with dynamic letter spacing */}
        <div 
          className="whitespace-nowrap will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${-scrollY * 0.45}px)`,
          }}
        >
          <span 
            className={`font-display font-black text-[14vw] sm:text-[16vw] tracking-tighter leading-none block uppercase transition-opacity duration-300 ${
              isDark 
                ? 'text-white opacity-[0.05] sm:opacity-[0.06]' 
                : 'text-black opacity-[0.035] sm:opacity-[0.045]'
            }`}
            style={{
              letterSpacing: `${-0.03 + Math.min(scrollY * 0.0002, 0.08)}em`
            }}
          >
            THE SHOE KICKS • 3D CONCEPT • ATELIER PUNE • THE SHOE KICKS • 3D CONCEPT • ATELIER PUNE
          </span>
        </div>

        {/* Track 2: Translates Right on Scroll */}
        <div 
          className="whitespace-nowrap will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${scrollY * 0.4 - 280}px)`,
          }}
        >
          <span 
            className={`font-display font-black text-[11vw] sm:text-[13vw] tracking-tight leading-none block uppercase transition-opacity duration-300 ${
              isDark 
                ? 'text-[#d4af37] opacity-[0.04] sm:opacity-[0.05]' 
                : 'text-red-600 opacity-[0.03] sm:opacity-[0.04]'
            }`}
          >
            HAUTE BESPOKE • FOAMING SHOE CLEANER • CAMP PUNE • 360° WELT • HAUTE BESPOKE • FOAMING SHOE CLEANER
          </span>
        </div>
      </div>

      {/* 2. Cinematic Studio Lighting Spotlight (Apple-style radial beam) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div 
          className="absolute w-[1000px] h-[650px] rounded-full blur-[130px] transition-transform duration-700 ease-out"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 100}px, ${mousePos.y * 70}px)`,
            background: isDark
              ? 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.03) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(220,38,38,0.11) 0%, rgba(220,38,38,0.02) 50%, transparent 70%)'
          }}
        />

        {/* Soft bottom vignette */}
        <div className={`absolute bottom-0 inset-x-0 h-32 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-t from-[#08080a] to-transparent' 
            : 'bg-gradient-to-t from-[#f7f7fa] to-transparent'
        }`} />
      </div>

      {/* 3. Top Header: Refined H1 with Scroll-Driven Kinetic Typography */}
      <div 
        className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-1.5 pt-1 will-change-transform transition-all duration-100 ease-out"
        style={{
          transform: `translateY(${-Math.min(scrollY * 0.2, 40)}px)`,
          opacity: Math.max(0.15, 1 - scrollY / 550)
        }}
      >
        {/* Minimal Subtle Overline with Authentic Brand Emblem */}
        <div className="flex items-center justify-center gap-2">
          <span className={`w-5 h-[1px] ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
          <BrandLogo layout="icon" size="xs" variant="auto" />
          <span className={`text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase font-bold transition-colors ${
            isDark ? 'text-[#d4af37]' : 'text-red-600'
          }`}>
            THE SHOE KICKS // CAMP, PUNE
          </span>
          <span className={`w-5 h-[1px] ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
        </div>

        {/* Dynamic H1 Title with Scroll Text Expansion */}
        <h1 
          className="text-lg sm:text-2xl md:text-3xl font-display font-bold uppercase select-none transition-all duration-100"
          style={{
            letterSpacing: `${0.22 + Math.min(scrollY * 0.0003, 0.08)}em`
          }}
        >
          {viewMode === 'video' ? 'THE SHOE KICKS // 3D CONCEPT ATELIER' : activeSilhouette.name}
        </h1>

        {/* High-End Mode Switcher (Kinetic Video vs 3D Turntable) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 pt-1">
          <button
            onClick={() => setViewMode('video')}
            className={`px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
              viewMode === 'video'
                ? isDark
                  ? 'bg-white text-black font-bold shadow-md shadow-white/10 scale-105'
                  : 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20 scale-105'
                : isDark
                ? 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
            }`}
          >
            <Film className="w-3 h-3" />
            <span>KINETIC MOTION</span>
          </button>

          <button
            onClick={() => setViewMode('scrub')}
            className={`px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
              viewMode === 'scrub'
                ? isDark
                  ? 'bg-white text-black font-bold shadow-md shadow-white/10 scale-105'
                  : 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20 scale-105'
                : isDark
                ? 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>360° ATELIER TURNTABLE</span>
          </button>
        </div>

        {/* Model Tabs (Visible when in 360° Turntable Mode) */}
        {viewMode === 'scrub' && (
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 pt-1 flex-wrap animate-in fade-in duration-300">
            {silhouettes.map((s, idx) => {
              const isSelected = selectedSilhouetteIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSilhouetteIdx(idx);
                    setActiveAngleIdx(0);
                    setManualRotation(0);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider uppercase transition-all ${
                    isSelected
                      ? isDark
                        ? 'bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37] font-bold'
                        : 'bg-red-50 border border-red-300 text-red-600 font-bold'
                      : isDark
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {s.category}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* 4. EXPANSIVE LARGE PROPORTION IMAGE / VIDEO SECTION (Takes majority of hero height) */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-grow my-auto flex flex-col items-center justify-center min-h-[52vh] sm:min-h-[60vh] md:min-h-[66vh]"
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => {
          if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handleMouseUp}
      >
        {/* VIEW A: REAL MOTION GRAPHICS VIDEO (Unbranded & Refined) */}
        {viewMode === 'video' ? (
          <div className="relative w-full max-w-4xl h-[48vh] sm:h-[56vh] md:h-[62vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md group animate-in fade-in zoom-in-95 duration-500 flex items-center justify-center bg-black">
            
            {/* The 1080p Concept Shoe 3D Animation Video (bOhKc3ltSUc) */}
            <video
              ref={videoRef}
              src="/videos/hero-concept-shoe.mp4"
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover select-none filter contrast-105"
            />

            {/* Synchronized Audio Track for unmuted commercial experience */}
            <audio
              ref={audioRef}
              src="/videos/egeon-concept-audio.m4a"
              loop
            />

            {/* Ultra-Clean Bottom Progress Line */}
            <div 
              onClick={handleTimelineSeek}
              className="absolute bottom-0 inset-x-0 h-[4px] hover:h-[7px] bg-white/10 z-20 overflow-hidden cursor-pointer transition-all"
              title="Click to seek animation timeline"
            >
              <div 
                className="h-full bg-gradient-to-r from-[#d4af37] via-amber-300 to-red-500 transition-all duration-100 pointer-events-none"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            {/* Refined Minimalist Control Badge (Discreet Glass Pill) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 text-white z-30 transition-all shadow-xl">
              {/* Play / Pause */}
              <button
                onClick={toggleVideoPlay}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white"
                title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                aria-label={isVideoPlaying ? 'Pause' : 'Play'}
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              </button>

              {/* Time Indicator */}
              <span className="text-[10px] font-mono text-zinc-300 px-1 select-none hidden sm:inline">
                {videoTime.current} / {videoTime.total}
              </span>

              {/* Sound Toggle */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 active:scale-95 ${
                  !isVideoMuted 
                    ? 'bg-[#d4af37]/25 border-[#d4af37]/60 text-[#d4af37]' 
                    : 'bg-white/10 border-white/10 text-zinc-400 hover:text-white'
                }`}
                title={isVideoMuted ? 'Unmute Sound' : 'Mute Sound'}
                aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
              >
                {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                <span className="text-[10px] font-mono font-bold hidden sm:inline">
                  {isVideoMuted ? 'SOUND' : 'AUDIO ON'}
                </span>
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all"
                title="Fullscreen"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ) : (
          /* VIEW B: 3D INTERACTIVE SHOE TURNTABLE & SCRUBBER */
          <div 
            className="relative w-full max-w-4xl h-[48vh] sm:h-[56vh] md:h-[62vh] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000 group animate-in fade-in zoom-in-95 duration-500"
            style={{ perspective: '1200px' }}
          >
            {/* Spatial 3D Tilting Frame */}
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out transform-style-3d"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHoveringStage ? 1.03 : 1})`
              }}
            >
              {/* The Shoe Image with Apple-Style Gradient Mask */}
              <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6">
                <img
                  key={`${activeSilhouette.id}-${activeAngleIdx}`}
                  src={activeAngle.image}
                  alt={`${activeSilhouette.name} (${activeAngle.label}) — Handcrafted Luxury Footwear by The Shoe Kicks, Camp, Pune`}
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none animate-in fade-in zoom-in-95 duration-500 mask-radial-studio"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />

                {/* Hotspots */}
                {showHotspots && activeSilhouette.hotspots.map((spot) => {
                  const isActive = activeHotspotId === spot.id;
                  return (
                    <div
                      key={spot.id}
                      className="absolute z-30 transition-transform duration-300 pointer-events-auto"
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseEnter={() => setActiveHotspotId(spot.id)}
                      onMouseLeave={() => setActiveHotspotId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspotId(isActive ? null : spot.id);
                      }}
                    >
                      <div className="relative flex items-center justify-center cursor-pointer group/pin">
                        <span className={`absolute w-7 h-7 rounded-full animate-hotspot-ping ${
                          isDark ? 'bg-[#d4af37]/40' : 'bg-red-500/40'
                        }`} />
                        <span className={`relative w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg transition-transform duration-200 group-hover/pin:scale-125 ${
                          isDark ? 'bg-[#d4af37] text-black' : 'bg-red-600 text-white'
                        }`}>
                          +
                        </span>
                      </div>

                      {isActive && (
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl border shadow-2xl backdrop-blur-xl z-40 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto ${
                          isDark 
                            ? 'bg-black/90 border-[#d4af37]/40 text-white' 
                            : 'bg-white/95 border-red-500/30 text-zinc-900 shadow-xl'
                        }`}>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                            {spot.title}
                          </div>
                          <div className="text-[11px] leading-tight mt-0.5 text-zinc-300 font-sans">
                            {spot.detail}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

              {/* Angle & Rotation Readout */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2">
                <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono tracking-wider backdrop-blur-md transition-colors ${
                  isDark 
                    ? 'bg-black/60 border-white/10 text-zinc-300' 
                    : 'bg-white/70 border-zinc-200 text-zinc-700'
                }`}>
                  <span>{activeAngle.rotationDeg}</span>
                  <span className="mx-1 text-[#d4af37]">•</span>
                  <span className="font-semibold">{activeAngle.sublabel}</span>
                </div>

                {activeProduct && (
                  <button
                    onClick={() => onOpenQuickView(activeProduct)}
                    className={`p-1.5 rounded-lg border backdrop-blur-md transition-colors ${
                      isDark 
                        ? 'bg-black/60 border-white/10 text-zinc-300 hover:text-white' 
                        : 'bg-white/70 border-zinc-200 text-zinc-700 hover:text-zinc-950'
                    }`}
                    title="Quick Inspect"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Drag Hint */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                  isDark ? 'bg-black/70 border-white/10 text-zinc-400' : 'bg-white/80 border-zinc-200 text-zinc-600'
                }`}>
                  ↔ Drag Horizontally To Scrub
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 5. Bottom: Compact Apple-Style Interactive Scrub Controller Bar (in Turntable Mode) */}
      {viewMode === 'scrub' && (
        <div className="relative z-20 w-full max-w-3xl mx-auto px-4 pb-2 animate-in fade-in duration-300">
          <div className={`p-2 sm:p-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-xl ${
            isDark 
              ? 'bg-[#121217]/85 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
              : 'bg-white/90 border-zinc-200 shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
          }`}>
            
            <div className="flex items-center justify-between gap-2">
              
              {/* Auto-Orbit Controller */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                  className={`px-2.5 py-1.5 rounded-xl border text-[10px] sm:text-[11px] font-mono tracking-wider flex items-center gap-1.5 transition-all ${
                    isAutoOrbit
                      ? isDark
                        ? 'bg-[#d4af37]/15 border-[#d4af37]/50 text-[#d4af37]'
                        : 'bg-red-50 border-red-300 text-red-600'
                      : isDark
                      ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-950'
                  }`}
                  title={isAutoOrbit ? 'Pause Turntable' : 'Play Turntable'}
                >
                  <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 -rotate-90" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" className="stroke-current opacity-20" strokeWidth="3" fill="none" />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="stroke-current transition-all duration-100"
                        strokeWidth="3"
                        strokeDasharray="62.83"
                        strokeDashoffset={62.83 - (62.83 * orbitProgress) / 100}
                        fill="none"
                      />
                    </svg>
                    {isAutoOrbit ? <Pause className="w-1.5 h-1.5 absolute" /> : <Play className="w-1.5 h-1.5 absolute fill-current" />}
                  </div>
                  <span className="font-semibold">{isAutoOrbit ? 'ORBIT' : 'PAUSED'}</span>
                </button>

                <button
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`px-2.5 py-1.5 rounded-xl border text-[10px] sm:text-[11px] font-mono tracking-wider flex items-center gap-1 transition-all ${
                    showHotspots
                      ? isDark ? 'bg-white/20 border-white/30 text-white font-bold' : 'bg-zinc-900 border-zinc-900 text-white font-bold'
                      : isDark ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                  }`}
                  title="Toggle Specs"
                >
                  <Zap className="w-3 h-3 text-[#d4af37]" />
                  <span>SPECS</span>
                </button>
              </div>

              {/* The 4 Angle Pills */}
              <div className="flex items-center gap-1 justify-center flex-grow">
                {activeSilhouette.angles.map((ang, idx) => {
                  const isActive = activeAngleIdx === idx;
                  return (
                    <button
                      key={ang.label}
                      onClick={() => {
                        setActiveAngleIdx(idx);
                        setIsAutoOrbit(false);
                      }}
                      className={`px-2 sm:px-2.5 py-1 rounded-xl text-[9px] sm:text-[10px] font-mono tracking-wider transition-all ${
                        isActive
                          ? isDark
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-red-600 text-white font-bold shadow-sm'
                          : isDark
                          ? 'bg-white/5 text-zinc-400 hover:text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      <span className="sm:hidden">{idx + 1}</span>
                      <span className="hidden sm:inline">{ang.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Price */}
              <div className="hidden sm:block text-xs font-mono font-bold text-[#d4af37]">
                {formatPrice(activeSilhouette.price)}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 6. Kinetic Scroll Ribbon / Ticker (Reacts Dynamically to Scroll Offset) */}
      <div className={`relative z-20 w-full overflow-hidden border-t py-2 sm:py-2.5 backdrop-blur-md transition-colors mt-2 select-none ${
        isDark ? 'bg-black/40 border-white/10 text-zinc-300' : 'bg-white/50 border-zinc-200 text-zinc-700'
      }`}>
        <div 
          className="flex whitespace-nowrap will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${-((scrollY * 0.6) % 900)}px)`,
          }}
        >
          <div className="flex items-center gap-6 sm:gap-10 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase font-semibold">
            <span className={isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'}>THE SHOE KICKS</span>
            <span className="text-zinc-500">•</span>
            <span>3D CONCEPT ATELIER</span>
            <span className="text-zinc-500">•</span>
            <span>CAMP, PUNE - 411001</span>
            <span className="text-zinc-500">•</span>
            <span className={isDark ? 'text-amber-400' : 'text-red-600 font-bold'}>FOAMING SHOE CLEANER (150ML)</span>
            <span className="text-zinc-500">•</span>
            <span>BESPOKE INDIAN LASTING</span>
            <span className="text-zinc-500">•</span>
            <span>360° CLOSED-CHANNEL GOODYEAR WELT</span>
            <span className="text-zinc-500">•</span>
            <span className={isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'}>THE SHOE KICKS</span>
            <span className="text-zinc-500">•</span>
            <span>3D CONCEPT ATELIER</span>
            <span className="text-zinc-500">•</span>
            <span>CAMP, PUNE - 411001</span>
            <span className="text-zinc-500">•</span>
            <span className={isDark ? 'text-amber-400' : 'text-red-600 font-bold'}>FOAMING SHOE CLEANER (150ML)</span>
            <span className="text-zinc-500">•</span>
            <span>BESPOKE INDIAN LASTING</span>
            <span className="text-zinc-500">•</span>
            <span>360° CLOSED-CHANNEL GOODYEAR WELT</span>
          </div>
        </div>
      </div>

    </section>
  );
};
