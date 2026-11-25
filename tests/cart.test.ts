import { describe, it, expect } from 'vitest';

describe('Cart Calculations & Promo Business Logic', () => {
  // Pure helper functions replicating CartContext mathematical rules
  const calculateCartTotals = (
    items: Array<{ price: number; quantity: number }>,
    discountPercent = 0
  ) => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountUSD = subtotalUSD * (discountPercent / 100);
    const shippingUSD = subtotalUSD === 0 || subtotalUSD >= 500 ? 0 : 45;
    const taxableBase = Math.max(0, subtotalUSD - discountUSD);
    const taxUSD = taxableBase * 0.08;
    const totalUSD = taxableBase + shippingUSD + taxUSD;

    return { totalCount, subtotalUSD, discountUSD, shippingUSD, taxableBase, taxUSD, totalUSD };
  };

  const validatePromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ATELIER10' || clean === 'VIP10' || clean === 'ROYAL10') {
      return { success: true, discountPercent: 10 };
    }
    if (clean === 'BESPOKE') {
      return { success: true, discountPercent: 15 };
    }
    return { success: false, discountPercent: 0 };
  };

  it('computes empty cart totals correctly', () => {
    const totals = calculateCartTotals([]);
    expect(totals.totalCount).toBe(0);
    expect(totals.subtotalUSD).toBe(0);
    expect(totals.shippingUSD).toBe(0);
    expect(totals.taxUSD).toBe(0);
    expect(totals.totalUSD).toBe(0);
  });

  it('applies standard shipping for orders under $500 threshold', () => {
    // 2 x Cleaner at $7.17 = $14.34
    const totals = calculateCartTotals([{ price: 7.17, quantity: 2 }]);
    expect(totals.subtotalUSD).toBeCloseTo(14.34, 2);
    expect(totals.shippingUSD).toBe(45);
    expect(totals.totalUSD).toBeGreaterThan(14.34 + 45);
  });

  it('applies complimentary private courier for orders exceeding $500 threshold', () => {
    // Oxford shoe at $1190
    const totals = calculateCartTotals([{ price: 1190, quantity: 1 }]);
    expect(totals.shippingUSD).toBe(0);
    expect(totals.taxUSD).toBeCloseTo(1190 * 0.08, 2);
    expect(totals.totalUSD).toBeCloseTo(1190 + 1190 * 0.08, 2);
  });

  it('validates promo codes accurately', () => {
    expect(validatePromoCode('atelier10')).toEqual({ success: true, discountPercent: 10 });
    expect(validatePromoCode(' ROYAL10 ')).toEqual({ success: true, discountPercent: 10 });
    expect(validatePromoCode('bespoke')).toEqual({ success: true, discountPercent: 15 });
    expect(validatePromoCode('INVALID_CODE')).toEqual({ success: false, discountPercent: 0 });
  });

  it('calculates discounted totals and taxable base correctly', () => {
    // Subtotal $1000 with 10% discount
    const totals = calculateCartTotals([{ price: 1000, quantity: 1 }], 10);
    expect(totals.subtotalUSD).toBe(1000);
    expect(totals.discountUSD).toBe(100);
    expect(totals.taxableBase).toBe(900);
    expect(totals.shippingUSD).toBe(0);
    expect(totals.taxUSD).toBe(900 * 0.08); // 72
    expect(totals.totalUSD).toBe(972);
  });

  it('constructs deterministic cart item IDs from SKU attributes', () => {
    const generateItemId = (sku: string, color: string, size: number, width: string) =>
      `${sku}-${color}-${size}-${width}`;

    const id1 = generateItemId('sk-cleaner-150', 'Solo Bottle', 150, 'Standard (D)');
    expect(id1).toBe('sk-cleaner-150-Solo Bottle-150-Standard (D)');

    const id2 = generateItemId('sk-oxford-01', 'Obsidian Black', 10, 'Wide (EE)');
    expect(id2).toBe('sk-oxford-01-Obsidian Black-10-Wide (EE)');
  });
});
