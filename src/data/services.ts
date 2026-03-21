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
      'We build scalable, high-performance web applications tailored to your enterprise needs. From complex SaaS platforms to immersive marketing sites, our web architectures are built for speed, security, and seamless user experiences.',
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
      'Deliver native-like experiences across all devices. We engineer iOS and Android applications that engage users and drive business growth, utilizing the latest cross-platform and native technologies.',
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
      'Immersive 2D and 3D game development for mobile, desktop, and console. We blend captivating storytelling with advanced graphics pipelines and optimized performance.',
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
      'Transform outdated codebases into modern, maintainable, and scalable architectures. We migrate legacy systems to new technologies with a delivery plan built around risk reduction.',
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
      'Data-driven design that puts the user first. We craft intuitive interfaces in Figma that strengthen brand perception and support measurable product outcomes.',
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
      'Scale your engineering and design capacity quickly. We provide senior developers and designers who integrate into your workflows and delivery cadence.',
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
      'Strategic guidance for complex technical challenges. From architecture reviews to CTO-as-a-service, we help you make informed decisions that align with business priorities.',
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
      'Unlock the practical value of artificial intelligence. We integrate LLM workflows, predictive analytics, and automation systems that support measurable business outcomes.',
    metaDescription:
      'Relentiv implements AI agents, analytics pipelines, and automation systems that connect to real business processes.',
    tags: ['OpenAI', 'LLMs', 'Python', 'Data Science'],
    features: ['Custom AI Agents', 'Process Automation', 'Predictive Analytics', 'NLP Integration'],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
