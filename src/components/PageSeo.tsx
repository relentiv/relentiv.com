import {Helmet} from '../lib/helmet';

const BASE_URL = 'https://relentiv.com';
const SITE_NAME = 'Relentiv';
const DEFAULT_SOCIAL_IMAGE = 'https://relentiv.com/og-default.png';

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
};

export default function PageSeo({
  title,
  description,
  path,
  type = 'website',
  image,
}: PageSeoProps) {
  const canonicalUrl = new URL(path, `${BASE_URL}/`).toString();
  const pageTitle = `${title} | ${SITE_NAME}`;
  const resolvedImage = image
    ? new URL(image, `${BASE_URL}/`).toString()
    : DEFAULT_SOCIAL_IMAGE;

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
}
