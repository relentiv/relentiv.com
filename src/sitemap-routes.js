export const staticRoutes = [
  {url: '/', priority: '1.0', changefreq: 'monthly'},
  {url: '/services', priority: '0.9', changefreq: 'monthly'},
  {url: '/about', priority: '0.8', changefreq: 'monthly'},
  {url: '/privacy-policy', priority: '0.3', changefreq: 'yearly'},
];

// Auto-generated from the current blog route inventory.
export const blogSlugs = [
  '/blog/fintech-transformation',
  '/blog/ai-agents-enterprise',
  '/blog/nexus-logistics-story',
];

export const prerenderRoutes = [...staticRoutes.map((route) => route.url), ...blogSlugs];
