import { describe, it, expect } from 'vitest';
import { CURRENCIES } from '../src/context/CurrencyContext';

describe('Currency and Price Formatting Module', () => {
  it('supports all primary luxury trading currencies', () => {
    expect(CURRENCIES).toHaveProperty('INR');
    expect(CURRENCIES).toHaveProperty('USD');
    expect(CURRENCIES).toHaveProperty('EUR');
    expect(CURRENCIES).toHaveProperty('GBP');
    expect(CURRENCIES).toHaveProperty('JPY');
  });

  it('correctly sets symbols for each currency', () => {
    expect(CURRENCIES.INR.symbol).toBe('₹');
    expect(CURRENCIES.USD.symbol).toBe('$');
    expect(CURRENCIES.EUR.symbol).toBe('€');
    expect(CURRENCIES.GBP.symbol).toBe('£');
    expect(CURRENCIES.JPY.symbol).toBe('¥');
  });

  it('formats USD prices correctly without decimal noise', () => {
    const formatted = CURRENCIES.USD.format(100);
    expect(formatted).toBe('$100');
    expect(CURRENCIES.USD.format(1190)).toBe('$1,190');
  });

  it('formats INR prices with Indian numbering comma placement', () => {
    // 100 USD * 83.5 = 8350 INR
    const formatted = CURRENCIES.INR.format(100);
    expect(formatted).toBe('₹8,350');

    // 1190 USD * 83.5 = 99365 INR
    const formattedShoe = CURRENCIES.INR.format(1190);
    expect(formattedShoe).toBe('₹99,365');
  });

  it('formats EUR and GBP with proper currency symbols', () => {
    const eur = CURRENCIES.EUR.format(100);
    expect(eur).toBe('€92');

    const gbp = CURRENCIES.GBP.format(100);
    expect(gbp).toBe('£79');
  });

  it('handles zero and fractional prices gracefully', () => {
    expect(CURRENCIES.USD.format(0)).toBe('$0');
    expect(CURRENCIES.INR.format(0)).toBe('₹0');
    // Foaming shoe cleaner at $7.17 * 83.5 ~= ₹599
    expect(CURRENCIES.INR.format(7.17)).toBe('₹599');
  });
});
