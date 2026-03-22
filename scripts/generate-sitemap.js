import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {staticRoutes} from '../src/sitemap-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'https://relentiv.com';
const blogPostsFile = path.join(__dirname, '../src/data/blogPosts.ts');
const sitemapOutput = path.join(__dirname, '../public/sitemap.xml');

const fileContents = fs.readFileSync(blogPostsFile, 'utf8');
const blogIds = [...fileContents.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);

const blogRoutes = blogIds.map((id) => ({
  url: `/blog/${id}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const allRoutes = [...staticRoutes, ...blogRoutes];
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
}).format(new Date());

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(sitemapOutput, xml.trim());
console.log(`Sitemap generated with ${allRoutes.length} URLs`);
