import {ReactNode, useState} from 'react';
import {ArrowLeft, BookOpen, Moon} from 'lucide-react';
import {useLocation} from 'wouter';
import Seo from './Seo';
import {BreadcrumbItem, buildBreadcrumbSchema} from '../lib/site';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  description,
  path,
  breadcrumbs,
  children,
}: LegalPageLayoutProps) {
  const [, setLocation] = useLocation();
  const [readingMode, setReadingMode] = useState(false);

  return (
    <>
      <Seo
        title={`${title} | Relentiv`}
        description={description}
        path={path}
        schemas={[buildBreadcrumbSchema(breadcrumbs)]}
      />
      <main
        id="main-content"
        className={`min-h-screen transition-colors duration-500 ${
          readingMode ? 'bg-[#fdf6e3] text-[#433f38]' : 'bg-[#050505] text-gray-300'
        }`}
      >
        <header className="relative w-full overflow-hidden border-b border-white/5 pt-32 pb-20">
          {!readingMode && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-[#050505] to-[#050505] opacity-80"></div>
              <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none"></div>
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
              onClick={() => setLocation('/')}
              aria-label="Back to home"
              className={`mb-12 flex items-center gap-2 text-sm font-medium transition-colors ${
                readingMode ? 'text-[#837a6b] hover:text-[#433f38]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </button>

            <p
              className={`mb-6 text-sm font-semibold uppercase tracking-wider ${
                readingMode ? 'text-[#b58900]' : 'text-zinc-400'
              }`}
            >
              Legal
            </p>

            <h1
              className={`mb-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl ${
                readingMode ? 'text-[#073642]' : 'text-white'
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-xl leading-relaxed ${
                readingMode ? 'text-[#586e75]' : 'text-gray-400'
              }`}
            >
              {description}
            </p>
          </div>
        </header>

        <div
          className={`sticky top-0 z-40 border-b backdrop-blur-md ${
            readingMode ? 'bg-[#fdf6e3]/90 border-[#eee8d5]' : 'bg-[#050505]/80 border-white/5'
          }`}
        >
          <div className="mx-auto flex max-w-3xl justify-end px-6 py-4">
            <button
              type="button"
              onClick={() => setReadingMode(!readingMode)}
              aria-label="Toggle reading mode"
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                readingMode
                  ? 'bg-[#eee8d5] text-[#586e75] hover:bg-[#e4dfcb]'
                  : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
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

        <article className="prose prose-lg mx-auto max-w-3xl px-6 py-16 font-serif leading-relaxed md:prose-xl md:py-24 prose-headings:scroll-mt-32 prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300">
          {children}
        </article>
      </main>
    </>
  );
}
