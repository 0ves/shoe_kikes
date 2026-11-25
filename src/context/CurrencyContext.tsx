import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 83.5,
    format: (val: number) => `₹${Math.round(val * 83.5).toLocaleString('en-IN')}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (val: number) => `$${Math.round(val).toLocaleString()}`
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (val: number) => `€${Math.round(val * 0.92).toLocaleString()}`
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    format: (val: number) => `£${Math.round(val * 0.79).toLocaleString()}`
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    rate: 155.0,
    format: (val: number) => `¥${Math.round(val * 155).toLocaleString()}`
  }
};

interface CurrencyContextType {
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  config: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('shoekicks_currency');
    return (saved as CurrencyCode) || 'INR';
  });

  useEffect(() => {
    localStorage.setItem('shoekicks_currency', currentCurrency);
  }, [currentCurrency]);

  const config = CURRENCIES[currentCurrency];

  const formatPrice = (amountInUSD: number) => {
    return config.format(amountInUSD);
  };

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency: setCurrentCurrency, formatPrice, config }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
