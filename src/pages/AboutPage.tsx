import React, { useEffect, useRef, useState } from "react";
import gsapModule from "gsap";
import ScrollTriggerModule from "gsap/ScrollTrigger";
import PageSeo from "../components/PageSeo";
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

const techStack = [
  {
    name: 'React',
    img: 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/social/reactt-light_1200x628.png?sfvrsn=43eb5f2a_2',
  },
  {
    name: 'Next.js',
    img: 'https://miro.medium.com/0*Gl4ff9i0WxHILWTr',
  },
  {
    name: 'TypeScript',
    img: 'https://blog.logrocket.com/wp-content/uploads/0223/05/when-to-use-never-unknown-typescript.png',
  },
  {
    name: 'Tailwind',
    img: 'https://blog.logrocket.com/wp-content/uploads/2024/03/exploring-tailwind-oxide.png',
  },
  {
    name: 'GSAP',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBwhIV_j00chhptGrQC3C8oSNGGzqWPBrkw&s',
  },
  {
    name: 'Node.js',
    img: 'https://blog.logrocket.com/wp-content/uploads/2021/09/file-processing-node-js-comprehensive-guide.png',
  },
  {
    name: 'Figma',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJeVsTXItDihpg1o8bqYBZc8t_JUJlTejx-w&s',
  },
  {
    name: 'WebGL',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&fm=webp',
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({x: event.clientX, y: event.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isPrerender) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', {y: 60, opacity: 0}, {y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out'});

      gsap.fromTo(
        '.philosophy-item',
        {y: 40, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 80%',
          },
        },
      );

      const techItems = gsap.utils.toArray<HTMLElement>('.tech-item');
      techItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {y: 20, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: techStackRef.current,
              start: 'top 85%',
            },
          },
        );
      });

      gsap.fromTo(
        '.contact-reveal',
        {y: 30, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 90%',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden font-sans text-white"
    >
      <PageSeo
        title="About Relentiv"
        description="Meet the designers, engineers, and strategists behind Relentiv’s enterprise product and digital transformation work."
        path="/about"
      />
      {/* Floating Hover Image for Tech Stack */}
      {hoveredImage && (
        <div 
          className="fixed pointer-events-none z-50 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden transition-transform duration-100 ease-out shadow-2xl shadow-black/50"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <img src={hoveredImage} alt="Tech Visualization" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Gradients and Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)] z-0 pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <section ref={heroTextRef} className="mb-32 flex min-h-[70vh] flex-col justify-center" aria-labelledby="about-hero-title">
            <p className="hero-text mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
              About Us
            </p>
            <h1 id="about-hero-title" className="hero-text mb-10 text-5xl font-medium leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl">
              We are <br />
              <span className="text-white">Relentiv.</span>
            </h1>
            <div className="hero-text max-w-3xl space-y-6">
              <p className="text-xl font-light leading-relaxed text-gray-400 md:text-2xl">
                We are a collective of designers, engineers, and strategists dedicated to pushing the boundaries of digital experiences. Founded on the principle that technology should feel intuitive and look beautiful, we partner with visionary brands to build the future.
              </p>
              <p className="text-lg font-light leading-relaxed text-gray-500 md:text-xl">
                Our approach is minimal, deliberate, and uncompromising. We strip away the unnecessary to reveal the core value of your product, ensuring every interaction is meaningful and every pixel serves a purpose. Welcome to the new standard of digital craftsmanship.
              </p>
            </div>
          </section>

          <section ref={philosophyRef} className="border-t border-white/10 py-24" aria-labelledby="about-philosophy-title">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="philosophy-item mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 md:text-sm">Our Philosophy</p>
                <h2 id="about-philosophy-title" className="philosophy-item mb-8 text-3xl font-medium tracking-tight md:text-5xl">
                  Art Meets Algorithm
                </h2>
                <p className="philosophy-item mb-6 text-lg leading-relaxed text-gray-400">
                  Our design philosophy is rooted in the belief that digital products should evoke the same timeless emotion as classical art, yet function with the precision of modern engineering.
                </p>
                <p className="philosophy-item text-lg leading-relaxed text-gray-400">
                  We draw inspiration from the world&apos;s greatest creators. Just as a painter considers every brushstroke, we obsess over every pixel, every interaction, and every line of code. We don&apos;t just build apps; we sculpt digital experiences.
                </p>
              </div>

              <div className="philosophy-item grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-transparent"></div>
                    <img
                      src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=800&auto=format&fit=crop&fm=webp"
                      alt="Picasso-inspired studio portrait"
                      className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      width="800"
                      height="1066"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70">Vision</p>
                    </div>
                  </div>
                  <div className="group relative aspect-square overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-transparent"></div>
                    <img
                      src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop&fm=webp"
                      alt="Sculptural study representing craftsmanship"
                      className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      width="800"
                      height="800"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="group relative aspect-square overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-transparent"></div>
                    <img
                      src="https://i0.wp.com/blog.vibeadventures.com/wp-content/uploads/2024/08/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg?resize=640%2C820&ssl=1"
                      alt="Portrait composition reflecting product clarity"
                      className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      width="800"
                      height="800"
                      loading="lazy"
                    />
                  </div>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-transparent"></div>
                    <img
                      src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop&fm=webp"
                      alt="Classical artwork detail expressing mastery"
                      className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      width="800"
                      height="1066"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70">Mastery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section ref={techStackRef} className="border-t border-white/10 py-32" aria-labelledby="about-tech-title">
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 md:text-sm">Our Palette</p>
              <h2 id="about-tech-title" className="text-3xl font-medium tracking-tight md:text-5xl">
                The Tech Stack Canvas
              </h2>
            </div>

            <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4 md:gap-6">
              {techStack.map((tech) => (
                <li key={tech.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredImage(tech.img)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="tech-item cursor-default rounded-full border border-white/5 bg-white/5 px-8 py-4 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    <span className="text-xl font-light tracking-wider text-gray-500 transition-colors hover:text-white md:text-2xl">
                      {tech.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section ref={contactRef} className="border-t border-white/10 py-32" aria-labelledby="about-contact-title">
            <div className="grid gap-16 md:grid-cols-2">
              <div className="contact-reveal">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 md:text-sm">Headquarters</p>
                <h2 className="mb-6 text-3xl font-medium">Bengaluru, Karnataka</h2>
                <address className="max-w-sm text-lg leading-relaxed text-gray-400 not-italic">
                  Kudlu Metro Station
                  <br />
                  Bengaluru, Karnataka, 560068
                  <br />
                  India
                </address>
              </div>

              <div className="contact-reveal flex flex-col justify-center">
                <p id="about-contact-title" className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 md:text-sm">
                  Get in Touch
                </p>
                <a href="mailto:hello@relentiv.com" className="mb-6 inline-block w-fit text-3xl font-light text-gray-400 transition-colors hover:text-white md:text-5xl">
                  hello@relentiv.com
                </a>
                {/* <a href="tel:+14155550198" className="inline-block w-fit text-2xl font-light text-gray-500 transition-colors hover:text-gray-300 md:text-4xl">
                  +1 (415) 555-0198
                </a> */}
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
