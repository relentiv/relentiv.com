import React, { useEffect, useRef } from "react";
import gsapModule from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageSeo from "../components/PageSeo";
import { services } from "../data/services";
import { isPrerender } from "../utils/prerender";

const gsapCandidate = gsapModule as unknown as typeof import("gsap").gsap & {
  gsap?: typeof import("gsap").gsap;
};
const gsap = typeof gsapCandidate.registerPlugin === "function" ? gsapCandidate : gsapCandidate.gsap;
const scrollTriggerCandidate = ScrollTriggerModule as unknown as {
  default?: typeof import("gsap/ScrollTrigger").ScrollTrigger | {
    ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  };
  ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};
const ScrollTrigger =
  scrollTriggerCandidate.ScrollTrigger ??
  (typeof scrollTriggerCandidate.default === "function"
    ? scrollTriggerCandidate.default
    : scrollTriggerCandidate.default?.ScrollTrigger);

if (gsap?.registerPlugin && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage({onBook}: {onBook: () => void}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isPrerender) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim', {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out'});

      const serviceRows = gsap.utils.toArray<HTMLElement>('.service-row');
      serviceRows.forEach((row) => {
        gsap.fromTo(
          row,
          {y: 50, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            },
          },
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden font-sans text-white">
      <PageSeo
        title="Services"
        description="Explore Relentiv services across web, mobile, games, AI, legacy modernization, embedded teams, and technical consulting."
        path="/services"
      />
      {/* Gradients and Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-black z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <section aria-labelledby="services-page-title" className="mb-20 flex min-h-[50vh] flex-col justify-center">
            <p className="hero-anim mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
              Our Expertise
            </p>
            <h1 id="services-page-title" className="hero-anim mb-8 text-5xl font-medium leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl">
              Capabilities that <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">define the future.</span>
            </h1>
            <p className="hero-anim max-w-3xl text-xl font-light leading-relaxed text-gray-400 md:text-2xl">
              From complex web architectures to immersive game engineering, we provide end-to-end digital solutions designed to scale, perform, and captivate.
            </p>
          </section>

          <section aria-labelledby="services-list-title" className="border-t border-white/10">
            <h2 id="services-list-title" className="sr-only">
              Services list
            </h2>
            <ol>
              {services.map((service) => (
                <li key={service.id} className="service-row grid grid-cols-1 items-start gap-8 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-12 md:py-24 group">
                  <div className="font-mono text-xl text-emerald-500/50 transition-colors group-hover:text-emerald-400 md:text-2xl lg:col-span-1">
                    {service.id}
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="mb-6 text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-emerald-50 md:text-4xl">
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7 lg:pl-8">
                    <p className="mb-10 text-lg font-light leading-relaxed text-gray-400 md:text-xl">{service.description}</p>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500/70" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="services-cta-title" className="relative mt-20 flex flex-col items-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 py-32 text-center backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 px-6">
              <h2 id="services-cta-title" className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                Ready to transform your ideas?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                Partner with us to build scalable, high-performance digital products that put you ahead of the curve.
              </p>
              <button
                type="button"
                onClick={onBook}
                className="group relative mx-auto flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>
        </div>
      </main>
  );
}
