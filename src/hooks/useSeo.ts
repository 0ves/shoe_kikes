import { useEffect } from 'react';

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  keywords?: string;
}

export function useSeo({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://theshoekicks.com/images/shoes/aesthetic-oxford-noir.jpg',
  ogImageAlt = 'The Shoe Kicks Handcrafted Luxury Footwear, Camp, Pune',
  jsonLd,
  keywords
}: SeoConfig) {
  useEffect(() => {
    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = title;

    // Helper to update or create a meta tag
    const setMetaTag = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Canonical Tag
    const resolvedCanonical = canonical || window.location.href.split('?')[0];
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 4. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', resolvedCanonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', ogImageAlt);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', ogImageAlt);

    // 6. Dynamic JSON-LD Structured Data
    let scriptEl = document.getElementById('route-dynamic-jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'route-dynamic-jsonld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Cleanup on unmount or page change
    return () => {
      document.title = originalTitle;
      const dynamicScript = document.getElementById('route-dynamic-jsonld');
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, ogImageAlt, jsonLd, keywords]);
}
