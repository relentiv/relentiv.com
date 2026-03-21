import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Development",
    description: "We build scalable, high-performance web applications tailored to your enterprise needs. From complex SaaS platforms to immersive marketing sites, our web architectures are built for speed, security, and seamless user experiences.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    features: ["Custom Web Applications", "E-commerce Platforms", "Progressive Web Apps (PWA)", "API Development & Integration"]
  },
  {
    id: "02",
    title: "Mobile Solutions",
    description: "Deliver native-like experiences across all devices. We engineer iOS and Android applications that engage users and drive business growth, utilizing the latest cross-platform and native technologies.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    features: ["Native App Development", "Cross-Platform Solutions", "Mobile UI/UX Design", "App Store Optimization"]
  },
  {
    id: "03",
    title: "Game Engineering",
    description: "Immersive 2D and 3D game development for mobile, desktop, and console. We blend captivating storytelling with cutting-edge graphics and optimized performance.",
    tags: ["Unity", "Unreal Engine", "WebGL", "C# / C++"],
    features: ["3D/2D Game Development", "AR/VR Experiences", "Multiplayer Architecture", "Game Asset Creation"]
  },
  {
    id: "04",
    title: "Legacy Modernization",
    description: "Transform outdated codebases into modern, maintainable, and scalable architectures. We seamlessly migrate your legacy systems to new technologies with zero downtime.",
    tags: ["Refactoring", "Cloud Migration", "Architecture", "Performance"],
    features: ["Codebase Refactoring", "Monolith to Microservices", "Database Migration", "Security Audits"]
  },
  {
    id: "05",
    title: "UI/UX Figma Design",
    description: "Data-driven design that puts the user first. We craft intuitive, beautiful interfaces in Figma that elevate your brand and maximize conversion rates.",
    tags: ["Figma", "Prototyping", "Research", "Design Systems"],
    features: ["User Interface Design", "User Experience Research", "Interactive Prototyping", "Scalable Design Systems"]
  },
  {
    id: "06",
    title: "Embedded Teams",
    description: "Scale your engineering and design capacity instantly. We provide elite, vetted freelance developers and designers to integrate seamlessly into your existing workflows.",
    tags: ["Staff Augmentation", "Dedicated Teams", "Agile", "Scaling"],
    features: ["Senior Developers", "Product Designers", "Project Managers", "Flexible Scaling"]
  },
  {
    id: "07",
    title: "Tech Consultancy",
    description: "Strategic guidance for complex technical challenges. From architecture reviews to CTO-as-a-service, we help you make informed decisions that align with your business goals.",
    tags: ["Strategy", "Architecture", "CTO-as-a-Service", "Audits"],
    features: ["Technical Due Diligence", "System Architecture Design", "Security & Compliance", "Technology Roadmapping"]
  },
  {
    id: "08",
    title: "AI & Machine Learning",
    description: "Unlock the power of artificial intelligence. We integrate LLMs, predictive analytics, and automated workflows to give your business a competitive edge.",
    tags: ["OpenAI", "LLMs", "Python", "Data Science"],
    features: ["Custom AI Agents", "Process Automation", "Predictive Analytics", "NLP Integration"]
  }
];

export default function ServicesPage({ onBook }: { onBook: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

      const serviceRows = gsap.utils.toArray(".service-row");
      serviceRows.forEach((row: any) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden font-sans text-white">
      {/* Gradients and Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-black z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <section className="min-h-[50vh] flex flex-col justify-center mb-20">
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest mb-8 w-fit backdrop-blur-sm">
            Our Expertise
          </div>
          <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-8">
            Capabilities that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
              define the future.
            </span>
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
            From complex web architectures to immersive game engineering, we provide end-to-end digital solutions designed to scale, perform, and captivate.
          </p>
        </section>

        {/* Services List */}
        <section className="border-t border-white/10">
          {services.map((service) => (
            <div key={service.id} className="service-row py-16 md:py-24 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group">
              <div className="lg:col-span-1 text-emerald-500/50 font-mono text-xl md:text-2xl group-hover:text-emerald-400 transition-colors">
                {service.id}
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 tracking-tight group-hover:text-emerald-50 transition-colors">
                  {service.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-8">
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 font-light">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500/70 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="relative py-32 mt-20 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm text-center flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 px-6">
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">
              Ready to transform your ideas?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Partner with us to build scalable, high-performance digital products that put you ahead of the curve.
            </p>
            <button 
              onClick={onBook}
              className="group relative px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-3 mx-auto"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
