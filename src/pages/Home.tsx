import {Link, useLocation} from 'wouter';
import HowWeWork from '../components/HowWeWork';
import Seo from '../components/Seo';
import {buildBreadcrumbSchema, CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL} from '../lib/site';

interface HomePageProps {
  onBook: () => void;
}

export default function HomePage({onBook}: HomePageProps) {
  const [, setLocation] = useLocation();

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
      },
      sameAs: ['https://linkedin.com/company/relentiv', 'https://twitter.com/relentiv'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  ];

  return (
    <>
      <Seo
        title="Relentiv | IT Services & Digital Solutions"
        description="Relentiv is a results-driven service company delivering web, mobile, AI, and product engineering solutions for growing businesses."
        path="/"
        image={DEFAULT_OG_IMAGE}
        schemas={homeSchemas}
      />
      <main id="main-content">
        <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32" aria-labelledby="home-hero-title">
          <div className="video-background" aria-hidden="true">
            <iframe
              src="https://www.youtube.com/embed/khVfTDZQ7FY?autoplay=1&mute=1&controls=0&loop=1&playlist=khVfTDZQ7FY&modestbranding=1&showinfo=0&playsinline=1&rel=0&disablekb=1&start=1&end=10"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Relentiv hero background video"
            ></iframe>
          </div>

          <div className="absolute inset-0 z-[-1] bg-black/40"></div>
          <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.4),transparent_50%)]"></div>

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <div className="flex flex-col items-center">
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green"></span>
                </span>
                Next-Gen Digital Transformation
              </p>
              <h1 id="home-hero-title" className="mb-8 text-5xl font-extrabold leading-[1.1] text-white lg:text-7xl">
                Engineering the <br className="hidden md:block" />{' '}
                <span className="bg-gradient-to-r from-accent-green to-emerald-200 bg-clip-text text-transparent">
                  Future of Tech.
                </span>
              </h1>
              <p className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-gray-200 lg:text-xl">
                We empower enterprises with cutting-edge Web, App, and Game development. Our consultancy bridges the gap between visionary ideas and scalable digital reality.
              </p>
              <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setLocation('/services')}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:w-auto"
                >
                  Explore Services
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onBook}
                  className="w-full rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 backdrop-blur-md sm:w-auto"
                >
                  Book a Consultation
                </button>
              </div>

              <aside className="mx-auto w-full max-w-3xl" aria-labelledby="trusted-by-title">
                <h2 id="trusted-by-title" className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Trusted by leading enterprises
                </h2>
                <ul className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale invert transition-all md:gap-12">
                  {['Google', 'Microsoft', 'Meta', 'Amazon', 'Netflix', 'Intel'].map((company) => (
                    <li key={company}>
                      <img
                        alt={`${company} partner reference`}
                        className="h-6 md:h-7"
                        src="https://placeholder.pics/svg/300"
                        width="300"
                        height="70"
                        loading="lazy"
                      />
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#020202] py-20 md:py-32" aria-labelledby="home-services-title">
          <div className="absolute top-0 left-1/2 h-[1px] w-full max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute top-0 left-1/2 h-[200px] w-full max-w-xl -translate-x-1/2 rounded-full bg-white/5 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 md:text-sm">Our Expertise</p>
                <h2 id="home-services-title" className="text-3xl font-medium tracking-tight text-white md:text-5xl">
                  Specialized Tech Solutions
                </h2>
              </div>
              <p className="max-w-md text-sm text-gray-400 md:text-base">
                Delivering precision-engineered digital products that blur the edge of possible.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {[
                {
                  title: 'Web Development',
                  description: 'Building enterprise-grade web architectures using React, Node, and cloud-native technologies.',
                  cardClass:
                    'from-emerald-900/60 to-transparent group-hover:opacity-100 bg-emerald-500/30 group-hover:bg-emerald-400/40 text-emerald-400 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10',
                },
                {
                  title: 'Mobile Solutions',
                  description: 'Native and cross-platform mobile applications that provide seamless user experiences across all devices.',
                  cardClass:
                    'from-rose-900/60 to-transparent group-hover:opacity-100 bg-rose-500/30 group-hover:bg-rose-400/40 text-rose-400 group-hover:border-rose-400/50 group-hover:bg-rose-400/10',
                },
                {
                  title: 'Game Engineering',
                  description: 'Immersive 3D/2D game development for mobile, desktop, and console using Unreal and Unity engines.',
                  cardClass:
                    'from-zinc-800/60 to-transparent group-hover:opacity-100 bg-zinc-500/20 group-hover:bg-zinc-400/30 text-white group-hover:border-white/50 group-hover:bg-white/10',
                },
              ].map((item) => (
                <article key={item.title} className="group relative flex h-[280px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 md:h-[420px]">
                  <div className="relative z-20 flex-1 p-6 md:p-10">
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:mb-4 md:text-2xl">{item.title}</h3>
                    <p className="max-w-[95%] text-sm leading-relaxed text-gray-400 md:max-w-[90%] md:text-base">{item.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-[70%]">
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-80 transition-opacity duration-500 ${item.cardClass.split(' ')[0]}`}></div>
                    <div className={`absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-[60px] transition-colors duration-500 ${item.cardClass.split(' ')[2]}`}></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
                  </div>
                  <div className={`absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 backdrop-blur-md transition-all duration-500 md:bottom-8 md:right-8 md:h-12 md:w-12 ${item.cardClass.split(' ').slice(3).join(' ')}`}>
                    <svg className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/5 bg-[#020202] py-20 md:py-32" aria-labelledby="home-blog-title">
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 md:text-sm">Insights &amp; Updates</p>
                <h2 id="home-blog-title" className="text-3xl font-medium tracking-tight text-white md:text-5xl">
                  The Latest from the Edge
                </h2>
              </div>
              <Link href="/blog">
                <a className="rounded-full border border-white/10 px-6 py-2 text-sm text-white transition-colors hover:bg-white/5">
                  All posts
                </a>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              <article className="group relative flex h-[480px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/20">
                <Link href="/blog/fintech-transformation">
                  <a className="absolute inset-0 z-30" aria-label="Read Increase in user retention"></a>
                </Link>
                <div className="absolute top-0 left-0 h-2/3 w-full bg-gradient-to-b from-orange-600/40 to-transparent opacity-60"></div>
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-orange-500/30 blur-[80px]"></div>
                <div
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                ></div>

                <div className="relative z-10 flex h-full flex-col p-8">
                  <div className="mb-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white/80">Transformation</span>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-md">FinTech</div>
                  </div>

                  <div className="my-8">
                    <div className="flex items-start gap-2">
                      <p className="text-7xl font-light tracking-tighter text-white">
                        300<span className="text-5xl">%</span>
                      </p>
                      <svg className="mt-2 h-6 w-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 19l16-16m0 0v10m0-10H10"></path>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium text-white">Increase in user retention</h3>
                    <p className="mb-6 text-sm leading-relaxed text-white/60">
                      Redesigned the core banking flow for a leading European fintech, resulting in unprecedented engagement.
                    </p>
                    <div className="flex gap-2">
                      {[1, 2].map((index) => (
                        <div key={index} className="h-10 w-16 overflow-hidden rounded-full border border-white/10 bg-white/10">
                          <img
                            src={`https://picsum.photos/seed/fintech${index}/100/60.webp`}
                            alt={`Fintech interface preview ${index}`}
                            className="h-full w-full object-cover opacity-70 mix-blend-luminosity"
                            width="100"
                            height="60"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className="group relative flex h-[480px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/20">
                <Link href="/blog/ai-agents-enterprise">
                  <a className="absolute inset-0 z-30" aria-label="Read Introducing AI Agents for Enterprise"></a>
                </Link>
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-emerald-900/40 via-[#0a0a0a] to-[#0a0a0a] opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]"></div>
                <div
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                ></div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">Tech Update</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 backdrop-blur-md transition-colors group-hover:text-white">
                      <svg className="h-4 w-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>

                  <h3 className="mt-12 mb-4 text-3xl font-medium tracking-tight text-white">
                    Introducing
                    <br />
                    AI Agents for Enterprise
                  </h3>
                  <p className="text-sm text-emerald-400/80">Read the documentation →</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                  <p className="text-sm font-medium text-white/80">
                    How to integrate autonomous workflows into your existing stack.
                  </p>
                </div>
              </article>

              <article className="group relative flex h-[480px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/20">
                <Link href="/blog/nexus-logistics-story">
                  <a className="absolute inset-0 z-30" aria-label="Read Nexus Logistics story"></a>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]"></div>
                <div
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                ></div>

                <div className="relative z-10 flex h-full flex-col p-8">
                  <div className="mb-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">Client Story</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} className="h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="my-auto">
                    <svg className="mb-6 h-8 w-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                    </svg>
                    <blockquote className="mb-8 text-xl font-medium leading-snug text-white">
                      <p>"Relentiv completely re-engineered our approach to digital product design."</p>
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
                        <img
                          src="https://picsum.photos/seed/ceo/100/100.webp"
                          alt="Sarah Jenkins, CTO at Nexus Logistics"
                          className="h-full w-full object-cover grayscale"
                          width="100"
                          height="100"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">Sarah Jenkins</h3>
                        <p className="text-xs text-white/50">CTO, Nexus Logistics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <HowWeWork />

        <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-24 md:py-32" aria-labelledby="home-cta-title">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-[#050505] opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none"></div>
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          ></div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <h2 id="home-cta-title" className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
              Ready to build the future?
            </h2>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
              Let&apos;s discuss how our engineering and design expertise can accelerate your next big initiative.
            </p>
            <button
              type="button"
              onClick={onBook}
              className="group relative flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            >
              Book a Consultation
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
