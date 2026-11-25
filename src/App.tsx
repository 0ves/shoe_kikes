import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import type { Product } from './types';
import { PRODUCTS } from './data/products';
import { ShoeKicksApi } from './services/api';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { HomePage } from './pages/HomePage';

// Route-level code splitting for secondary pages to optimize initial bundle size & load performance
const CollectionPage = lazy(() => import('./pages/CollectionPage').then(m => ({ default: m.CollectionPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const BoutiquePage = lazy(() => import('./pages/BoutiquePage').then(m => ({ default: m.BoutiquePage })));
const CraftsmanshipPage = lazy(() => import('./pages/CraftsmanshipPage').then(m => ({ default: m.CraftsmanshipPage })));
const StoryPage = lazy(() => import('./pages/StoryPage').then(m => ({ default: m.StoryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

import { QuickViewModal } from './components/showcase/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { SearchModal } from './components/search/SearchModal';

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
    <div className="w-10 h-10 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-4" />
    <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400">
      The Shoe Kicks • Haute Atelier
    </span>
  </div>
);

const ShoeStoreContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load products (service layer for future CMS/backend integration)
  useEffect(() => {
    async function loadData() {
      const data = await ShoeKicksApi.getProducts();
      setProducts(data);
    }
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen transition-colors duration-500 flex flex-col font-sans">
        {/* 1. Header Navigation with Announcement Bar & Multi-Page Links */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* 2. Page Viewport with Routing & Dynamic Suspense */}
        <div className="flex-grow">
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    products={products}
                    onOpenQuickView={(p) => setQuickViewProduct(p)}
                  />
                }
              />
              <Route
                path="/collection"
                element={
                  <CollectionPage
                    products={products}
                    onOpenQuickView={(p) => setQuickViewProduct(p)}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetailPage
                    products={products}
                    onOpenQuickView={(p) => setQuickViewProduct(p)}
                  />
                }
              />
              <Route path="/boutique" element={<BoutiquePage />} />
              <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>

        {/* 3. Global Luxury Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

        <CartDrawer />

        <WishlistDrawer
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />
      </div>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <ShoeStoreContent />
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
