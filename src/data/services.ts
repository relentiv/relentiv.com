export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  metaDescription: string;
  tags: string[];
  features: string[];
}

export const services: Service[] = [
  {
    id: '01',
    slug: 'web-development',
    title: 'Web Development',
    summary: 'Enterprise-grade web applications built for performance, reliability, and long-term maintainability.',
    description:
      'We build web products that need to work in the real world: SaaS platforms, internal tools, dashboards, and marketing sites. Our focus is on frontend performance, clean APIs, secure infrastructure, and code your team can maintain after launch.',
    metaDescription:
      'Relentiv builds secure, scalable web platforms with React, TypeScript, and cloud-native architecture for growing teams.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    features: ['Custom Web Applications', 'E-commerce Platforms', 'Progressive Web Apps (PWA)', 'API Development & Integration'],
  },
  {
    id: '02',
    slug: 'mobile-solutions',
    title: 'Mobile Solutions',
    summary: 'Native and cross-platform mobile products designed for speed, stability, and adoption.',
    description:
      'We design and build mobile apps for iOS and Android using native or cross-platform stacks, depending on the product and team. That includes product UX, release workflows, performance tuning, and the operational work required to keep shipping reliably.',
    metaDescription:
      'Relentiv designs and develops mobile apps for iOS and Android with reliable delivery across native and cross-platform stacks.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    features: ['Native App Development', 'Cross-Platform Solutions', 'Mobile UI/UX Design', 'App Store Optimization'],
  },
  {
    id: '03',
    slug: 'game-engineering',
    title: 'Game Engineering',
    summary: 'High-performance game production for mobile, desktop, and immersive interactive environments.',
    description:
      'We build 2D and 3D game experiences for mobile, desktop, and interactive environments, with attention to frame rate, asset pipelines, gameplay systems, and platform constraints from the start.',
    metaDescription:
      'Relentiv delivers 2D, 3D, AR, and multiplayer game engineering with Unity, Unreal, and performance-first production workflows.',
    tags: ['Unity', 'Unreal Engine', 'WebGL', 'C# / C++'],
    features: ['3D/2D Game Development', 'AR/VR Experiences', 'Multiplayer Architecture', 'Game Asset Creation'],
  },
  {
    id: '04',
    slug: 'legacy-modernization',
    title: 'Legacy Modernization',
    summary: 'Modern architecture and migration work for aging systems that need a safer path forward.',
    description:
      'We help teams untangle aging systems without forcing a reckless rewrite. That can mean refactoring critical modules, replacing brittle dependencies, improving deployment safety, and planning migrations in stages that reduce operational risk.',
    metaDescription:
      'Relentiv modernizes legacy systems through refactoring, migration, architecture upgrades, and zero-downtime transition planning.',
    tags: ['Refactoring', 'Cloud Migration', 'Architecture', 'Performance'],
    features: ['Codebase Refactoring', 'Monolith to Microservices', 'Database Migration', 'Security Audits'],
  },
  {
    id: '05',
    slug: 'ui-ux-design',
    title: 'UI/UX Figma Design',
    summary: 'Design systems and product interfaces built to support clarity, conversion, and engineering handoff.',
    description:
      'We design product flows, interface systems, and Figma files that are meant to be built, not just presented. The work focuses on usability, visual consistency, edge cases, and handoff quality for engineering teams.',
    metaDescription:
      'Relentiv creates user interface systems, UX flows, and Figma design assets that improve clarity and conversion.',
    tags: ['Figma', 'Prototyping', 'Research', 'Design Systems'],
    features: ['User Interface Design', 'User Experience Research', 'Interactive Prototyping', 'Scalable Design Systems'],
  },
  {
    id: '06',
    slug: 'embedded-teams',
    title: 'Embedded Teams',
    summary: 'Dedicated engineers and designers who plug into existing delivery teams without slowing velocity.',
    description:
      'We place senior engineers and designers into existing teams where more delivery capacity is needed. They work inside your tools, planning cycles, and code review process instead of operating as a disconnected external pod.',
    metaDescription:
      'Relentiv extends in-house teams with embedded product, design, and engineering talent for flexible delivery capacity.',
    tags: ['Staff Augmentation', 'Dedicated Teams', 'Agile', 'Scaling'],
    features: ['Senior Developers', 'Product Designers', 'Project Managers', 'Flexible Scaling'],
  },
  {
    id: '07',
    slug: 'tech-consultancy',
    title: 'Tech Consultancy',
    summary: 'Strategic technical guidance for architecture, roadmap, risk, and executive decision support.',
    description:
      'We advise on architecture, delivery risk, technical due diligence, and roadmap decisions when the stakes are high and the tradeoffs are not obvious. That ranges from short audits to ongoing senior technical guidance for leadership teams.',
    metaDescription:
      'Relentiv provides technical consulting for architecture reviews, due diligence, product roadmaps, and executive decision support.',
    tags: ['Strategy', 'Architecture', 'CTO-as-a-Service', 'Audits'],
    features: ['Technical Due Diligence', 'System Architecture Design', 'Security & Compliance', 'Technology Roadmapping'],
  },
  {
    id: '08',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    summary: 'Applied AI systems that automate workflows, improve insight quality, and fit existing operations.',
    description:
      'We build AI systems that connect to real workflows, including LLM-powered tools, internal copilots, predictive models, and automation pipelines. The goal is to make them usable inside your existing operations rather than leaving them as isolated demos.',
    metaDescription:
      'Relentiv implements AI agents, analytics pipelines, and automation systems that connect to real business processes.',
    tags: ['OpenAI', 'LLMs', 'Python', 'Data Science'],
    features: ['Custom AI Agents', 'Process Automation', 'Predictive Analytics', 'NLP Integration'],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
