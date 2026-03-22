export const staticRoutes = [
  {url: '/', priority: '1.0', changefreq: 'monthly'},
  {url: '/services', priority: '0.9', changefreq: 'monthly'},
  {url: '/about', priority: '0.8', changefreq: 'monthly'},
  {url: '/blog', priority: '0.9', changefreq: 'weekly'},
  {url: '/contact', priority: '0.7', changefreq: 'monthly'},
  {url: '/terms', priority: '0.3', changefreq: 'yearly'},
  {url: '/privacy-policy', priority: '0.3', changefreq: 'yearly'},
];

export const blogPaginationRoutes = ['/blog/page/2'];

// Auto-generated from the current blog route inventory.
export const blogSlugs = [
  '/blog/fintech-transformation',
  '/blog/ai-agents-enterprise',
  '/blog/nexus-logistics-story',
];

// These routes need direct-link support in production, but should stay out of the public sitemap.
export const adminPrerenderRoutes = ['/internal/portal/login', '/internal/portal/leads'];

export const prerenderRoutes = [
  ...staticRoutes.map((route) => route.url),
  ...blogPaginationRoutes,
  ...blogSlugs,
  ...adminPrerenderRoutes,
];

export const specialPrerenderRoutes = [
  {route: '/', output: '200.html'},
  {route: '/404', output: '404.html'},
];
