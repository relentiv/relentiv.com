export const SITE_NAME = 'Relentiv';
export const SITE_URL = 'https://relentiv.com';
export const DEFAULT_TITLE = 'Relentiv | IT Services & Digital Solutions';
export const DEFAULT_DESCRIPTION =
  'Relentiv delivers web, mobile, AI, and product engineering services for companies that need reliable digital execution.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const CONTACT_EMAIL = 'contact@relentiv.com';
export const CONTACT_PHONE = '+1 (415) 555-0198';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function absoluteUrl(path: string) {
  if (!path) {
    return SITE_URL;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  if (path === '/') {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function estimateReadingTime(content: string) {
  const wordCount = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
