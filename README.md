# The Shoe Kicks™ — Luxury Bespoke Footwear & Atelier Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38bdf8.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.1-729b1b.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-gold.svg)]()

> Official digital flagship and eCommerce platform for **The Shoe Kicks** (387 Kolsa Lane, Off MG Road, Camp, Pune - 411001, Maharashtra, India).

---

## 🌟 Key Features

- **Spatial 3D & Concept Motion Graphics Hero**:
  - Unbranded 1080p concept shoe 3D video animation with synchronized audio and scrub seeking.
  - Interactive 360° product turntable with multi-angle turntable inspection.
  - Kinetic parallax typography tracks with dynamic scroll expansion.
- **Top Flagship Product — Foaming Shoe Cleaner (150ml)**:
  - Formulated for all footwear leathers, suede, nubuck, patent, and canvas.
  - Multi-tier studio product photography (luxury gradient and pop colorblock aesthetics).
  - One-click instant checkout with custom razor-sharp payment integration.
- **Razorpay Direct Payment Integration**:
  - Live modal supporting UPI (GPay, PhonePe, Paytm), Cards (Visa, Mastercard, RuPay), and Net Banking.
  - Automatic order reservation token generation (`SK-BESPOKE-XXXXXX`).
  - Automated WhatsApp concierge order confirmation dispatch.
- **Interactive Google Maps Review Box**:
  - Authentic Google Maps review dialog modal with 5-star interactive rating, feedback criteria tags, and reviewer identity.
  - Direct submission triggers celebratory confetti, live wall reflection, clipboard copy, and launches Google Maps review link.
- **Performance Optimized Architecture**:
  - Route-level dynamic code splitting (`React.lazy` + `Suspense`).
  - Isolated vendor chunks (`vendor-react`, `vendor-three`, `vendor-icons`, `vendor-fx`).
  - Production build in ~2.5s with zero chunk size warnings.
- **Global Multi-Currency Engine**:
  - Real-time price conversion across INR (₹), USD ($), EUR (€), GBP (£), and JPY (¥) with localized number formatting (`en-IN` support).
- **Physical Atelier Integration (Camp, Pune)**:
  - Complete Schema.org `ShoeStore` and `PostalAddress` structured data.
  - Store hours: **Open Daily 9:00 AM – 10:00 PM** (Monday through Sunday).
  - Direct hotline: `+91 73500 51590`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript (Strict Mode)
- **Bundler & Build Tool**: Vite 8 + Rolldown/Rollup Code Splitting
- **Styling**: Tailwind CSS v4 + PostCSS
- **Icons**: Lucide React
- **FX & Animations**: Canvas-Confetti, CSS 3D Transforms, Custom Parallax Hooks
- **Testing**: Vitest 5.1 (Unit & Integration tests)
- **Linting**: Oxlint

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/the-shoe-kicks.git

# Navigate to project folder
cd the-shoe-kicks

# Install dependencies
npm install
```

### Development Server

```bash
# Start local development server on port 5175
npm run dev
```

Visit [http://localhost:5175](http://localhost:5175) in your browser.

### Running Unit Tests

```bash
# Run unit test suite with Vitest
npm test

# Run tests in watch mode
npx vitest
```

### Production Build & Optimization

```bash
# Typecheck & build minified production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
shoe_kikes/
├── public/
│   ├── images/              # Studio product photography, lookbooks & textures
│   ├── logos/               # Handcrafted transparent brand emblems & logos
│   └── videos/              # Concept 3D hero video & audio
├── src/
│   ├── components/
│   │   ├── brand/           # Authentic BrandLogo components
│   │   ├── cart/            # Cart drawer with live math & promo logic
│   │   ├── checkout/        # Razorpay modal checkout integration
│   │   ├── hero/            # Spatial 3D turntable & kinetic typography hero
│   │   ├── layout/          # Navbar, AnnouncementBar, Footer
│   │   ├── local/           # Camp Pune atelier boutique showroom section
│   │   ├── reviews/         # Interactive Google Maps Review Modal
│   │   ├── showcase/        # Foaming Cleaner showcase & editorial splits
│   │   └── social/          # Customer reviews wall & Google proof
│   ├── context/             # React Contexts (Cart, Currency, Theme, Wishlist)
│   ├── data/                # Products catalog, categories & stories
│   ├── pages/               # Lazy-loaded route views
│   ├── services/            # Mock API & service layer
│   └── types/               # TypeScript definitions
├── tests/                   # Vitest unit test suites
├── vite.config.ts           # Vite configuration with chunk splitting
└── package.json
```

---

## 📍 Flagship Atelier Details

- **Store**: The Shoe Kicks Atelier & Footwear Boutique
- **Address**: 387 Kolsa Lane (Kolsa Gali), Off MG Road, Camp, Pune - 411001, Maharashtra, India
- **Hours**: Open All 7 Days: 9:00 AM – 10:00 PM IST
- **Phone**: [+91 73500 51590](tel:+917350051590)
- **Email**: [concierge@theshoekicks.com](mailto:concierge@theshoekicks.com)
