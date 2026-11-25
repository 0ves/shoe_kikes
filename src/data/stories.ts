import type { CustomerReview } from '../types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    author: 'Lord Julian Vance',
    location: 'London, Mayfair',
    rating: 5,
    date: 'October 14, 2026',
    title: 'Unrivaled Lasting and Mirror Glaze',
    comment: 'The Imperial Obsidian Oxfords rival bespoke London shoemakers charging triple the price. The arch support provided by the carved fiddleback waist is astonishing. After 12 hours on Savile Row, zero fatigue.',
    verified: true,
    productName: 'The Imperial Obsidian Oxford'
  },
  {
    id: 'rev-02',
    author: 'Matteo Rossini',
    location: 'Milan, Quadrilatero',
    rating: 5,
    date: 'September 28, 2026',
    title: 'The Sovereign Sneaker is Perfection',
    comment: 'Vitello leather this buttery soft is impossible to find in mass luxury. The unpadded clean collar sits impeccably with bespoke tailored trousers. Received compliments in Geneva and Florence.',
    verified: true,
    productName: 'The Sovereign Court Sneaker'
  },
  {
    id: 'rev-03',
    author: 'Dr. Evelyn Sterling',
    location: 'New York, Upper East Side',
    rating: 5,
    date: 'August 19, 2026',
    title: 'Sensational Chelsea Boot',
    comment: 'The single-piece unbroken cut on the Sovereign Chelsea means there are no uncomfortable seams digging into the ankle. The Cuban heel elevates every silhouette effortlessly.',
    verified: true,
    productName: 'The Sovereign Chelsea Boot'
  }
];

export const CRAFT_PILLARS = [
  {
    step: '01',
    title: 'The Sculpted Last',
    subtitle: 'Anatomical Architecture',
    description: 'Each Shoe Kicks silhouette begins with a carved beechwood last, engineered over 400 hours to mimic natural weight distribution and cradle the tarsal bones.',
    spec: '400+ Hours of Last Engineering'
  },
  {
    step: '02',
    title: 'French & Tuscan Hides',
    subtitle: 'Tannery D’Annonay Selection',
    description: 'Only the top 2% of unblemished French boxcalf and Tuscan crust leathers qualify for our cutting table. Naturally conditioned in natural oils and tree tannins.',
    spec: 'Top 2% Certified Full-Grain Grade'
  },
  {
    step: '03',
    title: '360° Goodyear Welt',
    subtitle: 'Intergenerational Longevity',
    description: 'Stitched with heavy braided Irish linen thread soaked in natural pitch. This allows every pair to be fully resoled and recrafted indefinitely.',
    spec: '240 Tension-Balanced Stitches'
  },
  {
    step: '04',
    title: 'Organic Champagne Patina',
    subtitle: 'Florence Workshop Hand-Glaze',
    description: 'Our colorists layer alcohol pigments, vintage champagne, and organic beeswax over 7 days to produce light-catching depth and deep ombré gradations.',
    spec: '7 Days of Layered Patina Artistry'
  }
];
