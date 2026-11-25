export type ShoeCategory = 
  | 'all' 
  | 'oxfords' 
  | 'loafers' 
  | 'chelsea-boots' 
  | 'luxury-sneakers' 
  | 'limited-edition'
  | 'shoe-care';

export interface ShoeColorway {
  name: string;
  hex: string;
  material: string;
  finish: string;
  image?: string;
}

export interface Product {
  id: string;
  serialNumber?: string; // e.g. "REF. 01 / OXFORD"
  name: string;
  tagline: string;
  category: ShoeCategory;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  notes?: {
    head: string; // Leather & Tannage
    heart: string; // Last & Internal Cushioning
    base: string; // Welt & Outsole Structure
  };
  craftDetails: {
    upper: string;
    lining: string;
    sole: string;
    construction: string; // e.g. "Goodyear Welted 360°"
    origin: string; // e.g. "Handcrafted in Marche, Italy"
    craftHours: number;
  };
  features: string[];
  colors: ShoeColorway[];
  sizes: number[]; // US sizes e.g. [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13]
  widths: ('Standard (D)' | 'Wide (EE)')[];
  images: {
    hero: string;
    profile: string;
    top: string;
    sole: string;
    detail: string;
  };
  badge?: 'MASTERPIECE' | 'NEW ATELIER' | 'BESTSELLER' | 'LIMITED 50 PAIRS';
  inStock: boolean;
  featured?: boolean;
  heroFloating?: {
    rotation: string;
    scale: number;
    badgeText: string;
  };
}

export interface CategoryItem {
  id: ShoeCategory;
  name: string;
  shortName: string;
  count: number;
  iconName: string;
  description: string;
}

export interface CartItem {
  id: string; // unique item id (product id + size + width + color)
  product: Product;
  selectedColor: ShoeColorway;
  selectedSize: number;
  selectedWidth: 'Standard (D)' | 'Wide (EE)';
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier against USD base
  format: (amount: number) => string;
}

export interface BespokeAppointment {
  fullName: string;
  email: string;
  phone: string;
  salon: 'Camp Flagship Atelier (Pune)' | 'Milan Flagship' | 'Parisian Atelier' | 'London Mayfair' | 'New York Madison' | 'Virtual 3D Fitting';
  preferredDate: string;
  preferredTime: string;
  footwearInterest: string;
  customRequests?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}
