/**
 * Site Configuration
 *
 * This file contains all the site-wide configuration settings.
 * Edit these values to customize your portfolio site.
 */

export const siteConfig = {
  // Basic site information
  name: 'Hassan Saad Ifti',
  url: 'https://ifti.space',
  description: 'Aerospace researcher specializing in hypersonics, transpiration cooling, and high-speed aerothermodynamics at the University of Oxford.',

  // Navigation items (shown in header)
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Bio', href: '/bio' },
    { label: 'Research', href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'CV', href: '/cv' },
    { label: 'Press', href: '/press' },
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
    linkedin: 'https://www.linkedin.com/in/hsi/',
    github: '',
    twitter: 'saadifti',
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
    defaultTitle: 'Hassan Saad Ifti - Aerospace Researcher',
    titleTemplate: '%s | Hassan Saad Ifti',
    defaultDescription: 'DPhil candidate at the University of Oxford researching hypersonic vehicle cooling systems and high-speed aerothermodynamics.',
    defaultOgImage: '/images/og-default.png',
  },
};

export type SiteConfig = typeof siteConfig;
