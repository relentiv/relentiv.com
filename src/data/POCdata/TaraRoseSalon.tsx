import { ClientPoc } from "../clientPocs";

export const tararosesalaon: ClientPoc = {
    slug: 'tara-rose-salon',
  
    clientName: 'tara-rose-salon',
  
    clientIndustry: 'Salon',
  
    eyebrow: 'Unsolicited design concept — built before the conversation started',
  
    // Primary H1 target: captures "restaurant website design Bangalore" naturally
    title:
      'A Salon with world-class craft gets a booking experience to match.',
  
    // ~155 chars — written to work as meta description too
    description:
      'A salon with world-class craft gets a booking experience to match.',
  
    // Intro: written for dwell-time. No keyword stuffing. Tells the real story.
    intro:
      'We audited the current experience as a first-time client would — Googled the salon, landed on the website, hit "Book Now." It opened WhatsApp. We went back and built what should have been there.',
  
  //   currentSiteUrl: 'https://www.smashguys.in',
  
  //   figmaUrl: 'https://www.figma.com/', // replace with your actual Figma link
  
    // Highlights: written as benefit statements, not feature lists.
    // Each one is searchable and scannable for both humans and crawlers.
    highlights: [
      'Complete multi-step booking flow — service selection, stylist, time slot, and confirmation',
      'Service menu with pricing and duration, browsable without leaving the page',
      'Artisan profiles — individual stylists presented with care, not just listed',
      'Time selection grouped by Morning · Afternoon · Evening for effortless scanning',
      'Personalisation step — beverage preference, silence mode, allergy notes',
      'Final review screen that builds trust before a client commits'

    ],
  
    processNotes: [
      'We redesigned the full booking journey — from landing to confirmed appointment — to show what the experience could feel like when it finally matches the quality of the space',
      'We started by opening the website as a walk-in client would. The "Book Now" button took us to a list of social media handles. No flow, no confirmation, no backend. For a salon at this level, that gap is the entire problem worth solving.'
    ],
  
    images: [
        {
            // Replace src with your actual hosted screenshot URL
            src: 'https://i.postimg.cc/DyZYCPjL/Section-Curated-Services-Bento-style-Editorial-Grid-(1).png',
            alt: 'Full-bleed editorial hero, curated service categories, and a single clear call-to-action replacing the current layout.',
            caption:
              '',
            kind: 'Curated For Your Brand',
          },
      {
        // Replace src with your actual hosted screenshot URL
        src: 'https://i.postimg.cc/gJnhZrkb/Philosophy-Section-(1).png',
        alt: 'Full-bleed editorial hero, curated service categories, and a single clear call-to-action replacing the current layout.',
        caption:
          'Full-bleed editorial hero, curated service categories, and a single clear call-to-action replacing the current layout.',
        kind: 'Home Page',
      },
      {
        src: 'https://i.postimg.cc/q7gYzXn8/bookingdat.png',
        alt: 'How Would You Like to Feel? Mood-based entry that reduces decision fatigue before a service is even chosen.',
        caption:
          'How Would You Like to Feel? Mood-based entry that reduces decision fatigue before a service is even chosen.',
        kind: 'Mood-based entry',
      },
      {
        src: 'https://i.postimg.cc/76GVyKzt/Body-(3).png',
        alt: 'Select Your Ritual Service menu with pricing, duration, and category groupings — browsable, not buried.',
        caption:
          'Select Your Ritual Service menu with pricing, duration, and category groupings — browsable, not buried.',
        kind: 'Ritual',
      },
      {
        src: 'https://i.postimg.cc/N0LFNShL/3.png',
        alt: 'Select Your Ritual Service menu with pricing, duration, and category groupings — browsable, not buried.',
        caption:
          '',
        kind: '',
      },
      {
        src: 'https://i.postimg.cc/sXTvwzxn/uploadserv.png',
        alt: 'Select Your Ritual Service menu with pricing, duration, and category groupings — browsable, not buried.',
        caption:
          '',
        kind: 'Select Service',
      },
      {
        src: 'https://i.postimg.cc/x89SZNJD/screen.png',
        alt: 'Personalise & Review Client preferences collected once. Final review with full appointment details before confirmation.',
        caption:
          'Personalise & Review Client preferences collected once. Final review with full appointment details before confirmation.',
        kind: 'Appointment',
      },
      {
        src: 'https://i.postimg.cc/8zyp24N1/Final-CTA-Section.png',
        alt: 'Personalise & Review Client preferences collected once. Final review with full appointment details before confirmation.',
        caption:
          '',
        kind: 'Appointment',
      },
    ],
  };
  