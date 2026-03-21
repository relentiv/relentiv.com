import {useEffect} from 'react';
import {useLocation} from 'wouter';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA4_ID;

export default function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD || !GA_ID) {
      return;
    }

    if (window.localStorage.getItem('relentiv-cookie-consent') !== 'accepted') {
      return;
    }

    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('config', GA_ID, {
      page_path: location,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}
