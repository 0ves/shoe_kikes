import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BrandLogoProps {
  variant?: 'auto' | 'white' | 'dark' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical' | 'full' | 'icon';
  className?: string;
  showSublabel?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  size = 'md',
  layout = 'horizontal',
  className = '',
  showSublabel = true,
}) => {
  const { isDark } = useTheme();

  // Determine active visual tone
  const effectiveVariant = variant === 'auto' ? (isDark ? 'white' : 'dark') : variant;

  const emblemSrc = {
    white: '/images/brand/the_shoe_kicks_emblem_white.png',
    dark: '/images/brand/the_shoe_kicks_emblem_clean.png',
    gold: '/images/brand/the_shoe_kicks_emblem_gold.png',
  }[effectiveVariant];

  const fullLogoSrc = {
    white: '/images/brand/the_shoe_kicks_logo_white.png',
    dark: '/images/brand/the_shoe_kicks_logo_clean.png',
    gold: '/images/brand/the_shoe_kicks_logo_gold.png',
  }[effectiveVariant];

  // Size mappings
  const emblemHeight = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  }[size];

  const fullHeight = {
    xs: 'h-10 sm:h-12',
    sm: 'h-14 sm:h-16',
    md: 'h-20 sm:h-24',
    lg: 'h-28 sm:h-32',
    xl: 'h-36 sm:h-44',
  }[size];

  // 1. Icon only (Just the exact sneaker illustration with stylized S)
  if (layout === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={emblemSrc}
          alt="The Shoe Kicks Emblem"
          className={`${emblemHeight} w-auto object-contain select-none`}
          loading="eager"
        />
      </div>
    );
  }

  // 2. Full Lockup (Exact match to bottle label: sneaker on top + 'THE SHOE KICKS' below)
  if (layout === 'full' || layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <img
          src={fullLogoSrc}
          alt="The Shoe Kicks — Handcrafted Bespoke Footwear Atelier, Camp, Pune"
          className={`${fullHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          loading="eager"
        />
        {showSublabel && (
          <span className={`text-[9px] font-mono tracking-[0.3em] uppercase block mt-1 transition-colors ${
            isDark ? 'text-[#d4af37]' : 'text-red-600 font-semibold'
          }`}>
            Camp, Pune
          </span>
        )}
      </div>
    );
  }

  // 3. Horizontal Lockup for Navbar (Sneaker emblem + Serif 'THE SHOE KICKS')
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      <img
        src={emblemSrc}
        alt="The Shoe Kicks Emblem"
        className={`${emblemHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        loading="eager"
      />
      <div className="text-left flex flex-col justify-center">
        <span className={`font-serif font-black tracking-[0.16em] uppercase transition-all block leading-tight ${
          size === 'xs' ? 'text-xs' :
          size === 'sm' ? 'text-sm sm:text-base' :
          size === 'md' ? 'text-base sm:text-lg' :
          size === 'lg' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
        } ${
          isDark 
            ? 'text-white group-hover:text-gold-gradient' 
            : 'text-zinc-950 group-hover:text-red-600'
        }`}>
          THE SHOE KICKS
        </span>
        {showSublabel && (
          <span className={`text-[8px] sm:text-[9px] font-mono tracking-[0.3em] uppercase block transition-colors ${
            isDark ? 'text-[#d4af37]' : 'text-red-600 font-bold'
          }`}>
            Haute Atelier • Camp, Pune
          </span>
        )}
      </div>
    </div>
  );
};
