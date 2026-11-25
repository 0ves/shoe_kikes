import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../../types';
import { ShoeKicksApi } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    let active = true;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await ShoeKicksApi.searchProducts(query);
      if (active) {
        setResults(res);
        setIsSearching(false);
      }
    }, 150);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (!isOpen) return null;

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  const displayedResults = query.trim() ? results : [];

  const quickTags = ['Imperial Oxford', 'Vitello Sneaker', 'Chelsea Boot', 'Goodyear Welt', 'Patina Loafer'];

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c0c10] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by silhouette, leather, or construction..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="text-xs uppercase font-mono tracking-wider text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-3 bg-[#111116] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d4af37]" /> Popular:
          </span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {isSearching ? (
            <div className="py-12 text-center text-xs text-zinc-500 font-mono">
              Searching the Shoe Kicks atelier archive...
            </div>
          ) : displayedResults.length > 0 ? (
            displayedResults.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  handleClose();
                }}
                className="p-3 rounded-2xl bg-[#14141a] hover:bg-[#1b1b22] border border-white/5 hover:border-[#d4af37]/40 transition-all flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                  <img src={product.images.hero} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-serif font-medium text-white group-hover:text-[#d4af37] transition-colors truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-serif font-bold text-[#e6c989] ml-2">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light truncate mt-0.5">
                    {product.craftDetails.upper} • {product.craftDetails.construction}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : query.trim() ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-serif text-zinc-400">No silhouettes matched "{query}".</p>
              <p className="text-xs text-zinc-600">Try searching "Oxford", "Sneaker", "Calfskin", or "Loafer".</p>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-zinc-500 font-light">
              Type to begin searching our 2026 Bespoke & Ready-to-Wear reserve.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
