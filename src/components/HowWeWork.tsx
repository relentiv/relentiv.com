import {
  Atom,
  Box,
  FileCode2,
  Hexagon,
  Rocket,
  ShieldCheck,
  TestTubes,
  Triangle,
  Workflow,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery & Architecture',
    desc: 'We align on business goals, map out technical requirements, and design scalable cloud architectures.',
    icons: [
      {icon: Hexagon, label: 'Node.js'},
      {icon: Workflow, label: 'System Design'},
    ],
    color: 'from-blue-500/20 to-transparent',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  {
    num: '02',
    title: 'Agile Sprint Development',
    desc: 'Iterative, high-velocity coding using modern frameworks to deliver robust features incrementally.',
    icons: [
      {icon: FileCode2, label: 'JavaScript / TS'},
      {icon: Atom, label: 'React'},
      {icon: Triangle, label: 'Next.js'},
    ],
    color: 'from-emerald-500/20 to-transparent',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    num: '03',
    title: 'QA & Security Testing',
    desc: 'Automated end-to-end testing, vulnerability scanning, and performance profiling.',
    icons: [
      {icon: ShieldCheck, label: 'Security'},
      {icon: TestTubes, label: 'Playwright'},
    ],
    color: 'from-purple-500/20 to-transparent',
    accent: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  {
    num: '04',
    title: 'Deployment & Handoff',
    desc: 'Zero-downtime delivery, practical documentation, and a clean handoff process for internal teams.',
    icons: [
      {icon: Box, label: 'Jenkins'},
      {icon: Rocket, label: 'AWS / Cloud'},
    ],
    color: 'from-orange-500/20 to-transparent',
    accent: 'text-orange-400',
    border: 'border-orange-500/20',
  },
];

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#020202] py-20 md:py-32" aria-labelledby="how-we-work-title">
      <div className="absolute top-0 left-1/2 h-[1px] w-full max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 h-[200px] w-full max-w-xl -translate-x-1/2 rounded-full bg-white/5 blur-[100px] pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 md:mb-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 md:text-sm">How We Work</p>
          <h2 id="how-we-work-title" className="text-3xl font-medium tracking-tight text-white md:text-5xl">
            Enterprise Predictability
          </h2>
          <p className="mt-6 max-w-xl text-sm text-gray-400 md:text-base">
            Our engagement model is designed to deliver precision-engineered digital products with complete transparency at every step.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[1.5rem] top-[1.5rem] z-0 hidden h-[1px] w-[calc(100%-3rem)] bg-white/10 md:block"></div>

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.num} className="group relative">
                {index !== steps.length - 1 ? (
                  <div className="absolute left-6 top-12 z-0 h-full w-[1px] bg-white/10 md:hidden"></div>
                ) : null}

                <div className="flex flex-row gap-6 md:flex-col md:gap-0">
                  <div className="relative mb-0 flex-shrink-0 md:mb-10">
                    <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-[#0a0a0a] transition-transform duration-500 group-hover:scale-110 ${step.border}`}>
                      <span className={`text-sm font-bold ${step.accent}`}>{step.num}</span>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${step.color}`}></div>
                    </div>
                  </div>

                  <div className="pb-12 pt-2 md:pb-0 md:pt-0">
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-white">{step.title}</h3>
                    <p className="mb-6 min-h-[80px] text-sm leading-relaxed text-gray-400">{step.desc}</p>

                    <ul className="flex items-center gap-3">
                      {step.icons.map((iconObj) => (
                        <li key={iconObj.label} className="group/icon relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:bg-white/10 hover:text-white">
                            <iconObj.icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] font-bold text-black opacity-0 transition-opacity group-hover/icon:opacity-100 z-20">
                            {iconObj.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
