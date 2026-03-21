import {Link} from 'wouter';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="404 | Relentiv" description="The page you requested could not be found." path="/404" robots="noindex, follow" />
      <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#050505] px-6 pt-32 pb-24 text-white">
        <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60">404</p>
          <h1 className="mb-6 text-5xl font-medium tracking-tighter">Page not found</h1>
          <p className="mb-10 text-lg leading-relaxed text-gray-400">
            The requested page does not exist or has moved. Use the links below to continue browsing Relentiv.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <a className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200">Home</a>
            </Link>
            <Link href="/services">
              <a className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/5">Services</a>
            </Link>
            <Link href="/contact">
              <a className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition-colors hover:bg-white/5">Contact</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
