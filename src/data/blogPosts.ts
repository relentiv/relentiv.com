export interface BlogPost {
  slug: string;
  type: string;
  tag?: string;
  title: string;
  stat?: string;
  description: string;
  metaDescription: string;
  themeColor: 'orange' | 'emerald' | 'indigo' | 'rose' | 'zinc';
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  videoUrl?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'fintech-transformation',
    type: 'Transformation',
    tag: 'FinTech',
    title: 'Increase in user retention',
    stat: '300%',
    description:
      'Redesigned the core banking flow for a leading European fintech, resulting in stronger engagement and clearer transaction completion.',
    metaDescription:
      'A fintech redesign engagement that improved retention, reduced transaction drop-off, and clarified complex banking flows.',
    themeColor: 'orange',
    author: 'Relentiv Editorial Team',
    publishedAt: '2026-02-12',
    updatedAt: '2026-03-08',
    image: '/og-image.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    content: `
      <p>The financial technology sector is evolving at a rapid pace. For a leading European fintech client, the challenge was clear: the core banking flow caused substantial user drop-off during critical transactions.</p>

      <h2>The Challenge</h2>
      <p>Users were abandoning the app during high-value flows. The interface was cluttered, the steps were confusing, and the experience lacked the confidence expected from a modern banking platform.</p>

      <h2>Our Approach</h2>
      <p>We started with user research to identify the precise friction points. The team then designed a clearer interface that guided users through complex financial operations and paired that work with a design system built for trust, speed, and consistency.</p>

      <h2>The Results</h2>
      <p>Within three months of launch, user retention rose by 300%. Transaction completion improved, and support tickets tied to usability issues dropped sharply.</p>
    `,
  },
  {
    slug: 'ai-agents-enterprise',
    type: 'Tech Update',
    title: 'Introducing AI Agents for Enterprise',
    description:
      'How to integrate autonomous workflows into an existing technical stack without replacing the systems teams already depend on.',
    metaDescription:
      'A practical overview of how enterprise teams can integrate AI agents into existing workflows through APIs and automation.',
    themeColor: 'emerald',
    author: 'Relentiv Strategy Team',
    publishedAt: '2026-01-24',
    updatedAt: '2026-03-04',
    image: '/og-image.jpg',
    content: `
      <p>Artificial intelligence is becoming part of everyday enterprise operations. The real challenge is not whether teams should use AI agents, but how they can introduce them without disrupting the stack they already trust.</p>

      <h2>What AI Agents Actually Do</h2>
      <p>Unlike rule-based systems, AI agents can interpret context, make bounded decisions, and execute tasks across connected systems. That makes them useful for support workflows, operations, reporting, and internal knowledge tasks.</p>

      <h2>Integration Strategy</h2>
      <p>Effective deployment does not require a full rebuild. Our preferred approach connects agents through existing APIs so they can operate alongside current tooling, permissions, and approval flows.</p>

      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Automated support workflows:</strong> triage, summarization, and first-response handling.</li>
        <li><strong>Data monitoring:</strong> continuous analysis of signals, anomalies, and opportunity detection.</li>
        <li><strong>Workflow orchestration:</strong> multi-step coordination across operations, sales, and delivery systems.</li>
      </ul>
    `,
  },
  {
    slug: 'nexus-logistics-story',
    type: 'Client Story',
    title: 'Relentiv completely re-engineered our approach to digital product design.',
    description: 'How an embedded product and engineering partnership helped Nexus Logistics modernize delivery and internal workflows.',
    metaDescription:
      'A client story covering product modernization, embedded team delivery, and a logistics platform redesign for Nexus Logistics.',
    themeColor: 'indigo',
    author: 'Relentiv Client Success Team',
    publishedAt: '2025-12-18',
    updatedAt: '2026-02-27',
    image: '/og-image.jpg',
    content: `
      <p>Nexus Logistics reached a point where aging systems were slowing delivery and weakening the usability of its digital products. The company needed a partner that could modernize the stack and improve product execution at the same time.</p>

      <h2>The Partnership</h2>
      <p>Our team embedded with Nexus Logistics across engineering and product. We introduced a stronger delivery rhythm, created a reusable design system, and aligned technical decisions with operational goals.</p>

      <h2>The Transformation</h2>
      <p>"Relentiv didn't just build us a new app; they changed how we think about software," said Sarah Jenkins, CTO of Nexus Logistics. The new system improved reliability, made the platform easier to use, and gave internal teams a stronger foundation for future releases.</p>

      <h2>Looking Ahead</h2>
      <p>Today, Nexus Logistics is operating on a faster and more maintainable platform that supports better customer outcomes and internal efficiency.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
