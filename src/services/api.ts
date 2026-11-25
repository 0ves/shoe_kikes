import type { Product, ShoeCategory, BespokeAppointment, CustomerReview } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { REVIEWS } from '../data/stories';

/**
 * SHOE KICKS DATA & API SERVICE LAYER
 * 
 * This service provides an abstracted, promise-based API interface.
 * Currently it operates with instant client-side static mock persistence,
 * perfectly structured to swap with any Headless CMS (Strapi, Sanity, Contentful)
 * or Custom Backend (Node.js/Express, Django, Supabase, Shopify Storefront API).
 */

const SIMULATE_LATENCY = 60; // ms for realistic smooth async transitions

export const ShoeKicksApi = {
  // Products
  async getProducts(category?: ShoeCategory): Promise<Product[]> {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    if (!category || category === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(p => p.category === category);
  },

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    return PRODUCTS.find(p => p.id === id) || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    return PRODUCTS.filter(p => p.featured);
  },

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.craftDetails.upper.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  },

  // Categories
  async getCategories() {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    return CATEGORIES;
  },

  // Customer Reviews
  async getReviews(): Promise<CustomerReview[]> {
    await new Promise(r => setTimeout(r, SIMULATE_LATENCY));
    return REVIEWS;
  },

  // VIP Appointments
  async bookBespokeAppointment(appointment: BespokeAppointment): Promise<{ success: boolean; confirmationCode: string }> {
    await new Promise(r => setTimeout(r, 800));
    const confirmationCode = `SK-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Store in localStorage for demonstration persistence
    try {
      const existing = JSON.parse(localStorage.getItem('shoekicks_appointments') || '[]');
      existing.push({ ...appointment, confirmationCode, createdAt: new Date().toISOString() });
      localStorage.setItem('shoekicks_appointments', JSON.stringify(existing));
    } catch {
      // safe fallback
    }

    return { success: true, confirmationCode };
  },

  // Newsletter Subscription
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise(r => setTimeout(r, 600));
    try {
      const list = JSON.parse(localStorage.getItem('shoekicks_newsletter') || '[]');
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem('shoekicks_newsletter', JSON.stringify(list));
      }
    } catch {
      // safe fallback
    }
    return { success: true, message: 'You have been inducted into the Shoe Kicks Private Salon.' };
  }
};
