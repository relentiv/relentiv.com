/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, Link } from "wouter";
import AnalyticsTracker from "./components/AnalyticsTracker";
import BookingModal from "./components/BookingModal";
import CookieConsent from "./components/CookieConsent";
import Seo from "./components/Seo";
import ScrollRestoration from "./components/ScrollRestoration";
import BlogListPage from "./pages/BlogListPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import ClientPocPage from "./pages/ClientPocPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ServicesPage from "./pages/ServicesPage";
import TermsPage from "./pages/TermsPage";
import HowWeWork from "./components/HowWeWork";
import PageTransition from "./components/PageTransition";
import { isPrerender } from "./utils/prerender";
import Login from "./pages/admin/Login";
import LeadsDashboard from "./pages/admin/LeadsDashboard";
import LeadDetail from "./pages/admin/LeadDetail";
import ContactMessagesDashboard from "./pages/admin/ContactMessagesDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// --- PAGE TRANSITION SETTINGS ---
// Set to false to disable transitions entirely
const ENABLE_PAGE_TRANSITIONS = true;
const PAGE_TRANSITION_DURATION_SECONDS = 2.0;
const PAGE_TRANSITION_HOLD_SECONDS = 0.2;

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isAdminRoute = location.startsWith("/internal/portal");

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://relentiv.com/#organization",
          name: "Relentiv",
          url: "https://relentiv.com",
          logo: {
            "@type": "ImageObject",
            url: "https://relentiv.com/logo.png",
          },
          description:
            "Relentiv is a technology company specializing in web, mobile, AI, and product engineering services.",
          sameAs: [
            "https://linkedin.com/company/relentiv",
            "https://twitter.com/relentiv",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://relentiv.com/#website",
          url: "https://relentiv.com",
          name: "Relentiv",
          publisher: {
            "@id": "https://relentiv.com/#organization",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://relentiv.com/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        },
      ],
    },
  ];

  return (
    <div className="antialiased font-sans">
      {/* Page Transition Overlay */}
      {/* trigger */}
      <PageTransition 
        enabled={ENABLE_PAGE_TRANSITIONS && !isPrerender} 
        duration={PAGE_TRANSITION_DURATION_SECONDS}
        hold={PAGE_TRANSITION_HOLD_SECONDS}
      />
      <AnalyticsTracker />
      <ScrollRestoration />

      {!isAdminRoute ? (
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
                  <span className="flex flex-shrink-0 items-center gap-2" aria-label="Relentiv home">
                    <span className="flex items-baseline text-2xl font-bold tracking-tight text-white">
                      Relent
                      <span className="relative inline-flex flex-col items-center">
                        <span className="absolute top-[0.2em] h-[0.2em] w-[0.25em] bg-[#E25822]"></span>
                        <span>ı</span>
                      </span>
                      v
                    </span>
                  </span>
                </Link>

                <div className="hidden items-center space-x-10 text-sm font-medium text-gray-300 lg:flex">
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                  <Link href="/blog" className="transition-colors hover:text-white">
                    Insights
                  </Link>
                  <Link href="/about" className="transition-colors hover:text-white">
                    About
                  </Link>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
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
      ) : null}

      {!isAdminRoute && isMobileMenuOpen ? (
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
              <span onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Home
              </span>
            </Link>
            <Link href="/services">
              <span onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Services
              </span>
            </Link>
            <Link href="/blog">
              <span onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Insights
              </span>
            </Link>
            <Link href="/about">
              <span onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span onClick={closeMobileMenu} className="text-4xl font-medium tracking-tight text-white transition-colors hover:text-emerald-400">
                Contact
              </span>
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

      <Switch>
        <Route path="/internal/portal/login" component={Login} />
        <Route path="/internal/portal/leads/:id">
          <ProtectedRoute>
            <LeadDetail />
          </ProtectedRoute>
        </Route>
        <Route path="/internal/portal/leads">
          <ProtectedRoute>
            <LeadsDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/internal/portal/messages">
          <ProtectedRoute>
            <ContactMessagesDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/">
          <main>
            <Seo
              title="Relentiv — Engineering the Future of Tech"
              description="Relentiv partners with ambitious teams to build scalable web, app, game, and AI products with enterprise-grade engineering."
              path="/"
              schemas={homeSchemas}
            />
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
              {/* Video Background */}
              <div className="video-background">
                <iframe
                  src="https://www.youtube.com/embed/khVfTDZQ7FY?autoplay=1&mute=1&controls=0&loop=1&playlist=khVfTDZQ7FY&modestbranding=1&showinfo=0&playsinline=1&rel=0&disablekb=1&start=1&end=10"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Background Video"
                ></iframe>
              </div>

              {/* Gradient Overlay for dark background */}
              <div className="absolute inset-0 bg-black/40 z-[-1]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.4),transparent_50%)] z-[-1]"></div>

              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                {/* Hero Text Content */}
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                    </span>
                    Next-Gen Digital Transformation
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8">
                    Relentiv — Engineering the <br className="hidden md:block" />{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-200">
                      Future of Tech.
                    </span>
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-200 font-medium mb-12 max-w-2xl leading-relaxed">
                    We build web, app, game, and AI products for teams that need
                    clear execution, strong engineering, and delivery that holds
                    up after launch.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20">
                    <button 
                      onClick={() => setLocation('/services')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      Explore Services
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-3.5 border border-white/20 bg-white/5 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
                    >
                      Book a Consultation
                    </button>
                  </div>
                  {/* Trust Section */}
                  <div className="w-full max-w-3xl mx-auto">
                    <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">
                      Trusted by leading enterprises
                    </div>
                    <div className="hidden flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale invert transition-all">
                      <img
                        alt="Google"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                      <img
                        alt="Microsoft"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                      <img
                        alt="Meta"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                      <img
                        alt="Amazon"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                      <img
                        alt="Netflix"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                      <img
                        alt="Intel"
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 md:py-32 bg-[#020202] relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3">
                      Our Expertise
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
                      Specialized Tech Solutions
                    </h3>
                  </div>
                  <p className="text-gray-400 max-w-md text-sm md:text-base">
                    Delivering precision-engineered digital products that blur
                    the edge of possible.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {/* Web Development Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col h-[280px] md:h-[420px] transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                    <div className="p-6 md:p-10 relative z-20 flex-1">
                      <h4 className="text-xl md:text-2xl font-medium text-white mb-3 md:mb-4 tracking-tight">
                        Web Development
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-[95%] md:max-w-[90%]">
                        Building enterprise-grade web architectures using React,
                        Node, and Cloud-native technologies.
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] z-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/30 rounded-full blur-[60px] group-hover:bg-emerald-400/40 transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
                    </div>
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-emerald-400 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 transition-all duration-500 z-20 backdrop-blur-md">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* Mobile Solutions Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col h-[280px] md:h-[420px] transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                    <div className="p-6 md:p-10 relative z-20 flex-1">
                      <h4 className="text-xl md:text-2xl font-medium text-white mb-3 md:mb-4 tracking-tight">
                        Mobile Solutions
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-[95%] md:max-w-[90%]">
                        Native and cross-platform mobile applications that
                        provide seamless user experiences across all devices.
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] z-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-500/30 rounded-full blur-[60px] group-hover:bg-rose-400/40 transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
                    </div>
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-rose-400 group-hover:border-rose-400/50 group-hover:bg-rose-400/10 transition-all duration-500 z-20 backdrop-blur-md">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  {/* Game Engineering Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col h-[280px] md:h-[420px] transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                    <div className="p-6 md:p-10 relative z-20 flex-1">
                      <h4 className="text-xl md:text-2xl font-medium text-white mb-3 md:mb-4 tracking-tight">
                        Game Engineering
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-[95%] md:max-w-[90%]">
                        Immersive 3D/2D game development for mobile, desktop,
                        and console using Unreal & Unity engines.
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] z-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-zinc-500/20 rounded-full blur-[60px] group-hover:bg-zinc-400/30 transition-colors duration-500"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
                    </div>
                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-500 z-20 backdrop-blur-md">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Insights & Updates Section */}
            <section className="py-20 md:py-32 bg-[#020202] relative overflow-hidden border-t border-white/5">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3">
                      Insights & Updates
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
                      The Latest from the Edge
                    </h3>
                  </div>
                  <button className="px-6 py-2 rounded-full border border-white/10 text-white text-sm hover:bg-white/5 transition-colors">
                    All posts
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {/* Card 1: Stat/Transformation */}
                  <div
                    onClick={() => setLocation("/blog/fintech-transformation")}
                    className="group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/10 flex flex-col h-[480px] transition-all duration-500 hover:border-white/20 cursor-pointer"
                  >
                    {/* Gradients */}
                    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-orange-600/40 to-transparent opacity-60"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/30 rounded-full blur-[80px]"></div>
                    {/* Noise */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    ></div>

                    <div className="relative z-10 p-8 flex flex-col h-full">
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-sm text-white/80 font-medium">
                            Transformation
                          </span>
                        </div>
                        <div className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70 backdrop-blur-md">
                          FinTech
                        </div>
                      </div>

                      {/* Middle Stat */}
                      <div className="my-8">
                        <div className="flex items-start gap-2">
                          <h4 className="text-7xl font-light text-white tracking-tighter">
                            38<span className="text-5xl">%</span>
                          </h4>
                          <svg
                            className="w-6 h-6 text-white/50 mt-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M4 19l16-16m0 0v10m0-10H10"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div>
                        <h5 className="text-lg font-medium text-white mb-2">
                          Why We Rebuilt Unison's UI — And What a 38% Retention Lift Actually Looks Like
                        </h5>
                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                        Stat callout: 38% increase in 7-day active retention
                        </p>
                        <div className="flex gap-2">
                          <div className="w-16 h-10 rounded-full bg-white/10 overflow-hidden border border-white/10">
                            <img
                              src="https://picsum.photos/seed/fintech1/100/60"
                              alt="App screen"
                              className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                            />
                          </div>
                          <div className="w-16 h-10 rounded-full bg-white/10 overflow-hidden border border-white/10">
                            <img
                              src="https://picsum.photos/seed/fintech2/100/60"
                              alt="App screen"
                              className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Tech Tip / Update */}
                  <div
                    onClick={() => setLocation("/blog/ai-agents-enterprise")}
                    className="group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/10 flex flex-col h-[480px] transition-all duration-500 hover:border-white/20 cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/40 via-[#0a0a0a] to-[#0a0a0a] opacity-80"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]"></div>
                    {/* Noise */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    ></div>

                    <div className="relative z-10 p-8 flex flex-col h-full items-center justify-center text-center">
                      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                        <span className="text-sm text-white/60 font-medium">
                          Tech Update
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors backdrop-blur-md">
                          <svg
                            className="w-4 h-4 -rotate-45"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <h4 className="text-3xl font-medium text-white tracking-tight mt-12 mb-4">
                        Introducing
                        <br />
                        AI Agents for Enterprise
                      </h4>
                      <p className="text-sm text-emerald-400/80">
                        Read the documentation →
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                      <p className="text-sm text-white/80 font-medium">
                        How to integrate autonomous workflows into your existing
                        stack.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Client Story */}
                  <div
                    onClick={() => setLocation("/blog/nexus-logistics-story")}
                    className="group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/10 flex flex-col h-[480px] transition-all duration-500 hover:border-white/20 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                    {/* Noise */}
                    <div
                      className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    ></div>

                    <div className="relative z-10 p-8 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-auto">
                        <span className="text-sm text-white/60 font-medium">
                        Engineering for West
                        </span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-indigo-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div className="my-auto">
                        <svg
                          className="w-8 h-8 text-white/20 mb-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                        </svg>
                        <p className="text-xl font-medium text-white leading-snug mb-8">
                          "Your Healthcare Website Has a Legal Deadline — Most Teams Don't Know It Yet aka ADA                         "
                        </p>
                        {/* <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                            <img
                              src="https://picsum.photos/seed/ceo/100/100"
                              alt="Sarah Jenkins"
                              className="w-full h-full object-cover grayscale"
                            />
                          </div>
                          <div>
                            <h6 className="text-white text-sm font-medium">
                              Sarah Jenkins
                            </h6>
                            <p className="text-xs text-white/50">
                              CTO, Nexus Logistics
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <HowWeWork />

            {/* Bottom CTA Section */}
            <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
              {/* Rough Gradient & Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-[#050505] opacity-80"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
              {/* Noise */}
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6">
                  Ready to build the future?
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                  Let's discuss how our engineering and design expertise can accelerate your next big initiative.
                </p>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group relative px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-3"
                >
                  Book a Consultation
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </section>
          </main>
        </Route>
        <Route path="/services">
          <ServicesPage onBook={() => setIsBookingModalOpen(true)} />
        </Route>
        <Route path="/about" component={AboutPage} />
        <Route path="/blog/page/:page">
          {(params) => <BlogListPage page={Number(params.page)} />}
        </Route>
        <Route path="/blog">
          <BlogListPage page={1} />
        </Route>
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/poc/:slug">
          {(params) => <ClientPocPage slug={params.slug} onBook={() => setIsBookingModalOpen(true)} />}
        </Route>
        <Route path="/blog/:id" component={BlogPage} />
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {!isAdminRoute ? (
        <>
          {/* Footer */}
          <footer className="relative z-10 bg-deep-forest text-white py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
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
                    Kudlu Gate, Bengaluru, Karnataka
                  </address>
                </div>
                <div>
                  <h2 className="mb-6 font-bold">Explore</h2>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li>
                      <Link href="/services" className="hover:text-accent-green">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-accent-green">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-accent-green">
                        About
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
                      <a className="hover:text-accent-green" href="https://www.instagram.com/relentiv.global" rel="noreferrer" target="_blank">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-accent-green">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-gray-500 md:flex-row">
                <p>© 2026 Relentiv. All rights reserved.</p>
                <div className="flex gap-8">
                  <Link href="/privacy-policy">
                    <span className="hover:text-white">Privacy Policy</span>
                  </Link>
                  <Link href="/terms">
                    <span className="hover:text-white">Terms of Service</span>
                  </Link>
                </div>
              </div>
            </div>
          </footer>

          <CookieConsent />
          <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        </>
      ) : null}
    </div>
  );
}
