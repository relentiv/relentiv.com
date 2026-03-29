import {useEffect} from 'react';
import {useLocation} from 'wouter';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    RELENTIV_GA4_ID?: string;
  }
}

export default function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const gaId = window.RELENTIV_GA4_ID || import.meta.env?.VITE_GA4_ID;

    if (!gaId || gaId.startsWith('%VITE_')) {
      return;
    }

    if (!import.meta.env?.PROD) {
      return;
    }

    if (window.localStorage.getItem('relentiv-cookie-consent') !== 'accepted') {
      return;
    }

    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('config', gaId, {
      page_path: location,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}
