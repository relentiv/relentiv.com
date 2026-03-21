import {Helmet} from 'react-helmet-async';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  absoluteUrl,
} from '../lib/site';

interface SeoProps {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  prevPath?: string;
  nextPath?: string;
  schemas?: object[];
  article?: {
    publishedTime: string;
    modifiedTime: string;
  };
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots = 'index, follow',
  prevPath,
  nextPath,
  schemas = [],
  article,
}: SeoProps) {
  const canonical = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content="Relentiv" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      {prevPath ? <link rel="prev" href={absoluteUrl(prevPath)} /> : null}
      {nextPath ? <link rel="next" href={absoluteUrl(nextPath)} /> : null}
      {article ? (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
        </>
      ) : null}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
