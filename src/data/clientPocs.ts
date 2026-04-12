import { smashGuysPoc } from "./POCdata/SmashGuys";
import { tararosesalaon } from "./POCdata/TaraRoseSalon";

export interface ClientPocImage {
  src: string;
  alt: string;
  caption: string;
  kind: string;
}

export interface ClientPoc {
  slug: string;
  clientName: string;
  clientIndustry?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  intro?: string;
  currentSiteUrl?: string;
  figmaUrl?: string;
  highlights?: string[];
  deliverables?: string[];
  processNotes?: string[];
  images?: ClientPocImage[];
}

// Duplicate an entry, change the slug, and swap in the client copy and image URLs.
export const clientPocs: ClientPoc[] = [
  smashGuysPoc,
  tararosesalaon
];

export const getClientPocBySlug = (slug: string) => clientPocs.find((entry) => entry.slug === slug);
