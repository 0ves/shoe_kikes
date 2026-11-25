import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ShoeColorway } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: ShoeColorway, size: number, width: 'Standard (D)' | 'Wide (EE)', quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  taxUSD: number;
  totalUSD: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  promoCode: string;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  checkoutSuccess: boolean;
  processCheckout: (customerDetails: { name: string; email: string; address: string }) => Promise<boolean>;
  resetCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shoekicks_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shoekicks_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    color: ShoeColorway,
    size: number,
    width: 'Standard (D)' | 'Wide (EE)',
    quantity = 1
  ) => {
    const itemId = `${product.id}-${color.name}-${size}-${width}`;
    setItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        return [...prev, { id: itemId, product, selectedColor: color, selectedSize: size, selectedWidth: width, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalUSD = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountUSD = subtotalUSD * (discountPercent / 100);
  const shippingUSD = subtotalUSD === 0 || subtotalUSD >= 500 ? 0 : 45;
  const taxableBase = Math.max(0, subtotalUSD - discountUSD);
  const taxUSD = taxableBase * 0.08;
  const totalUSD = taxableBase + shippingUSD + taxUSD;

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ATELIER10' || clean === 'VIP10') {
      setAppliedPromo(clean);
      setDiscountPercent(10);
      return { success: true, message: 'VIP Atelier 10% privilege applied.' };
    } else if (clean === 'BESPOKE') {
      setAppliedPromo(clean);
      setDiscountPercent(15);
      return { success: true, message: 'Master Bespoke 15% privilege applied.' };
    }
    return { success: false, message: 'Invalid or expired atelier invitation code.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    setPromoCode('');
  };

  const processCheckout = async (_details: { name: string; email: string; address: string }): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    setCheckoutSuccess(true);
    setItems([]);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e5c07b', '#ffffff', '#222222']
      });
    } catch {
      // safe fallback
    }
    return true;
  };

  const resetCheckout = () => {
    setCheckoutSuccess(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotalUSD,
        discountUSD,
        shippingUSD,
        taxUSD,
        totalUSD,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        promoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        checkoutSuccess,
        processCheckout,
        resetCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
