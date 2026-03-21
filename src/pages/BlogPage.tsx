import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from 'wouter';
import {ArrowLeft, BookOpen, Moon} from 'lucide-react';
import Seo from '../components/Seo';
import {blogPosts, getBlogPostBySlug} from '../data/blogPosts';
import {buildBreadcrumbSchema, estimateReadingTime, formatDisplayDate} from '../lib/site';
import NotFoundPage from './NotFoundPage';

interface BlogPageProps {
  slug: string;
}

export default function BlogPage({slug}: BlogPageProps) {
  const [, setLocation] = useLocation();
  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = getBlogPostBySlug(slug);

  const relatedPosts = useMemo(
    () => blogPosts.filter((candidate) => candidate.slug !== slug).slice(0, 2),
    [slug],
  );

  if (!post) {
    return <NotFoundPage />;
  }

  const getGradient = () => {
    switch (post.themeColor) {
      case 'orange':
        return 'from-orange-900/40 via-[#050505] to-[#050505]';
      case 'emerald':
        return 'from-emerald-900/40 via-[#050505] to-[#050505]';
      case 'indigo':
        return 'from-indigo-900/40 via-[#050505] to-[#050505]';
      case 'rose':
        return 'from-rose-900/40 via-[#050505] to-[#050505]';
      default:
        return 'from-zinc-900/40 via-[#050505] to-[#050505]';
    }
  };

  const getGlow = () => {
    switch (post.themeColor) {
      case 'orange':
        return 'bg-orange-500/20';
      case 'emerald':
        return 'bg-emerald-500/20';
      case 'indigo':
        return 'bg-indigo-500/20';
      case 'rose':
        return 'bg-rose-500/20';
      default:
        return 'bg-zinc-500/20';
    }
  };

  const getAccentText = () => {
    switch (post.themeColor) {
      case 'orange':
        return 'text-orange-400';
      case 'emerald':
        return 'text-emerald-400';
      case 'indigo':
        return 'text-indigo-400';
      case 'rose':
        return 'text-rose-400';
      default:
        return 'text-zinc-400';
    }
  };

  const readingTime = estimateReadingTime(post.content);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: `https://relentiv.com${post.image}`,
    description: post.metaDescription,
    url: `https://relentiv.com/blog/${post.slug}`,
  };

  const breadcrumbs = buildBreadcrumbSchema([
    {name: 'Home', path: '/'},
    {name: 'Blog', path: '/blog'},
    {name: post.title, path: `/blog/${post.slug}`},
  ]);

  return (
    <>
      <Seo
        title={`${post.title} | Relentiv`}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        article={{publishedTime: post.publishedAt, modifiedTime: post.updatedAt}}
        schemas={[blogPostingSchema, breadcrumbs]}
      />
      <div
        className={`min-h-screen transition-colors duration-500 ${
          readingMode ? 'bg-[#fdf6e3] text-[#433f38]' : 'bg-[#050505] text-gray-300'
        }`}
      >
        <header className="relative w-full overflow-hidden border-b border-white/5 pt-32 pb-20">
          {!readingMode && (
            <>
              <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()} opacity-80`}></div>
              <div className={`absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full ${getGlow()} blur-[120px] pointer-events-none`}></div>
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
              ></div>
            </>
          )}

          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <button
              type="button"
              aria-label="Back to blog"
              onClick={() => setLocation('/blog')}
              className={`mb-12 flex items-center gap-2 text-sm font-medium transition-colors ${
                readingMode ? 'text-[#837a6b] hover:text-[#433f38]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="mb-6 flex items-center gap-3">
              <span className={`text-sm font-semibold uppercase tracking-wider ${readingMode ? 'text-[#b58900]' : getAccentText()}`}>
                {post.type}
              </span>
              {post.tag ? (
                <>
                  <span className={`h-1 w-1 rounded-full ${readingMode ? 'bg-[#b58900]' : 'bg-white/20'}`}></span>
                  <span className={`text-sm ${readingMode ? 'text-[#837a6b]' : 'text-gray-400'}`}>{post.tag}</span>
                </>
              ) : null}
            </div>

            <h1
              className={`mb-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl ${
                readingMode ? 'text-[#073642]' : 'text-white'
              }`}
            >
              {post.title}
            </h1>

            {post.stat ? (
              <div className="mb-6">
                <span className={`text-6xl font-light tracking-tighter ${readingMode ? 'text-[#cb4b16]' : 'text-white'}`}>
                  {post.stat}
                </span>
              </div>
            ) : null}

            <p className={`text-xl leading-relaxed ${readingMode ? 'text-[#586e75]' : 'text-gray-400'}`}>{post.description}</p>
            <p className={`sr-only ${readingMode ? 'text-[#586e75]' : 'text-gray-400'}`}>
              {post.author}. Published {formatDisplayDate(post.publishedAt)}. Updated {formatDisplayDate(post.updatedAt)}. {readingTime} minute read.
            </p>
          </div>
        </header>

        <div
          className={`sticky top-0 z-40 border-b backdrop-blur-md ${
            readingMode ? 'border-[#eee8d5] bg-[#fdf6e3]/90' : 'border-white/5 bg-[#050505]/80'
          }`}
        >
          <div className="mx-auto flex max-w-3xl justify-end px-6 py-4">
            <button
              type="button"
              aria-label="Toggle reading mode"
              onClick={() => setReadingMode(!readingMode)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                readingMode
                  ? 'bg-[#eee8d5] text-[#586e75] hover:bg-[#e4dfcb]'
                  : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Toggle Reading Mode"
            >
              {readingMode ? (
                <>
                  <Moon className="h-4 w-4" /> Dark Mode
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" /> Reading Mode
                </>
              )}
            </button>
          </div>
        </div>

        <main id="main-content" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          {post.videoUrl ? (
            <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 pointer-events-none group-hover:bg-transparent"></div>
              <video
                src={post.videoUrl}
                controls
                className="aspect-video w-full bg-black object-cover"
                poster={post.image}
              />
            </div>
          ) : null}

          <article
            className={`prose prose-lg max-w-none font-serif leading-relaxed md:prose-xl ${
              readingMode
                ? 'prose-headings:text-[#073642] prose-p:text-[#433f38] prose-strong:text-[#073642] prose-li:text-[#433f38]'
                : 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300'
            }`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />

          <aside className="sr-only" aria-label="Related posts">
            <h2>Related posts</h2>
            <ul>
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.slug}>{relatedPost.title}</li>
              ))}
            </ul>
          </aside>
        </main>
      </div>
    </>
  );
}
