/**
 * RAZORPAY PAYMENT GATEWAY SERVICE
 * Official Integration for The Shoe Kicks™
 * Flagship Atelier: Kolsa Lane, MG Road, Camp, Pune - 411001
 * Concierge: +91 73500 51590
 */

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface RazorpayCustomerDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  amount: number;
  currency: string;
  customer: RazorpayCustomerDetails;
  timestamp: string;
}

export interface RazorpayCheckoutConfig {
  amountInINR: number; // e.g. 599 for ₹599
  orderTitle: string;
  description: string;
  customer: RazorpayCustomerDetails;
  notes?: Record<string, string>;
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}

// Default standard test key or custom environment key
const DEFAULT_KEY_ID = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_ShoeKicksPune';

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay Checkout script from CDN.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Get active Razorpay key (prioritizing custom key stored in localStorage for live testing)
 */
export const getActiveRazorpayKey = (): string => {
  try {
    const saved = localStorage.getItem('shoekicks_razorpay_key');
    if (saved && saved.trim()) return saved.trim();
  } catch {
    // fallback
  }
  return DEFAULT_KEY_ID;
};

/**
 * Set custom Razorpay key for store owner
 */
export const setActiveRazorpayKey = (key: string): void => {
  try {
    if (key.trim()) {
      localStorage.setItem('shoekicks_razorpay_key', key.trim());
    } else {
      localStorage.removeItem('shoekicks_razorpay_key');
    }
  } catch {
    // fallback
  }
};

/**
 * Launch the official Razorpay checkout modal
 */
export const launchRazorpayPayment = async (config: RazorpayCheckoutConfig): Promise<boolean> => {
  const isLoaded = await loadRazorpayScript();
  const key = getActiveRazorpayKey();

  if (!isLoaded || !window.Razorpay) {
    console.warn('Razorpay SDK not available. Using fallback modal.');
    return false;
  }

  try {
    const options = {
      key: key,
      amount: Math.round(config.amountInINR * 100), // amount in paise
      currency: 'INR',
      name: 'The Shoe Kicks™',
      description: config.description || 'Bespoke Footwear & Foaming Cleaner',
      image: 'https://theshoekicks.com/images/cleaner/cleaner-studio-hero.jpg',
      handler: function (response: any) {
        const successData: RazorpaySuccessResponse = {
          razorpay_payment_id: response.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 11)}`,
          razorpay_order_id: response.razorpay_order_id || `order_${Math.random().toString(36).substring(2, 11)}`,
          razorpay_signature: response.razorpay_signature,
          amount: config.amountInINR,
          currency: 'INR',
          customer: config.customer,
          timestamp: new Date().toISOString()
        };
        config.onSuccess(successData);
      },
      prefill: {
        name: config.customer.name,
        email: config.customer.email,
        contact: config.customer.phone
      },
      notes: {
        address: config.customer.address || 'Kolsa Lane, Camp, Pune - 411001',
        merchant: 'The Shoe Kicks Haute Atelier',
        atelierContact: '+91 73500 51590',
        ...config.notes
      },
      theme: {
        color: '#0d0d12' // Luxury obsidian dark with gold accents
      },
      modal: {
        ondismiss: function () {
          config.onDismiss?.();
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Razorpay payment failed:', response.error);
      config.onFailure?.(response.error);
    });

    rzp.open();
    return true;
  } catch (err) {
    console.error('Error invoking Razorpay Checkout:', err);
    config.onFailure?.(err);
    return false;
  }
};
