import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface GoldBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const GoldBadge: React.FC<GoldBadgeProps> = ({
  size = 'md',
  label = 'SK',
  className = '',
  interactive = false,
  onClick
}) => {
  const { isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg'
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full ${sizeClasses[size]} select-none transition-all duration-500 group ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
    >
      {/* Outer ambient glow */}
      <div className={`absolute inset-0 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity ${
        isDark
          ? 'bg-gradient-to-tr from-[#d4af37]/20 via-[#c5a059]/10 to-transparent'
          : 'bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-transparent'
      }`} />

      {/* Double ring border */}
      <div className={`absolute inset-0 rounded-full border transition-colors ${
        isDark
          ? 'border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
          : 'border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.25)]'
      }`} />
      <div className={`absolute inset-[3px] rounded-full border ${
        isDark ? 'border-[#d4af37]/20' : 'border-red-600/25'
      }`} />

      {/* Inner disc background */}
      <div className={`absolute inset-[4px] rounded-full flex items-center justify-center overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-[#1c1b18] via-[#0d0d0f] to-[#141310]'
          : 'bg-gradient-to-b from-[#ffffff] via-[#fef2f2] to-[#fee2e2]'
      }`}>
        {/* Subtle radial shine */}
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.25),transparent_60%)]'
            : 'bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.2),transparent_60%)]'
        }`} />
      </div>

      {/* Monogram or text */}
      <span className={`relative z-10 font-serif font-bold tracking-widest group-hover:scale-110 transition-transform ${
        isDark
          ? 'text-[#e8caa4] text-gold-gradient'
          : 'text-red-600 font-extrabold'
      }`}>
        {label}
      </span>
    </div>
  );
};
