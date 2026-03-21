import {Helmet} from 'react-helmet-async';

const BASE_URL = 'https://relentiv.com';
const SITE_NAME = 'Relentiv';

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

export default function PageSeo({
  title,
  description,
  path,
  type = 'website',
}: PageSeoProps) {
  const canonicalUrl = new URL(path, `${BASE_URL}/`).toString();
  const pageTitle = `${title} | ${SITE_NAME}`;

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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
