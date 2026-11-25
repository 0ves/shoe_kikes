import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';
import type { CurrencyCode } from '../../types';
import { ShoppingBag, Heart, Menu, X, Globe, Sun, Moon, Phone } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const { totalCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { currentCurrency, setCurrency } = useCurrency();
  const { toggleTheme, isDark } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', path: '/collection' },
    { label: 'Atelier', path: '/boutique' },
    { label: 'Craft', path: '/craftsmanship' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      {/* Main Sticky Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#08080a]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5'
              : 'bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2.5'
            : isDark
            ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3.5'
            : 'bg-white/85 backdrop-blur-md border-b border-zinc-200/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (md and above) */}
        <div className="hidden md:flex items-center justify-between">
          
          {/* 1. Left: Brand Identity (Authentic Logo Matching First Reference Image) */}
          <Link to="/" className="flex items-center group select-none">
            <BrandLogo size="sm" layout="horizontal" />
          </Link>

          {/* 2. Center: Streamlined Minimalist Navigation Links */}
          <nav className="flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 ${
                    isActive
                      ? isDark ? 'text-amber-400 font-bold' : 'text-red-600 font-bold'
                      : isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-red-600'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    isActive
                      ? isDark ? 'w-full bg-[#d4af37]' : 'w-full bg-red-600'
                      : isDark ? 'w-0 group-hover:w-full bg-[#d4af37]' : 'w-0 group-hover:w-full bg-red-600'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Streamlined Utility Controls */}
          <div className="flex items-center gap-2">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                }`}
                title="Select Currency"
              >
                <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-[#d4af37]' : 'text-red-600'}`} />
                <span>{currentCurrency === 'INR' ? '₹ INR' : currentCurrency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className={`absolute top-full right-0 mt-2 w-32 rounded-xl border shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-[#121217] border-white/10' : 'bg-white border-zinc-200 shadow-xl'
                }`}>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs font-mono flex items-center justify-between transition-colors ${
                        currentCurrency === code
                          ? isDark
                            ? 'text-[#d4af37] font-bold bg-white/5'
                            : 'text-red-600 font-bold bg-red-50'
                          : isDark
                          ? 'text-zinc-300 hover:bg-white/10'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span>{code === 'INR' ? '₹ INR' : code}</span>
                      <span className="text-zinc-400">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              aria-label="Wishlist"
              className={`relative p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border-white/10'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  isDark ? 'bg-[#d4af37] text-black' : 'bg-red-600 text-white'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className="relative px-3.5 py-2 rounded-xl bg-gold-gradient font-semibold text-xs flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono text-xs">{totalCount}</span>
            </button>

            {/* Theme Toggle (Sun / Moon) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-800 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>

        </div>

        {/* MOBILE VIEW NAVBAR (Streamlined: Left Hamburger + Center Logo + Right Theme & Bag) */}
        <div className="md:hidden flex items-center justify-between w-full">
          
          {/* Left: Hamburger menu */}
          <div className="flex items-center gap-1.5 flex-1 justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 text-zinc-300 hover:text-white border-white/10'
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200'
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <Link to="/" className="flex items-center justify-center select-none flex-shrink-0">
            <BrandLogo size="xs" layout="horizontal" showSublabel={false} />
          </Link>

          {/* Right: Wishlist, Theme Toggle & Bag */}
          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <button
              onClick={openWishlist}
              className={`relative p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 text-zinc-300 hover:text-white border-white/10'
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200'
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  isDark ? 'bg-[#d4af37] text-black' : 'bg-red-600 text-white'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-white/5 text-amber-300 border-white/10'
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200'
              }`}
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={openCart}
              className="relative p-2 rounded-xl bg-gold-gradient font-semibold text-xs flex items-center justify-center shadow-md"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-3 pt-3 border-t space-y-2.5 pb-3 backdrop-blur-2xl rounded-2xl p-4 border animate-in slide-in-from-top-2 shadow-2xl ${
            isDark ? 'bg-[#0d0d12]/95 border-white/10' : 'bg-white/95 border-zinc-200'
          }`}>
            {[
              { label: 'Collection', path: '/collection' },
              { label: 'Camp Pune Atelier', path: '/boutique' },
              { label: 'Craftsmanship', path: '/craftsmanship' },
              { label: 'Our Story', path: '/story' },
              { label: 'Contact & Atelier', path: '/contact' }
            ].map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium tracking-wider uppercase py-1.5 transition-colors ${
                  location.pathname === link.path
                    ? isDark ? 'text-amber-400 font-bold' : 'text-red-600 font-bold'
                    : isDark ? 'text-zinc-200 hover:text-[#d4af37]' : 'text-zinc-800 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Direct Atelier Details */}
            <div className="pt-2.5 border-t border-white/10 dark:border-white/10 space-y-1">
              <a
                href="tel:+917350051590"
                className={`flex items-center gap-2 py-1 text-xs font-mono font-bold ${
                  isDark ? 'text-amber-400' : 'text-red-600'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store: +91 73500 51590</span>
              </a>
              <div className="text-[11px] text-zinc-400 font-mono">
                📍 387 Kolsa Lane, MG Road, Camp, Pune - 411001
              </div>
            </div>

            {/* Currency selector inside mobile menu */}
            <div className="pt-2.5 border-t border-white/10 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Currency:</span>
              <div className="flex items-center gap-1.5">
                {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 rounded text-xs font-mono ${
                      currentCurrency === c
                        ? isDark ? 'bg-[#d4af37] text-black font-bold' : 'bg-red-600 text-white font-bold'
                        : isDark ? 'bg-white/5 text-zinc-400' : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </header>
  );
};
