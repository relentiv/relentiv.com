import {useEffect, useId, useRef, useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Monitor,
  Palette,
  Sparkles,
} from 'lucide-react';
import Seo from '../components/Seo';
import {getClientPocBySlug} from '../data/clientPocs';
import {buildBreadcrumbSchema, CONTACT_EMAIL} from '../lib/site';

interface ClientPocPageProps {
  slug: string;
  onBook: () => void;
}

const buildDefaultMessage = (clientName: string) =>
  `Hi Relentiv,\n\nI reviewed the concept for ${clientName} and would like to discuss the next step.`;

export default function ClientPocPage({slug, onBook}: ClientPocPageProps) {
  const poc = getClientPocBySlug(slug);
  const contactRef = useRef<HTMLElement>(null);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', loop: false});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: poc ? buildDefaultMessage(poc.clientName) : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!poc) {
      return;
    }

    setFormData({
      name: '',
      email: '',
      message: buildDefaultMessage(poc.clientName),
    });
    setSubmitError(null);
    setSubmitSuccess(null);
  }, [poc]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateCarouselState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    updateCarouselState();
    emblaApi.on('reInit', updateCarouselState);
    emblaApi.on('select', updateCarouselState);

    return () => {
      emblaApi.off('reInit', updateCarouselState);
      emblaApi.off('select', updateCarouselState);
    };
  }, [emblaApi]);

  if (!poc) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 pt-32 pb-24 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Private preview</p>
          <h1 className="mb-4 text-4xl font-medium tracking-tight">This client preview was not found.</h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-400">
            Check the slug in the URL or add a matching entry in <code>src/data/clientPocs.ts</code>.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Contact Relentiv
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    );
  }

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || !isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const firebaseContact = await import('../lib/firebase/contact');

      await firebaseContact.submitContactSubmission({
        name: formData.name,
        email: formData.email,
        message: `${formData.message.trim()}\n\nPreview context: ${poc.clientName} (${poc.slug})`,
      });

      setFormData({
        name: '',
        email: '',
        message: buildDefaultMessage(poc.clientName),
      });
      setSubmitSuccess(`Your note was sent to ${CONTACT_EMAIL}. We will follow up soon.`);
    } catch (error) {
      console.error('Failed to submit client POC contact request:', error);
      const {getContactSubmissionErrorMessage} = await import('../lib/firebase/contact');
      setSubmitError(getContactSubmissionErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={`${poc.clientName} Website Redesign Concept | Relentiv`}
        description={poc.description}
        path={`/poc/${poc.slug}`}
        image={poc.images[0]?.src}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        schemas={[
          buildBreadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: poc.clientName, path: `/poc/${poc.slug}`},
          ]),
        ]}
      />

      <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
        <section className="relative px-6 pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_40%),radial-gradient(circle_at_top_right,rgba(226,88,34,0.16),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0.92),rgba(5,5,5,1))]" />
          <div className="absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-[120px]" />
          <div className="absolute right-[-5rem] top-16 h-56 w-56 rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                {poc.eyebrow}
              </div>

              <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-emerald-300/80">{poc.clientName}</p>
              <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-white md:text-7xl">
                {poc.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
                {poc.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all hover:bg-gray-200"
                >
                  I'd like to contact
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-emerald-300" />
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={onBook}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  Quick consultation
                </button>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:col-span-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Designed for</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-medium text-white">{poc.clientIndustry}</p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
                      A private page you can share directly in outreach so the client sees the redesign direction before any live call.
                    </p>
                  </div>
                  <div className="hidden h-14 w-14 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 sm:flex sm:items-center sm:justify-center">
                    <Monitor className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {poc.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                    <Palette className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">{highlight}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Visual walkthrough</p>
                <h2 className="text-3xl font-medium tracking-tight text-white md:text-5xl">Scroll through the redesign direction.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {poc.currentSiteUrl ? (
                  <a
                    href={poc.currentSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Current website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                {poc.figmaUrl ? (
                  <a
                    href={poc.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-5 py-3 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-400/15"
                  >
                    Open Figma
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-4">
              <div className="overflow-hidden rounded-[1.5rem]" ref={emblaRef}>
                <div className="flex">
                  {poc.images.map((image) => (
                    <div key={image.src} className="min-w-0 flex-[0_0_100%]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#020202]">
                        <img src={image.src} alt={image.alt} className="h-full w-full object-contain" loading="lazy" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 md:p-8">
                          <div className="mb-2 inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65 backdrop-blur-sm">
                            {image.kind}
                          </div>
                          <p className="max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base">{image.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {poc.images.map((image, index) => (
                    <button
                      key={`${image.src}-thumb`}
                      type="button"
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                        selectedIndex === index
                          ? 'border-emerald-400/40 bg-emerald-400/12 text-emerald-200'
                          : 'border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {image.kind}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    disabled={!emblaApi?.canScrollPrev()}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex gap-2">
                    {scrollSnaps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          selectedIndex === index ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/15 hover:bg-white/35'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    disabled={!emblaApi?.canScrollNext()}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/45">What is included</p>
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-white">Built for a fast yes-or-no review.</h2>
              <div className="space-y-4">
                {poc.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] px-4 py-4">
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="text-sm leading-relaxed text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {poc.processNotes.map((note, index) => (
                <div
                  key={note}
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Note {index + 1}</p>
                  <p className="max-w-2xl text-base leading-relaxed text-gray-300">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactRef} className="px-6 pt-6 pb-36 md:pb-32">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Contact Relentiv</p>
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
                If this direction feels right, send a note now.
              </h2>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-400">
                This page is meant for first outreach. The fastest next step is a short message to our team, and we will handle the follow-up from there.
              </p>

              <div className="rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/75">Direct email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex items-center gap-2 text-xl font-medium text-white hover:text-emerald-200">
                  <Mail className="h-5 w-5 text-emerald-300" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor={nameId} className="text-sm text-gray-300">
                      Name
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-white/10 bg-[#050505] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={emailId} className="text-sm text-gray-300">
                      Work email
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-white/10 bg-[#050505] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor={messageId} className="text-sm text-gray-300">
                    Message
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={7}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-[1.5rem] border border-white/10 bg-[#050505] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                  />
                </div>

                {submitError ? (
                  <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {submitError}
                  </p>
                ) : null}
                {submitSuccess ? (
                  <p role="status" className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    {submitSuccess}
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : "I'd like to contact"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onBook}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Book a quick consultation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4">
        <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-[#050505]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Private preview</p>
            <p className="mt-1 text-sm text-gray-300">
              Reach us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline decoration-white/20 underline-offset-4">{CONTACT_EMAIL}</a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
            >
              I'd like to contact
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onBook}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              <CalendarDays className="h-4 w-4" />
              Book call
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
