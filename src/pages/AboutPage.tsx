import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        ".hero-text",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
      );

      // Philosophy Section Animation
      gsap.fromTo(
        ".philosophy-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 80%",
          },
        },
      );

      // Tech Stack Art Animation
      const techItems = gsap.utils.toArray(".tech-item");
      techItems.forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: techStackRef.current,
              start: "top 85%",
            },
          },
        );
      });

      // Contact Animation
      gsap.fromTo(
        ".contact-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 90%",
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero Section */}
        <section
          ref={heroTextRef}
          className="min-h-[70vh] flex flex-col justify-center mb-32"
        >
          <div className="hero-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest mb-8 w-fit backdrop-blur-sm">
            About Us
          </div>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-10">
            We are <br />
            <span className="text-white">
              Relentiv.
            </span>
          </h1>
          <div className="hero-text space-y-6 max-w-3xl">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
              We are a collective of designers, engineers, and strategists dedicated to pushing the boundaries of digital experiences. Founded on the principle that technology should feel intuitive and look beautiful, we partner with visionary brands to build the future.
            </p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              Our approach is minimal, deliberate, and uncompromising. We strip away the unnecessary to reveal the core value of your product, ensuring every interaction is meaningful and every pixel serves a purpose. Welcome to the new standard of digital craftsmanship.
            </p>
          </div>
        </section>

        {/* Philosophy & The Masters */}
        <section ref={philosophyRef} className="py-24 border-t border-white/10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="philosophy-item text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.3em] mb-4">
                Our Philosophy
              </h2>
              <h3 className="philosophy-item text-3xl md:text-5xl font-medium mb-8 tracking-tight">
                Art Meets Algorithm
              </h3>
              <p className="philosophy-item text-gray-400 text-lg leading-relaxed mb-6">
                Our design philosophy is rooted in the belief that digital
                products should evoke the same timeless emotion as classical
                art, yet function with the precision of modern engineering.
              </p>
              <p className="philosophy-item text-gray-400 text-lg leading-relaxed">
                We draw inspiration from the world's greatest creators. Just as
                a painter considers every brushstroke, we obsess over every
                pixel, every interaction, and every line of code. We don't just
                build apps; we sculpt digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 philosophy-item">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=800&auto=format&fit=crop"
                    alt="Picasso inspired"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-xs font-bold tracking-widest uppercase text-white/70">
                      Vision
                    </p>
                  </div>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop"
                    alt="Sculpture"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1578301978693-85fa9c03fa37?q=80&w=800&auto=format&fit=crop"
                    alt="Mona Lisa inspired"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop"
                    alt="Classic Art"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-xs font-bold tracking-widest uppercase text-white/70">
                      Mastery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack as Art */}
        <section ref={techStackRef} className="py-32 border-t border-white/10">
          <div className="text-center mb-20">
            <h2 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.3em] mb-4">
              Our Palette
            </h2>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
              The Tech Stack Canvas
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "React",
                img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
              },
              {
                name: "Next.js",
                img: "https://images.unsplash.com/photo-1618477247222-ac60c6218780?w=600&q=80",
              },
              {
                name: "TypeScript",
                img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
              },
              {
                name: "Tailwind",
                img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80",
              },
              {
                name: "GSAP",
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
              },
              {
                name: "Node.js",
                img: "https://images.unsplash.com/photo-1627398240309-08b06f9d94fd?w=600&q=80",
              },
              {
                name: "Figma",
                img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
              },
              {
                name: "WebGL",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
              },
            ].map((tech, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredImage(tech.img)}
                onMouseLeave={() => setHoveredImage(null)}
                className="tech-item px-8 py-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="text-xl md:text-2xl font-light tracking-wider text-gray-500 hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Contact */}
        <section ref={contactRef} className="py-32 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="contact-reveal">
              <h2 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.3em] mb-4">Headquarters</h2>
              <h3 className="text-3xl font-medium mb-6">San Francisco, CA</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                100 Innovation Drive<br/>
                Suite 400<br/>
                San Francisco, CA 94105<br/>
                United States
              </p>
            </div>
            
            <div className="contact-reveal flex flex-col justify-center">
              <h2 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-[0.3em] mb-4">Get in Touch</h2>
              <a href="mailto:hello@relentiv.com" className="text-3xl md:text-5xl font-light hover:text-white transition-colors mb-6 inline-block w-fit text-gray-400">
                hello@relentiv.com
              </a>
              <a href="tel:+14155550198" className="text-2xl md:text-4xl font-light text-gray-500 hover:text-gray-300 transition-colors inline-block w-fit">
                +1 (415) 555-0198
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
