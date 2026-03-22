import {Link} from 'wouter';
import Seo from '../components/Seo';
import {blogPosts} from '../data/blogPosts';
import {buildBreadcrumbSchema, estimateReadingTime} from '../lib/site';
import NotFoundPage from './NotFoundPage';

const POSTS_PER_PAGE = 2;

interface BlogListPageProps {
  page: number;
}

export default function BlogListPage({page}: BlogListPageProps) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  if (safePage > totalPages) {
    return <NotFoundPage />;
  }

  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const posts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const path = safePage === 1 ? '/blog' : `/blog/page/${safePage}`;
  const prevPath = safePage > 1 ? (safePage === 2 ? '/blog' : `/blog/page/${safePage - 1}`) : undefined;
  const nextPath = safePage < totalPages ? `/blog/page/${safePage + 1}` : undefined;

  return (
    <>
      <Seo
        title="Blog | Relentiv — Insights & Updates"
        description="Insights, client stories, and technical updates from the Relentiv team."
        path={path}
        prevPath={prevPath}
        nextPath={nextPath}
        schemas={[
          buildBreadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Blog', path: path},
          ]),
        ]}
      />
      <main id="main-content" className="min-h-screen bg-[#050505] px-6 pt-32 pb-24 text-white">
        <div className="mx-auto max-w-5xl">
          <header className="mb-16 border-b border-white/10 pb-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60">Insights &amp; Updates</p>
            <h1 className="mb-6 text-5xl font-medium tracking-tighter md:text-7xl">Relentiv Blog</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
              Technical thinking, delivery lessons, and product work from across our engineering and strategy teams.
            </p>
          </header>

          <section aria-labelledby="blog-list-title">
            <h2 id="blog-list-title" className="sr-only">
              Blog posts
            </h2>
            <div className="grid gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="mb-4 text-sm uppercase tracking-wider text-gray-400">{post.type}</p>
                  <h2 className="mb-4 text-3xl font-medium tracking-tight text-white">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="transition-colors hover:text-emerald-300">{post.title}</span>
                    </Link>
                  </h2>
                  <p className="mb-6 max-w-3xl leading-relaxed text-gray-400">{post.description}</p>
                  <p className="text-sm text-gray-500">{estimateReadingTime(post.content)} min read</p>
                </article>
              ))}
            </div>
          </section>

          <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-between gap-4">
            {prevPath ? (
              <Link href={prevPath}>
                <span className="rounded-full border border-white/10 px-5 py-2 text-sm text-white transition-colors hover:bg-white/5">
                  Previous
                </span>
              </Link>
            ) : (
              <span></span>
            )}
            <p className="text-sm text-gray-500">
              Page {safePage} of {totalPages}
            </p>
            {nextPath ? (
              <Link href={nextPath}>
                <span className="rounded-full border border-white/10 px-5 py-2 text-sm text-white transition-colors hover:bg-white/5">
                  Next
                </span>
              </Link>
            ) : (
              <span></span>
            )}
          </nav>
        </div>
      </main>
    </>
  );
}
