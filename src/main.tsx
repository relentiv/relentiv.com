import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {Router} from 'wouter';
import App from './App.tsx';
import './index.css';
import {HelmetProvider} from './lib/helmet';
import {blogSlugs, pocPrerenderRoutes} from './sitemap-routes.js';
import {pingIndexNow} from './utils/indexNow.js';
import {isPrerender} from './utils/prerender';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </StrictMode>
);

if (!isPrerender && rootElement.hasChildNodes()) {
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
    void pingIndexNow([...blogSlugs, ...pocPrerenderRoutes]);
  }
}
