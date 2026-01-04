// Optional analytics integration
// This file provides a wrapper for analytics that can be configured in site config

import { useEffect } from 'react';

export const initAnalytics = () => {
  // Analytics initialization can be added here
  // Example: Fathom, Plausible, Google Analytics, etc.

  // Check if we're in the browser
  if (typeof window === 'undefined') return;

  // Example Fathom integration (uncomment and add your site ID):
  // import * as Fathom from 'fathom-client';
  // Fathom.load('YOUR_FATHOM_SITE_ID', {
  //   includedDomains: ['your-domain.com'],
  // });
};

export const trackPageView = () => {
  // Track page view
  // Example: Fathom.trackPageview();
};

export const trackEvent = (eventName: string, value?: { _value?: number }) => {
  // Track custom event
  // Example: Fathom.trackEvent(eventName, value);
  console.log('Analytics event:', eventName, value);
};

// Hook for use in React components
export const useAnalytics = () => {
  useEffect(() => {
    initAnalytics();
  }, []);
};
