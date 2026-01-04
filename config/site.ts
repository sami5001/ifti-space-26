/**
 * Site Configuration
 *
 * This file contains all the site-wide configuration settings.
 * Edit these values to customize your portfolio site.
 */

export const siteConfig = {
  // Basic site information
  name: 'Your Name',
  url: 'https://your-site.com',
  description: 'Academic portfolio and research',

  // Navigation items (shown in header)
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Research', href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'Writing', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  // Footer links
  footerLinks: [
    { label: 'Imprint', href: '/imprint' },
    { label: 'Contact', href: '/contact' },
    { label: 'RSS', href: '/feed.xml' },
  ],

  // Social media links (leave empty to hide)
  social: {
    linkedin: '',
    github: '',
    twitter: '',
    googleScholar: '',
    researchGate: '',
    orcid: '',
  },

  // Analytics (optional - leave empty to disable)
  analytics: {
    // Fathom Site ID
    fathomSiteId: '',
    // Or Google Analytics ID
    googleAnalyticsId: '',
  },

  // SEO defaults
  seo: {
    defaultTitle: 'Academic Portfolio',
    titleTemplate: '%s | Your Name',
    defaultDescription: 'Academic portfolio showcasing research, publications, and more.',
    defaultOgImage: '/images/og-default.png',
  },
};

export type SiteConfig = typeof siteConfig;
