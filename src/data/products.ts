import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sk-cleaner-150',
    serialNumber: 'FLAGSHIP NO. 01 / CARE',
    name: 'The Shoe Kicks Foaming Shoe Cleaner (150ml)',
    tagline: 'Deep Self-Foaming Cleaning Solution for Suede, Leather & Sneakers',
    category: 'shoe-care',
    price: 7.17,
    compareAtPrice: 10.76,
    rating: 4.99,
    reviewsCount: 342,
    description: 'The official The Shoe Kicks self-foaming deep cleaner formulated in Camp, Pune. Engineered specifically for all footwear materials: suede, nubuck, patent leather, synthetics, and canvas. Instant dense self-foaming solution lifts road dirt, grease, and oxidation without water soaking, preserving delicate leather oils and Goodyear welt longevity.',
    notes: {
      head: 'Active Self-Foaming Surfactant Complex (No water required)',
      heart: 'pH-Neutral Leather-Safe Cleansers (Safe for Suede & Nubuck)',
      base: 'Anti-Residue Fast-Drying Lift Formulation'
    },
    craftDetails: {
      upper: '150 ML Ergonomic Cylinder with High-Pressure Foaming Pump',
      lining: 'Non-Toxic, Biodegradable Water-Free Formula',
      sole: 'Certified Suede, Nubuck, Leather, Patent & Canvas Safe',
      construction: 'Self-Foaming Instant Aeration Chamber',
      origin: 'Formulated for The Shoe Kicks Atelier, Camp, Pune',
      craftHours: 1
    },
    features: [
      'Instant self-foaming pump — creates dense, airy cleaning foam on contact without water basin dilution',
      'Gentle & safe across all footwear materials: full-grain leather, suede, nubuck, canvas, knit, and rubber midsoles',
      'Tested and recommended by master cobblers at The Shoe Kicks Camp Pune salon',
      'Directions: 1. Remove laces. 2. Apply foam. 3. Brush in gentle circular motion. 4. Wipe dry with microfiber cloth',
      'Direct Pune atelier concierge support & refill inquiries: +91 73500 51590 (Instagram @shoekickss7)'
    ],
    colors: [
      { name: '150ml Solo Bottle', hex: '#111116', material: 'Foam Cleaner (150ml)', finish: 'Signature Pump Dispenser' },
      { name: 'Care Kit (Bottle + Brush + Cloth)', hex: '#d4af37', material: 'Full Atelier Care Set', finish: 'Cleaner + Horsehair Brush + Cloth' }
    ],
    sizes: [150],
    widths: ['Standard (D)'],
    images: {
      hero: '/images/cleaner/cleaner-luxury-gradient.jpg',
      profile: '/images/cleaner/cleaner-colorblock-pop.jpg',
      top: '/images/cleaner/cleaner-studio-hero.jpg',
      sole: '/images/cleaner/cleaner-action-foam.jpg',
      detail: '/images/cleaner/cleaner-lifestyle-kit.jpg'
    },
    badge: 'BESTSELLER',
    inStock: true,
    featured: true
  },
  {
    id: 'sk-oxford-01',
    serialNumber: 'NO. 02 / OXFORD',
    name: 'The Imperial Obsidian Oxford',
    tagline: 'The Pinnacle of Formal Bespoke Elegance',
    category: 'oxfords',
    price: 1190,
    compareAtPrice: 1450,
    rating: 4.98,
    reviewsCount: 142,
    description: 'Sculpted from unbroken single-piece French boxcalf from Tannery D’Annonay. Features a hand-beveled fiddleback waist, mirror-polished cap-toe, and channel-stitched oak-bark tanned leather soles with recessed brass toe-plates.',
    notes: {
      head: 'French Boxcalf Tannery D’Annonay (1.4mm)',
      heart: '5mm Granulated Portuguese Virgin Cork Bed',
      base: 'J. & F.J. Baker Oak-Bark Pit-Tanned Sole'
    },
    craftDetails: {
      upper: 'Full-Grain French Boxcalf Leather (1.4mm)',
      lining: 'Natural Vegetable-Tanned Drum-Dyed Calfskin',
      sole: 'J. & F.J. Baker Oak-Bark Tanned Leather Sole',
      construction: '360° Hand-Welted Goodyear Construction',
      origin: 'Bespoke Atelier, Marche, Italy',
      craftHours: 42
    },
    features: [
      'Mirror-glazed toe cap burnished with champagne and organic beeswax',
      'Hand-carved fiddleback bevelled waist for supreme arch contouring',
      'Solid brass toe-taps flush-mounted with hand-peened screws',
      'Includes pair of cedar lasting shoe trees and bespoke travel dust bags'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0c', material: 'French Boxcalf', finish: 'High Glaze Mirror' },
      { name: 'Tuscan Cognac', hex: '#633917', material: 'Hand-Patinated Calf', finish: 'Antique Sunburst' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    widths: ['Standard (D)', 'Wide (EE)'],
    images: {
      hero: '/images/shoes/aesthetic-oxford-noir.jpg',
      profile: '/images/shoes/aesthetic-oxford-noir.jpg',
      top: '/images/shoes/aesthetic-oxford-noir.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-oxford-cognac.jpg'
    },
    badge: 'MASTERPIECE',
    inStock: true,
    featured: true
  },
  {
    id: 'sk-oxford-02',
    serialNumber: 'NO. 02 / PATINA',
    name: 'The Tuscan Patina Oxford',
    tagline: 'Artisanal Hand-Burnished Cap-Toe',
    category: 'oxfords',
    price: 980,
    compareAtPrice: 1250,
    rating: 4.94,
    reviewsCount: 88,
    description: 'Each pair undergoes a 7-stage hand-patination process using organic alcohol and mineral pigments in our Florence workshop. Subtle gradient hues transition seamlessly from rich amber to deep espresso at the chiseled toe.',
    notes: {
      head: 'Florence Hand-Dyed Crust Boxcalf',
      heart: 'Orthopedic Tempered Steel Arch Shank',
      base: 'Closed-Channel Double Leather Welted Sole'
    },
    craftDetails: {
      upper: 'Crust Calfskin Hand-Patinated in Florence',
      lining: 'Butter-Soft Italian Vachetta',
      sole: 'Double Oak-Bark Tanned Leather with Rubber Inlay',
      construction: 'Goodyear Welted with Closed-Channel Stitching',
      origin: 'Florence Atelier, Italy',
      craftHours: 36
    },
    features: [
      '7-stage hand-dyed patina unique to every single customer',
      'Closed-channel bottom stitching protected from ground abrasions',
      'Orthopedic arch-supporting tempered steel shank',
      'Waxed braided cotton laces with solid brass aglets'
    ],
    colors: [
      { name: 'Tuscan Cognac', hex: '#6b3d1b', material: 'Patinated Crust Leather', finish: 'Ombré Patina' },
      { name: 'Burgundy Cordovan', hex: '#4a1525', material: 'Bespoke Patina', finish: 'Deep Wine Glaze' }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)'],
    images: {
      hero: '/images/shoes/aesthetic-oxford-cognac.jpg',
      profile: '/images/shoes/aesthetic-oxford-cognac.jpg',
      top: '/images/shoes/aesthetic-oxford-cognac.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-oxford-noir.jpg'
    },
    badge: 'BESTSELLER',
    inStock: true,
    featured: true
  },
  {
    id: 'sk-chelsea-01',
    serialNumber: 'NO. 03 / CHELSEA',
    name: 'The Sovereign Chelsea Boot',
    tagline: 'Architectural Seamless Silhouette',
    category: 'chelsea-boots',
    price: 890,
    compareAtPrice: 1050,
    rating: 4.96,
    reviewsCount: 119,
    description: 'Cut from an unbroken whole piece of French calfskin to eliminate side seams. Features a chiseled almond toe, reinforced elastic side gussets woven in England, and a seamless stacked leather Cuban heel.',
    notes: {
      head: 'Seamless Single-Piece French Boxcalf',
      heart: 'English Woven High-Tension Gore Panels',
      base: 'Stacked Leather Heel with Vibram Inlay'
    },
    craftDetails: {
      upper: 'Seamless Single-Piece Italian Boxcalf',
      lining: 'Breathable Glove-Tanned Calfskin',
      sole: 'Stacked Leather with Vibram Rubber Forepart',
      construction: 'Hand-Stitched Blake-Rapid Welt',
      origin: 'Civitanova Marche, Italy',
      craftHours: 32
    },
    features: [
      'Seamless wholecut upper design for sleek pant drape',
      'Heavy-duty English woven elasticated gore panels',
      'Solid brass interior pull tabs for effortless slip-on',
      'Natural cork filler molds naturally to foot contours'
    ],
    colors: [
      { name: 'Obsidian Noir', hex: '#0d0d0f', material: 'Smooth Vitello Calf', finish: 'Satin Luster' },
      { name: 'Espresso Suede', hex: '#3d2b1f', material: 'Weatherproof Suede', finish: 'Velvet Nap' }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    widths: ['Standard (D)', 'Wide (EE)'],
    images: {
      hero: '/images/shoes/aesthetic-chelsea-noir.jpg',
      profile: '/images/shoes/aesthetic-chelsea-noir.jpg',
      top: '/images/shoes/aesthetic-chelsea-noir.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-chelsea-suede.jpg'
    },
    badge: 'NEW ATELIER',
    inStock: true,
    featured: true
  },
  {
    id: 'sk-chelsea-02',
    serialNumber: 'NO. 04 / SUEDE',
    name: 'The Tuscan Suede Chelsea',
    tagline: 'Water-Repellent Italian Reverse Suede',
    category: 'chelsea-boots',
    price: 840,
    compareAtPrice: 1020,
    rating: 4.91,
    reviewsCount: 64,
    description: 'Treated with hydrophobic nano-coating during tanning to repel moisture and urban elements. Sits atop an authentic English Dainite studded rubber sole for all-season traction.',
    notes: {
      head: 'Hydrophobic Tuscan Reverse Split Suede',
      heart: 'Drum-Dyed Supple Italian Vachetta',
      base: 'British Dainite Studded Rubber Sole'
    },
    craftDetails: {
      upper: 'Tuscan Reverse Split Suede with Nano-Shield',
      lining: 'Supple Drum-Dyed Vachetta',
      sole: 'Authentic British Dainite Studded Rubber',
      construction: 'Goodyear Storm Welt 360°',
      origin: 'Montegranaro, Italy',
      craftHours: 30
    },
    features: [
      'Hydrophobic suede treatment tested against wet rain and snow',
      'Dainite all-weather studded rubber sole provides discreet grip',
      'Storm welt stitch keeps moisture from penetrating bottom cavity'
    ],
    colors: [
      { name: 'Charcoal Suede', hex: '#26262b', material: 'Treated Suede', finish: 'Matte' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)'],
    images: {
      hero: '/images/shoes/aesthetic-chelsea-suede.jpg',
      profile: '/images/shoes/aesthetic-chelsea-suede.jpg',
      top: '/images/shoes/aesthetic-chelsea-suede.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-chelsea-noir.jpg'
    },
    inStock: true,
    featured: false
  },
  {
    id: 'sk-loafer-01',
    serialNumber: 'NO. 05 / LOAFER',
    name: 'The Aurelius Horsebit Loafer',
    tagline: 'Timeless Milanese Riviera Aristocracy',
    category: 'loafers',
    price: 740,
    compareAtPrice: 880,
    rating: 4.97,
    reviewsCount: 96,
    description: 'Crafted on our relaxed chisel last with an ultra-flexible sacchetto construction. Accented with custom 18K pale gold electroplated solid brass equestrian bit hardware that never tarnishes.',
    notes: {
      head: 'French D’Annonay Glazed Boxcalf',
      heart: 'Sacchetto Bologna Glove Construction',
      base: 'Bevelled Waist Flexible Leather Sole'
    },
    craftDetails: {
      upper: 'Hand-Glazed French Boxcalf',
      lining: 'Unlined Vamp with Calf-Lined Counter',
      sole: 'Ultra-Flexible Vegetable-Tanned Sole with Rubber Tap',
      construction: 'Italian Sacchetto (Bologna Construction)',
      origin: 'Milan Atelier, Italy',
      craftHours: 28
    },
    features: [
      'Solid 18K pale gold plated solid brass horsebit hardware',
      'Sacchetto construction wraps foot like a glove from day one',
      'No break-in period required, pliable natural glove leather'
    ],
    colors: [
      { name: 'Obsidian Lacquer', hex: '#0c0c0e', material: 'French Boxcalf', finish: 'Deep Polish' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    widths: ['Standard (D)', 'Wide (EE)'],
    images: {
      hero: '/images/shoes/loafer-luxury-gradient.jpg',
      profile: '/images/shoes/aesthetic-loafer-noir.jpg',
      top: '/images/shoes/aesthetic-loafer-brown.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-loafer-brown.jpg'
    },
    badge: 'BESTSELLER',
    inStock: true,
    featured: true
  },
  {
    id: 'sk-monk-01',
    serialNumber: 'NO. 06 / MONKSTRAP',
    name: 'The Vendôme Double Monk-Strap',
    tagline: 'Sartorial Power with Hand-Chiseled Buckles',
    category: 'oxfords',
    price: 920,
    compareAtPrice: 1150,
    rating: 4.95,
    reviewsCount: 84,
    description: 'Command the boardroom and gallery alike. The Vendôme features twin solid brass roller buckles, hand-burnished toe bloom, and sweeping cutaway quarters that hug the ankle securely.',
    notes: {
      head: 'French Patina Boxcalf & Brass Roller Buckles',
      heart: 'Cork-Filled Memory Imprint Cavity',
      base: '360° Goodyear Storm Welted Sole'
    },
    craftDetails: {
      upper: 'French D’Annonay Boxcalf',
      lining: 'Full Glove Leather Lining',
      sole: 'Hand-Cut Oak Bark Leather Sole with Bevelled Waist',
      construction: 'Goodyear Welt 360°',
      origin: 'Marche, Italy',
      craftHours: 35
    },
    features: [
      'Twin custom cast brass buckles hand-polished in Vicenza',
      'Hand-painted sole edges using traditional carnauba waxes',
      'Cork-filled cavity provides personalized footbed molding'
    ],
    colors: [
      { name: 'Midnight Onyx', hex: '#0f0f12', material: 'Boxcalf', finish: 'Polished Mirror' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    widths: ['Standard (D)', 'Wide (EE)'],
    images: {
      hero: '/images/shoes/aesthetic-monkstrap-cognac.jpg',
      profile: '/images/shoes/aesthetic-monkstrap-cognac.jpg',
      top: '/images/shoes/aesthetic-monkstrap-cognac.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-craft-atelier.jpg'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'sk-derby-01',
    serialNumber: 'NO. 07 / PENNY LOAFER',
    name: 'The St. Moritz Venetian Penny Loafer',
    tagline: 'Hand-Sewn Apron in Antique Chestnut Patina',
    category: 'loafers',
    price: 780,
    compareAtPrice: 940,
    rating: 4.95,
    reviewsCount: 72,
    description: 'Hand-sewn pie-crust apron stitch with antique chestnut ombré patina. Constructed with an open glove flex welt that allows effortless slip-on comfort without creasing.',
    notes: {
      head: 'Antique Chestnut Patinated Calfskin',
      heart: 'Tempered Arch Shank & Cork Isolation',
      base: 'Double Leather Sole with Recessed Rubber Insets'
    },
    craftDetails: {
      upper: 'Antique Chestnut French Calfskin',
      lining: 'Full Drum-Dyed Vachetta',
      sole: 'Double Leather Sole with Vibram Forepart',
      construction: 'Norwegian Storm Welt',
      origin: 'Civitanova Marche, Italy',
      craftHours: 34
    },
    features: [
      'Hand-burnished chestnut ombré patina that patinates deeper with age',
      'Pie-crust apron stitch hand-gathered over wooden lasting block',
      'Includes brass-tipped cedar shoe trees'
    ],
    colors: [
      { name: 'Chestnut Patina', hex: '#693e20', material: 'Waxed Calf', finish: 'Antique Glow' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)', 'Wide (EE)'],
    images: {
      hero: '/images/shoes/aesthetic-loafer-brown.jpg',
      profile: '/images/shoes/aesthetic-loafer-brown.jpg',
      top: '/images/shoes/aesthetic-loafer-brown.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-oxford-noir.jpg'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'sk-sneaker-01',
    serialNumber: 'NO. 08 / SNEAKER',
    name: 'The Sovereign Vitello Kick',
    tagline: 'Architectural Minimalist Leather Kick',
    category: 'luxury-sneakers',
    price: 520,
    compareAtPrice: 620,
    rating: 4.99,
    reviewsCount: 218,
    description: 'The definitive luxury sneaker. Handcrafted from supple Italian Vitello calfskin, lined in full-grain glove leather, and stitched directly through the custom sculpted Margom rubber cupsole.',
    notes: {
      head: 'Full-Grain Italian Vitello Nappa (1.2mm)',
      heart: 'Memory Arch Support Removable Leather Bed',
      base: 'Italian Margom 360° Sidewall Stitched Cupsole'
    },
    craftDetails: {
      upper: '100% Full-Grain Italian Vitello Nappa Leather',
      lining: 'Plush Glove-Tanned Calfskin Lining',
      sole: 'Italian Margom Natural Rubber Cupsole with 360° Sidewall Stitch',
      construction: 'Stitched Cupsole Construction',
      origin: 'Civitanova Marche, Italy',
      craftHours: 20
    },
    features: [
      'Debossed gold foil unique atelier serial number on lateral heel',
      'Memory arch-supporting leather-covered removable footbed',
      'Waxed Japanese cotton laces with brushed palladium metal tips',
      'Clean unpadded collar for modern, architectural trouser drape'
    ],
    colors: [
      { name: 'Vitello White', hex: '#f0f0f2', material: 'Vitello Nappa', finish: 'Pure Alabaster' },
      { name: 'Obsidian Stealth', hex: '#0e0e11', material: 'Vitello Leather', finish: 'Deep Black' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    widths: ['Standard (D)'],
    images: {
      hero: '/images/shoes/sneaker-colorblock-pop.jpg',
      profile: '/images/shoes/aesthetic-sneaker-white.jpg',
      top: '/images/shoes/aesthetic-sneaker-noir.jpg',
      sole: '/images/shoes/aesthetic-craft-atelier.jpg',
      detail: '/images/shoes/aesthetic-sneaker-noir.jpg'
    },
    badge: 'BESTSELLER',
    inStock: true,
    featured: true
  }
];
