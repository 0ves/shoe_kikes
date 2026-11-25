import { describe, it, expect } from 'vitest';
import { ShoeKicksApi } from '../src/services/api';

describe('ShoeKicksApi Service Layer', () => {
  it('fetches all products successfully', async () => {
    const products = await ShoeKicksApi.getProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('filters products by specific category', async () => {
    const shoeCare = await ShoeKicksApi.getProducts('shoe-care');
    expect(shoeCare.length).toBeGreaterThan(0);
    expect(shoeCare.every(p => p.category === 'shoe-care')).toBe(true);

    const oxfords = await ShoeKicksApi.getProducts('oxfords');
    expect(oxfords.length).toBeGreaterThan(0);
    expect(oxfords.every(p => p.category === 'oxfords')).toBe(true);
  });

  it('retrieves single product by ID', async () => {
    const cleaner = await ShoeKicksApi.getProductById('sk-cleaner-150');
    expect(cleaner).not.toBeNull();
    expect(cleaner?.id).toBe('sk-cleaner-150');

    const nonExistent = await ShoeKicksApi.getProductById('non-existent-sku');
    expect(nonExistent).toBeNull();
  });

  it('retrieves only featured silhouettes', async () => {
    const featured = await ShoeKicksApi.getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every(p => p.featured)).toBe(true);
  });

  it('searches products with case-insensitive matching', async () => {
    const cleanerResults = await ShoeKicksApi.searchProducts('cleaner');
    expect(cleanerResults.length).toBeGreaterThan(0);
    expect(cleanerResults.some(p => p.id === 'sk-cleaner-150')).toBe(true);

    const oxfordResults = await ShoeKicksApi.searchProducts('OXFORD');
    expect(oxfordResults.length).toBeGreaterThan(0);

    const emptyResults = await ShoeKicksApi.searchProducts('    ');
    expect(emptyResults).toEqual([]);
  });
});
