export interface BlogPost {
  slug: string;
  type: string;
  tag?: string;
  title: string;
  stat?: string;
  description: string;
  metaDescription: string;
  themeColor: 'orange' | 'emerald' | 'indigo' | 'rose' | 'zinc';
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
    title: "Why We Rebuilt Unison's UI.",
    stat: '38%',
    description:
      "Why We Rebuilt Unison's UI — And What a 38% Retention Lift Actually Looks Like",
    metaDescription:
      'A fintech redesign engagement that improved retention, reduced transaction drop-off, and clarified complex banking flows.',
    themeColor: 'orange',
    publishedAt: '2026-02-12',
    updatedAt: '2026-03-08',
    image: '/og-image.jpg',
    content: `
      <p>Most DeFi platforms lose users before they even make their first deposit. Not because the yield isn't good enough. Not because people don't trust the protocol. But because the interface makes them feel like they made a wrong turn.</p>

      <h2>That's the problem we were brought in to solve for Unison.</h2>
      <p>Unison is a cross-chain yield platform — the idea being that you deposit from any chain and the platform finds you the best yield across 20+ blockchains automatically. One-click, non-custodial, no need to bridge manually or monitor rebalancing yourself. On paper, it's genuinely useful. But the original interface wasn't communicating any of that.</p>

      <h2>The DeFi UX problem is worse than people admit</h2>
      <p>Here's something worth understanding about this space: DeFi users are not the same as regular fintech users. They've been burned before. They've seen rug pulls, they've watched bridges get exploited, they've had funds stuck in a transaction for hours. So when they land on a new platform — even one with solid audits and real yield — they're already in a defensive posture.</p>

      <p>That means trust is earned at the interface level before it's ever earned at the protocol level. If the UI looks rushed or confusing, the user doesn't think "this is a bad design." They think "I don't know where my money goes." And they leave.</p>

      <p>Unison had this problem. The vault interface didn't clearly explain what was happening with deposited assets. Allocation breakdowns were buried. The chain-switching flow required too many steps. And the first-time experience — from wallet connect to first deposit — had at least three moments where we watched users in testing just... stop. Not confused, exactly. Just not confident enough to continue.</p>

      <h2>What we actually changed</h2> 
      <p>
      We started by mapping every decision point in the deposit flow. Where does a user have to think? Where do they have to trust something they can't verify? Where are they waiting with no feedback?</p>

      <p>The wallet connection experience was the first thing we touched. It sounds small but it isn't — it's the first moment of commitment. We reduced the number of states a user could find themselves in (confused loading, silent failure, mismatched chain warnings) and made errors actually informative. "Connected to wrong network" with a one-click fix beats a dead spinner.</p>

      <p>The vault cards got reworked significantly. Unison has both public vaults — optimized, set-and-forget — and private vaults where users can customize allocations themselves. These two things appeal to pretty different people, and the original UI treated them the same way. We created a clearer visual hierarchy that helped users self-select: if you want simplicity, here's what you're looking for; if you want control, here's where you go. That separation alone reduced the decision paralysis we were seeing.</p>

      <p>The other big piece was showing asset deployment in real time. One of Unison's strongest trust signals is that it's fully transparent about where your assets are allocated. But that information was available only after you'd already deposited. We moved it earlier in the flow, so users could see the strategy before committing. Obvious in retrospect. Made a real difference in completion rates.</p>

      <h2>
      Why this matters more in DeFi than anywhere else
      </h2>

      <p>
      In a regular SaaS product, if the UI is confusing, you lose signups. Annoying, but recoverable. In a yield platform, a confusing UI means people don't deposit real money — and in many cases they never come back, because the hesitation hardens into "I'll figure it out later," which means never.
      </p>

      <p>The stakes of each interaction are higher. There's no undo. There's no customer support to reverse a chain transaction. That asymmetry shapes how users behave, and it should shape how you design.
</p>

<p>Cross-chain specifically introduces a complexity that most interface designers underestimate. The user might be on Arbitrum, trying to deposit into a vault that's earning yield across Ethereum and BNB Chain, while the platform is showing them a balance denominated in a different unit. Each of those context switches is an opportunity to lose them. Good UI in this context isn't about looking clean — it's about resolving ambiguity before the user has to ask.</p>

<h2>
The results, and what they mean</h2>

<p>Seven-day active retention went up 38% in the first cohort after launch. Deposit completion — meaning users who started the flow and actually completed a deposit — improved by 29%. Time-to-first-deposit came down noticeably, which in this space matters because the longer someone sits at the wallet connection screen, the more likely they are to talk themselves out of it.</p>

<p>These aren't numbers from a platform overhaul or a feature rebuild. The product itself didn't change — the yield strategies, the smart contracts, the cross-chain infrastructure were all the same. What changed was whether users trusted it enough to follow through.</p>

<p>That's what UI work actually is, in a sector like this. It's not decoration. It's the thing that converts someone who's interested into someone who's actually using the product.</p>
  

    `,
  },
  {
    slug: 'ai-agents-enterprise',
    type: 'Tech Update',
    title: 'Introducing AI Agents for Enterprise',
    description:
      'Most enterprise AI rollouts fail quietly. Not because the technology is wrong, but because nobody thought hard enough about where it actually fits.',
    metaDescription:
      'A practical guide to deploying AI agents in enterprise environments — covering integration patterns, failure modes, and what actually makes autonomous workflows stick.',
    themeColor: 'emerald',
    publishedAt: '2026-01-24',
    updatedAt: '2026-03-04',
    image: '/og-image.jpg',
    content: `
      <p>There is a version of this article that starts with "AI is transforming enterprise operations" and then lists five bullet points. You have read that article. Everyone has. It did not help anyone ship anything.</p>

      <p>So let's skip that. Here is what we have actually seen working — and not working — when teams try to bring AI agents into a real production environment.</p>

      <h2>The mistake most teams make before they even start</h2>

      <p>The instinct when adopting AI agents is to look for the biggest problem to solve first. Something dramatic — replace the whole support pipeline, automate the entire reporting function. That instinct almost always produces a six-month project that gets quietly shelved.</p>

      <p>The teams that get traction start narrow. A single workflow. One handoff that is currently slow, error-prone, or just tedious enough that nobody owns it properly. That is where an agent earns its place. Once it is working there, extending it is straightforward. Starting big is not bold — it is just risky.</p>

      <h2>What AI agents actually are inside an enterprise context</h2>

      <p>An AI agent, in practical terms, is a system that can receive a goal, figure out the steps needed to reach it, use whatever tools it has access to, and report back — without someone manually directing each move. That is meaningfully different from a chatbot, which waits to be asked something, or a traditional automation script, which only knows the path it was explicitly coded to follow.</p>

      <p>What makes agents useful in enterprise specifically is that they can handle ambiguity. A rule-based system breaks the moment something unexpected happens. An agent can reason about what the right next step probably is and keep going. That sounds small. In practice, it is the difference between a system that needs constant maintenance and one that actually runs.</p>

      <h2>Integration — the part every vendor glosses over</h2>

      <p>The question we get asked most is some version of: "do we have to rebuild everything?" The answer is no, but the honest answer is also "it depends on how your current stack is structured."</p>

      <p>Agents work through APIs. If your existing systems expose APIs — your CRM, your ticketing platform, your internal databases, your communication tools — then an agent can be connected to them without replacing anything. It sits alongside what you already have. It reads from the same data sources your team uses, writes back to the same places, respects the same permissions.</p>

      <p>Where it gets complicated is legacy infrastructure that was never built to be queried programmatically. In those cases, there are usually two options: build a thin API layer on top (often less work than it sounds), or scope the agent's access to systems that are already modern enough to support it. The second option is almost always the right call to start with.</p>

      <h2>The workflows where agents consistently deliver</h2>

      <p>We have seen genuine ROI in a few specific categories. Not because these are the only places agents work, but because these are the places where the volume is high enough and the task structured enough that the benefit shows up clearly in the numbers.</p>

      <p><strong>Internal triage and routing:</strong> support tickets, escalation queues, inbound requests that need to be categorized and assigned. Agents handle the read-and-sort work that currently burns hours every week for someone who should be doing something harder.</p>

      <p><strong>Data monitoring and alerting:</strong> watching dashboards, flagging anomalies, generating the first-pass summary before a human has to look at it. The analyst still makes the call — the agent just means they are not starting from a blank page at 7am.</p>

      <p><strong>Cross-system coordination:</strong> tasks that require touching three different tools in sequence. Update the CRM, create the follow-up task, send the summary to Slack. Individually simple. Collectively, the kind of thing that falls through the cracks constantly. Agents are reliable at this in a way that humans just are not.</p>

      <h2>What fails, and why</h2>

      <p>Agents fail when the goal they are given is too vague. "Handle customer inquiries" is not an actionable goal for an agent — it is a job description. "Classify incoming support tickets by issue type and assign them to the correct queue based on these rules" is something an agent can actually do. The specificity of the instruction determines almost everything about whether the output is useful.</p>

      <p>They also fail when there is no human review loop in the early stages. Not because agents make constantly wrong decisions, but because the first few weeks of deployment always surface edge cases that nobody anticipated. Building in a lightweight review step at the start means you catch those and correct them quickly. Skipping it means they compound.</p>

      <h2>A practical starting point</h2>

      <p>If you are trying to figure out where to begin: look for a workflow in your organization that has three properties. It happens frequently. It currently requires someone to touch multiple systems. And when it goes wrong, the failure is annoying but not catastrophic. That is your pilot. Run it for four to six weeks, measure it properly, and use what you learn to decide what to expand to next.</p>

      <p>That is not a glamorous answer. But it is the one that actually leads somewhere.</p>
    `,
  },
  {
    slug: 'nexus-logistics-story',
    type: 'Industry Insight',
    title: 'Your Healthcare Website Has a Legal Deadline — Most Teams Don\'t Know It Yet',
    description:
      'HHS gave every federally funded healthcare provider a hard deadline to make their websites ADA-compliant. May 11, 2026 is closer than it looks, and "we\'ll fix it later" is no longer an answer.',
    metaDescription:
      'HHS Section 504 final rule sets a May 2026 deadline for WCAG 2.1 AA compliance across all healthcare websites, mobile apps, and patient portals receiving federal funding. Here is what that means and what to do before the deadline.',
    themeColor: 'indigo',
    publishedAt: '2026-03-23',
    updatedAt: '2026-03-23',
    image: '/og-image.jpg',
    content: `
      <p>There is a deadline most healthcare teams are not tracking. Not a vague "you should probably think about this" kind of deadline — an actual federal compliance date with enforcement, funding consequences, and private lawsuit exposure attached to it.</p>

      <p>On May 9, 2024, the U.S. Department of Health and Human Services published a final update to Section 504 of the Rehabilitation Act — the first comprehensive rewrite of those regulations in nearly 50 years. The rule became effective July 8, 2024. For any organization with 15 or more employees that receives federal financial assistance from HHS — hospitals, clinics, providers billing Medicare or Medicaid, community health centers, anyone — the compliance deadline for digital accessibility is <strong>May 11, 2026</strong>. Smaller organizations with fewer than 15 employees get until May 10, 2027.</p>

      <p>Those dates are not soft targets. The HHS Office for Civil Rights can investigate without a complaint being filed, refer violations to the Department of Justice, and — at the extreme end — move to suspend or terminate federal funding. Private lawsuits under the ADA are also on the table, and plaintiff filings in this area have been climbing for several years.</p>

      <h2>What the rule actually requires</h2>

      <p>The rule adopts WCAG 2.1 Level AA as the specific technical standard your digital content must meet. WCAG — the Web Content Accessibility Guidelines, published by the World Wide Web Consortium — has been the international benchmark for web accessibility since 2018. What changed is that HHS has now made it explicitly enforceable. Previously, Section 504 said you could not discriminate against people with disabilities. It just did not define what accessible meant for a website. That gap is now closed.</p>

      <p>WCAG 2.1 AA is organized around four principles that most developers know as POUR: content must be <strong>Perceivable</strong> (images have text alternatives, videos have captions), <strong>Operable</strong> (the entire interface works with a keyboard, not just a mouse), <strong>Understandable</strong> (labels, error messages, and instructions are clear), and <strong>Robust</strong> (the underlying code works with screen readers and assistive technology). There are 50 success criteria at the AA level. That is not a minor checklist item — for most healthcare websites built over the past decade, a proper audit will find issues.</p>

      <p>A few things about scope that are easy to miss: the rule covers your website, your mobile app, and your patient-facing kiosks. It also covers <strong>third-party tools</strong> used in your digital services — appointment schedulers, bill pay portals, telehealth platforms, and patient portal software provided by external vendors. If a patient interacts with it as part of accessing your services, it falls under your compliance obligation, regardless of who built it.</p>

      <h2>Why healthcare specifically carries higher stakes</h2>

      <p>Web accessibility matters in every industry, but healthcare is the place where inaccessibility causes real harm. Think about what patients actually need to do on your website: schedule appointments, view test results, pay bills, join telehealth calls, download care instructions, contact their provider. For a patient using a screen reader because of vision loss, or someone relying on keyboard navigation because a motor disability makes a mouse unusable, a non-accessible website is not an inconvenience. It is a barrier to care.</p>

      <p>The HHS rule explicitly frames digital barriers as a form of discrimination under Section 504 for exactly this reason. An inaccessible patient portal is not a UX problem — in regulatory terms, it is a failure to provide equitable access to your services.</p>

      <p>There is also a trust dimension worth thinking about separately from compliance. Healthcare is a sector that runs on trust. Patients already approach medical appointments, test results, and billing with some degree of anxiety. An interface that is confusing, broken for assistive technology, or simply hard to use undermines that trust at a moment when it matters. The providers that take accessibility seriously tend to build digital experiences that feel more professional and considered across the board — and patients notice.</p>

      <h2>What OCR is actually checking</h2>

      <p>The HHS Office for Civil Rights has been clear about a few things. First, automated accessibility scanning tools are not sufficient on their own for compliance. Running a WAVE or Lighthouse scan does not give you a clean bill of health — manual review by qualified testers, and ideally testing with users who rely on assistive technology, is part of a proper assessment. Second, having a staffed phone line or in-person alternative does not excuse an inaccessible website. That argument — "patients can just call us" — was common before 2024 and is no longer a valid defense under the updated rule.</p>

      <p>OCR can initiate a compliance review at any time, without waiting for a complaint. The enforcement process involves an investigation, then typically an opportunity to enter a voluntary compliance agreement, and escalation to the DOJ for entities that do not comply. The risk is not hypothetical — OCR has a functioning complaint portal and an enforcement history across other areas of disability discrimination in healthcare. Digital accessibility is now explicitly within that scope.</p>

      <h2>The practical problem most teams run into</h2>

      <p>Most healthcare websites were not built with WCAG 2.1 AA in mind. A lot of them were built or last redesigned several years ago, before any of this had regulatory teeth. The issues tend to be predictable: images without alt text, form fields without proper labels, color contrast that fails the AA threshold, PDFs that cannot be read by screen readers, video content without captions, navigation that works fine with a mouse and breaks entirely with a keyboard.</p>

      <p>Fixing those issues is not necessarily expensive — but it requires someone to audit the site properly, prioritize the issues by severity and patient impact, and then implement fixes that do not break other parts of the site. A lot of healthcare organizations try to handle this internally and find that neither their marketing team nor their developer has the accessibility expertise to do it correctly. An accessibility widget bolted onto the corner of the page is not a solution, by the way. Those overlay tools have been widely documented as ineffective and do not constitute compliance.</p>

      <h2>Where Relentiv fits in</h2>

      <p>We work with healthcare providers and digital health teams on exactly this kind of problem. Our approach to ADA compliance work starts with a full accessibility audit — manual review against WCAG 2.1 AA criteria, across your website, patient portal, and any third-party tools in scope. We document every issue, prioritize by severity and risk, and produce a remediation plan that is actionable rather than just a long list of problems.</p>

      <p>From there, our engineering team handles the implementation. We do not just fix the flagged items — we build the accessibility requirements into your design system and development process so that new content and features stay compliant over time. The rule is not a one-time audit; it requires ongoing conformance, and that means accessibility has to be embedded in how your site is built and maintained, not added as a final step.</p>

      <p>If May 2026 already feels close — and at this point it is — the right time to start is now, not six weeks from the deadline. Remediation work takes time, and the organizations that are going to be in good shape by May are the ones that started the audit in early 2026, not the ones that start it in April.</p>

      <p>The healthcare organizations we have worked with on this have consistently found that the compliance work improved the broader patient experience as a side effect. Accessible design tends to be clearer, more consistent, and easier to navigate for everyone — not just users relying on assistive technology. That should not be the primary reason to do it. But it is worth knowing that the work pays off in more ways than one.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
