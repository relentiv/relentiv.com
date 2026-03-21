import React from 'react';
import { 
  Atom, 
  Hexagon, 
  Triangle, 
  FileCode2, 
  ShieldCheck, 
  Server, 
  Workflow, 
  Rocket,
  TestTubes,
  Box
} from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Architecture",
      desc: "We align on business goals, map out technical requirements, and design scalable cloud architectures.",
      icons: [
        { icon: Hexagon, label: "Node.js" },
        { icon: Workflow, label: "System Design" }
      ],
      color: "from-blue-500/20 to-transparent",
      accent: "text-blue-400",
      border: "border-blue-500/20"
    },
    {
      num: "02",
      title: "Agile Sprint Development",
      desc: "Iterative, high-velocity coding using modern frameworks to deliver robust features incrementally.",
      icons: [
        { icon: FileCode2, label: "JavaScript / TS" },
        { icon: Atom, label: "React" },
        { icon: Triangle, label: "Next.js" }
      ],
      color: "from-emerald-500/20 to-transparent",
      accent: "text-emerald-400",
      border: "border-emerald-500/20"
    },
    {
      num: "03",
      title: "QA & Security Testing",
      desc: "Automated end-to-end testing, vulnerability scanning, and performance profiling.",
      icons: [
        { icon: ShieldCheck, label: "Security" },
        { icon: TestTubes, label: "Playwright" }
      ],
      color: "from-purple-500/20 to-transparent",
      accent: "text-purple-400",
      border: "border-purple-500/20"
    },
    {
      num: "04",
      title: "Deployment & Handoff",
      desc: "Zero-downtime CI/CD deployment, comprehensive documentation, and seamless knowledge transfer.",
      icons: [
        { icon: Box, label: "Jenkins" },
        { icon: Rocket, label: "AWS / Cloud" }
      ],
      color: "from-orange-500/20 to-transparent",
      accent: "text-orange-400",
      border: "border-orange-500/20"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#020202] relative overflow-hidden border-t border-white/5">
      {/* Gradients and Noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3">How We Work</h2>
          <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">Enterprise Predictability</h3>
          <p className="text-gray-400 max-w-xl mt-6 text-sm md:text-base">
            Our engagement model is designed to deliver precision-engineered digital products with complete transparency at every step.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[1.5rem] left-[1.5rem] w-[calc(100%-3rem)] h-[1px] bg-white/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connecting Line (Mobile) */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-[1px] h-full absolute left-6 top-12 bg-white/10 z-0"></div>
                )}

                <div className="flex flex-row md:flex-col gap-6 md:gap-0">
                  {/* Step Number & Node */}
                  <div className="flex-shrink-0 mb-0 md:mb-10 relative">
                    <div className={`w-12 h-12 rounded-full bg-[#0a0a0a] border ${step.border} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                      <span className={`text-sm font-bold ${step.accent}`}>{step.num}</span>
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pb-12 md:pb-0 pt-2 md:pt-0">
                    <h4 className="text-xl font-medium text-white mb-3 tracking-tight">{step.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 md:min-h-[80px]">
                      {step.desc}
                    </p>

                    {/* Tech Stack Icons */}
                    <div className="flex items-center gap-3">
                      {step.icons.map((IconObj, i) => (
                        <div key={i} className="group/icon relative">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300">
                            <IconObj.icon className="w-4 h-4" />
                          </div>
                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                            {IconObj.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
