import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Technical SEO & Discovery Assets Audit', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('validates robots.txt structure and directives', () => {
    const robotsPath = path.join(rootDir, 'public', 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);
    const content = fs.readFileSync(robotsPath, 'utf-8');

    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toContain('Sitemap: https://theshoekicks.com/sitemap.xml');
    expect(content).toContain('User-agent: Googlebot');
  });

  it('validates sitemap.xml structure and canonical URLs', () => {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const content = fs.readFileSync(sitemapPath, 'utf-8');

    // XML header & urlset namespace
    expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(content).toContain('<urlset');

    // All primary routes
    expect(content).toContain('<loc>https://theshoekicks.com/</loc>');
    expect(content).toContain('<loc>https://theshoekicks.com/collection</loc>');
    expect(content).toContain('<loc>https://theshoekicks.com/boutique</loc>');
    expect(content).toContain('<loc>https://theshoekicks.com/craftsmanship</loc>');
    expect(content).toContain('<loc>https://theshoekicks.com/story</loc>');
    expect(content).toContain('<loc>https://theshoekicks.com/contact</loc>');

    // Top Flagship Product
    expect(content).toContain('<loc>https://theshoekicks.com/product/sk-cleaner-150</loc>');
  });

  it('validates site.webmanifest PWA configuration', () => {
    const manifestPath = path.join(rootDir, 'public', 'site.webmanifest');
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    expect(manifest.name).toContain('The Shoe Kicks');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.theme_color).toBe('#08080a');
  });

  it('validates index.html metadata, OpenGraph, Twitter and Schema.org', () => {
    const indexPath = path.join(rootDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const content = fs.readFileSync(indexPath, 'utf-8');

    // Title & Description
    expect(content).toContain('<title>');
    expect(content).toContain('name="description"');
    expect(content).toContain('name="robots"');

    // Canonical link
    expect(content).toContain('rel="canonical" href="https://theshoekicks.com/"');

    // Hreflang alternates
    expect(content).toContain('hreflang="en-IN"');
    expect(content).toContain('hreflang="x-default"');

    // OpenGraph & Twitter
    expect(content).toContain('property="og:title"');
    expect(content).toContain('property="og:description"');
    expect(content).toContain('property="og:image"');
    expect(content).toContain('name="twitter:card"');

    // Schema.org ShoeStore & WebSite
    expect(content).toContain('"@type": "ShoeStore"');
    expect(content).toContain('"@type": "WebSite"');
    expect(content).toContain('"@type": "PostalAddress"');
    expect(content).toContain('"opens": "09:00"');
    expect(content).toContain('"closes": "22:00"');
  });
});
