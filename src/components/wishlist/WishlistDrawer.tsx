import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onOpenQuickView
}) => {
  const { isWishlistOpen, closeWishlist, wishlistProducts, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: Product) => {
    addToCart(product, product.colors[0], product.sizes[2] || 9.5, 'Standard (D)', 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeWishlist}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-2 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0c0c10] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
              <h3 className="text-lg font-serif font-medium text-white">
                Saved Masterpieces
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                ({wishlistProducts.length})
              </span>
            </div>

            <button
              onClick={closeWishlist}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {wishlistProducts.length > 0 ? (
              <div className="space-y-4">
                {wishlistProducts.map(product => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-[#14141a] border border-white/5 flex gap-4 items-center group"
                  >
                    <div 
                      onClick={() => {
                        closeWishlist();
                        onOpenQuickView(product);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.images.hero}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h4
                        onClick={() => {
                          closeWishlist();
                          onOpenQuickView(product);
                        }}
                        className="text-sm font-serif font-medium text-white hover:text-[#d4af37] cursor-pointer truncate"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {product.craftDetails.upper}
                      </p>
                      <div className="text-xs font-semibold text-white mt-1">
                        {formatPrice(product.price)}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="px-3 py-1 rounded-lg bg-gold-gradient text-black font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 ml-auto"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-base font-serif text-zinc-300">Your wishlist is empty.</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Click the heart icon on any shoe silhouette to preserve it here for later contemplation.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#0a0a0d] border-t border-white/10">
            <button
              onClick={closeWishlist}
              className="w-full py-3.5 rounded-xl glass-panel text-zinc-200 hover:text-white text-xs uppercase tracking-wider transition-all"
            >
              Continue Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
