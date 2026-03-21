import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Link, Route, Switch, useLocation} from 'wouter';
import BookingModal from './components/BookingModal';
import CookieConsent from './components/CookieConsent';
import AnalyticsTracker from './components/AnalyticsTracker';
import PageTransition from './components/PageTransition';

const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const ENABLE_PAGE_TRANSITIONS = true;
const PAGE_TRANSITION_DURATION_SECONDS = 2.0;
const PAGE_TRANSITION_HOLD_SECONDS = 0.2;

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="font-sans antialiased">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PageTransition
        enabled={ENABLE_PAGE_TRANSITIONS}
        duration={PAGE_TRANSITION_DURATION_SECONDS}
        hold={PAGE_TRANSITION_HOLD_SECONDS}
      />
      <AnalyticsTracker />

      <header>
        <nav
          aria-label="Main navigation"
          className={`fixed top-0 z-[60] w-full transition-colors duration-300 ${
            isMobileMenuOpen
              ? 'border-transparent bg-[#050505]'
              : 'nav-blur border-b border-white/10 bg-deep-forest/90'
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex h-20 items-center justify-between">
              <Link href="/">
                <a className="flex flex-shrink-0 items-center gap-2" aria-label="Relentiv home">
                  <span className="flex items-baseline text-2xl font-bold tracking-tight text-white">
                    Relent
                    <span className="relative inline-flex flex-col items-center">
                      <span className="absolute top-[0.2em] h-[0.2em] w-[0.25em] bg-[#E25822]"></span>
                      <span>ı</span>
                    </span>
                    v
                  </span>
                </a>
              </Link>

              <div className="hidden items-center space-x-10 text-sm font-medium text-gray-300 lg:flex">
                <Link href="/">
                  <a className="transition-colors hover:text-white">Home</a>
                </Link>
                <Link href="/services">
                  <a className="transition-colors hover:text-white">Services</a>
                </Link>
                <Link href="/blog">
                  <a className="transition-colors hover:text-white">Insights</a>
                </Link>
                <Link href="/about">
                  <a className="transition-colors hover:text-white">About</a>
                </Link>
                <Link href="/contact">
                  <a className="transition-colors hover:text-white">Contact</a>
                </Link>
              </div>

              <div className="hidden lg:block">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                >
                  Contact Us
                </button>
              </div>

              <div className="lg:hidden">
                <button
                  type="button"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  className="p-2 text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen ? (
        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[50] flex flex-col bg-[#050505] px-6 pt-24 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="absolute top-0 left-0 h-2/3 w-full bg-gradient-to-b from-emerald-900/30 to-transparent opacity-80 pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px] pointer-events-none"></div>
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          ></div>

          <div className="relative z-10 mt-4 flex flex-col space-y-8">
            <Link href="/">
              <a onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Home
              </a>
            </Link>
            <Link href="/services">
              <a onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Services
              </a>
            </Link>
            <Link href="/blog">
              <a onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Insights
              </a>
            </Link>
            <Link href="/about">
              <a onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                About
              </a>
            </Link>
            <Link href="/contact">
              <a onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Contact
              </a>
            </Link>

            <div className="mt-8 border-t border-white/10 pt-10">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setIsBookingModalOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black transition-colors hover:bg-gray-200"
              >
                Book a Consultation
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      <Suspense fallback={null}>
        <Switch>
          <Route path="/">
            <HomePage onBook={() => setIsBookingModalOpen(true)} />
          </Route>
          <Route path="/services">
            <ServicesPage onBook={() => setIsBookingModalOpen(true)} />
          </Route>
          <Route path="/services/:slug">
            {(params) => <ServiceDetailPage slug={params.slug} onBook={() => setIsBookingModalOpen(true)} />}
          </Route>
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy-policy" component={PrivacyPolicyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/blog">
            <BlogListPage page={1} />
          </Route>
          <Route path="/blog/page/:page">
            {(params) => <BlogListPage page={Number(params.page) || 1} />}
          </Route>
          <Route path="/blog/:slug">
            {(params) => <BlogPage slug={params.slug} />}
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>

      <footer className="relative z-10 bg-deep-forest py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <span className="flex items-baseline text-2xl font-bold tracking-tight text-white">
                  Relent
                  <span className="relative inline-flex flex-col items-center">
                    <span className="absolute top-[0.2em] h-[0.2em] w-[0.25em] bg-[#E25822]"></span>
                    <span>ı</span>
                  </span>
                  v
                </span>
              </div>
              <p className="mb-8 max-w-sm text-gray-400">
                Global technology leaders driving growth through innovation, strategy, and engineering excellence.
              </p>
              <address className="sr-only not-italic">
                100 Innovation Drive, Suite 400, San Francisco, CA 94105. contact@relentiv.com. +1 (415) 555-0198.
              </address>
            </div>
            <div>
              <h2 className="mb-6 font-bold">Explore</h2>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <Link href="/services">
                    <a className="hover:text-accent-green">Services</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a className="hover:text-accent-green">Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a className="hover:text-accent-green">About</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-bold">Connect</h2>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a className="hover:text-accent-green" href="https://linkedin.com/company/relentiv" rel="noreferrer" target="_blank">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="hover:text-accent-green" href="https://twitter.com/relentiv" rel="noreferrer" target="_blank">
                    Twitter
                  </a>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="hover:text-accent-green">Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-gray-500 md:flex-row">
            <p>© 2026 Relentiv. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy-policy">
                <a className="hover:text-white">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="hover:text-white">Terms of Service</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
