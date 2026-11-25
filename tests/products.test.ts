import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '../src/data/products';
import { CATEGORIES } from '../src/data/categories';

describe('Products Catalog & Data Integrity', () => {
  it('contains products and validates catalog array', () => {
    expect(Array.isArray(PRODUCTS)).toBe(true);
    expect(PRODUCTS.length).toBeGreaterThan(0);
  });

  it('ensures all product IDs are unique across the catalog', () => {
    const ids = PRODUCTS.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('verifies that Foaming Shoe Cleaner is top product with correct metadata', () => {
    const cleaner = PRODUCTS.find(p => p.id === 'sk-cleaner-150');
    expect(cleaner).toBeDefined();
    expect(cleaner?.name).toContain('Foaming Shoe Cleaner');
    expect(cleaner?.category).toBe('shoe-care');
    expect(cleaner?.price).toBe(7.17);
    expect(cleaner?.inStock).toBe(true);
    expect(cleaner?.featured).toBe(true);
    expect(cleaner?.images.hero).toBeDefined();
  });

  it('verifies that every product has required luxury specifications', () => {
    for (const p of PRODUCTS) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(typeof p.price).toBe('number');
      expect(p.price).toBeGreaterThan(0);
      expect(p.rating).toBeGreaterThanOrEqual(4.5);
      expect(Array.isArray(p.colors)).toBe(true);
      expect(p.colors.length).toBeGreaterThan(0);
      expect(Array.isArray(p.sizes)).toBe(true);
      expect(p.sizes.length).toBeGreaterThan(0);
      expect(p.images).toHaveProperty('hero');
      expect(p.images).toHaveProperty('profile');
      expect(p.craftDetails).toBeDefined();
      expect(p.craftDetails.upper).toBeTruthy();
      expect(p.craftDetails.sole).toBeTruthy();
    }
  });

  it('verifies all product categories map to valid recognized categories', () => {
    const categoryIds = CATEGORIES.map(c => c.id);
    for (const p of PRODUCTS) {
      expect(categoryIds).toContain(p.category);
    }
  });
});
