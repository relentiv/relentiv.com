import type {ClientPoc} from '../clientPocs';

// ─── Smash Guys · Burger Kitchen · Bangalore ───────────────────────────────
// SEO targets:
//   Primary   → restaurant website design Bangalore
//   Secondary → F&B brand website redesign India, premium food brand web design,
//               smash burger website, web design agency Bangalore
//   Brand     → Relentiv
// All copy is written for the page's <meta description>, schema markup,
// and social preview in mind. Keep image alt text specific — generic alts
// hurt image-search rankings.
// ────────────────────────────────────────────────────────────────────────────

export const smashGuysPoc: ClientPoc = {
  slug: 'smash-guys-bangalore',

  clientName: 'Smash Guys Burger Kitchen',

  clientIndustry: 'Restaurant & F&B · Bangalore',

  eyebrow: 'Unsolicited design concept — built before the conversation started',

  // Primary H1 target: captures "restaurant website design Bangalore" naturally
  title:
    'Bangalore burger brand gets a website that actually matches its product.',

  // ~155 chars — written to work as meta description too
  description:
    'A private redesign concept for Smash Guys Burger Kitchen — showing how a digital menu, brand story page, and locations experience can reflect a premium F&B product rather than a PDF download.',

  // Intro: written for dwell-time. No keyword stuffing. Tells the real story.
  intro:
    'We redesigned the core pages — homepage, brand story, digital menu, and locations — to show what the experience could feel like if the site matched the product.',

//   currentSiteUrl: 'https://www.smashguys.in',

//   figmaUrl: 'https://www.figma.com/', // replace with your actual Figma link

  // Highlights: written as benefit statements, not feature lists.
  // Each one is searchable and scannable for both humans and crawlers.
  highlights: [
    'Replaced a static PDF menu with a browsable, mobile-first digital menu experience — organized by Smash Burgers, Fried Chicken, Veggie, Sides, and Beverages.',
    'Designed a brand story page that tells the Smash Guys journey from a single kitchen in 2018 to a three-outlet premium destination in Bangalore — building trust before a customer even visits.',
    'Built an interactive locations page for Indiranagar, Bellandur, and RMV that feels consistent with the brand and gives customers the hours and context they actually need.',
    'Maintained the existing black-and-yellow visual identity throughout — no reinvention, just elevation.',
  ],

  // Deliverables: short, specific, indexable
  deliverables: [
    'Homepage redesign with hero, digital menu preview, and locations footer',
    'Brand story page with visual timeline (2018 → 2020 → 2023)',
    'Browsable digital menu — five categories, mobile-optimized',
    'Interactive locations page — Indiranagar, Bellandur Ecoworld, RMV 2nd Stage',
    'Full design system in brand colors — #FFD000 yellow, #111111 black',
    'Cold outreach email written around the concept',
  ],

  // Process notes: written to demonstrate thinking, not just output.
  // Good for E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust).
  processNotes: [
    'We started by auditing the current site as a customer would — finding it on Zomato, Googling the brand name, landing on the homepage. The PDF menu was the clearest friction point, and the one most worth solving first.',
    'Rather than redesigning from scratch, we kept every existing brand asset — the logo, the yellow-and-black palette, the food photography — and rebuilt the structure around them. The brand did not need a new identity. It needed a better stage.',
    'The homepage hero uses their existing burger photography at full bleed. We added a clear CTA, a digital menu section broken into categories, and a locations footer with accurate hours — all the things someone needs when they discover a restaurant online.',
    'We chose not to add an online ordering flow because Smash Guys operates primarily through Zomato and Swiggy. The website job is brand credibility and discovery, not transaction. The design reflects that focus.',
  ],

  images: [
    {
      // Replace src with your actual hosted screenshot URL
      src: 'https://i.postimg.cc/T1DhGx0X/home.png',
      alt: 'Smash Guys homepage redesign concept showing premium burger photography, digital menu categories, and Bangalore outlet locations',
      caption:
        'Homepage — full-bleed hero with brand photography, digital menu preview, and a locations footer replacing the original single-screen layout.',
      kind: 'Home Page',
    },
    {
      src: 'https://i.postimg.cc/Pf9873yq/screen.png',
      alt: 'Smash Guys brand story page showing restaurant timeline from 2018 single kitchen to 2023 premium Bangalore destination',
      caption:
        'Brand story page — a visual timeline of the Smash Guys journey, designed to build trust and context before a customer makes a decision.',
      kind: 'Brand Story Page',
    },
    {
      src: 'https://i.postimg.cc/hPQVPWvv/3.png',
      alt: 'Smash Guys digital menu experience showing smash burgers, fried chicken, and veggie categories on mobile-optimized layout',
      caption:
        'Digital menu — five browsable categories replacing the original PDF download, fully mobile-optimized and consistent with the brand identity.',
      kind: 'Digital Menu Page',
    },
    {
      src: 'https://i.postimg.cc/15XJGjtg/4.png',
      alt: 'Smash Guys interactive locations page showing Indiranagar, Bellandur Ecoworld and RMV 2nd Stage outlets with map and opening hours',
      caption:
        'Locations page — Indiranagar, Bellandur, and RMV presented with hours and context, on a dark map that matches the brand aesthetic.',
      kind: 'Locations Page',
    },
  ],
};
