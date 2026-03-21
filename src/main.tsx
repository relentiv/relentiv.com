import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import {blogSlugs} from './sitemap-routes.js';
import {pingIndexNow} from './utils/indexNow.js';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

if (import.meta.env.DEV && typeof window !== 'undefined') {
  const developmentPingFlag = '__relentivIndexNowPinged';
  const windowWithFlag = window as Window & {
    __relentivIndexNowPinged?: boolean;
  };

  if (!windowWithFlag[developmentPingFlag]) {
    windowWithFlag[developmentPingFlag] = true;
    void pingIndexNow(blogSlugs);
  }
}
