import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import wheelGesturesModule from 'embla-carousel-wheel-gestures';
const WheelGesturesPlugin = typeof wheelGesturesModule === 'function' ? wheelGesturesModule : (wheelGesturesModule as unknown as {WheelGesturesPlugin: typeof wheelGesturesModule}).WheelGesturesPlugin;
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Maximize2,
  Sparkles,
  X,
  CheckCircle2,
  Send
} from 'lucide-react';
import Seo from '../components/Seo';
import { getClientPocBySlug } from '../data/clientPocs';
import { buildBreadcrumbSchema, CONTACT_EMAIL } from '../lib/site';

interface ClientPocPageProps {
  slug: string;
  onBook: () => void;
}

const buildDefaultMessage = (clientName: string) =>
  `Hi Relentiv,\n\nI reviewed the concept for ${clientName} and would like to discuss the next step.`;

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ClientPocPage({ slug, onBook }: ClientPocPageProps) {
  const poc = getClientPocBySlug(slug);
  const contactRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: false, dragFree: true },
    [WheelGesturesPlugin()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: poc ? buildDefaultMessage(poc.clientName) : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!poc) return;
    setFormData({
      name: '',
      email: '',
      message: buildDefaultMessage(poc.clientName),
    });
    setSubmitError(null);
    setSubmitSuccess(null);
  }, [poc]);

  useEffect(() => {
    if (!emblaApi) return;
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

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (event.key === 'ArrowLeft') emblaApi?.scrollPrev();
      if (event.key === 'ArrowRight') emblaApi?.scrollNext();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [emblaApi, isLightboxOpen]);

  if (!poc) {
    return (
      <main className="min-h-screen bg-[#030303] flex items-center justify-center px-6 text-white">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-light tracking-tight mb-4 text-white">Preview Not Found</h1>
          <p className="text-gray-400 mb-8">This client presentation link is invalid or has expired.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Return Home
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
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToDesigns = (index = 0) => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(() => emblaApi?.scrollTo(index));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !isFormValid) return;

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

      setFormData({ name: '', email: '', message: buildDefaultMessage(poc.clientName) });
      setSubmitSuccess(`Your note was sent. We'll be in touch shortly.`);
    } catch (error) {
      console.error('Failed to submit:', error);
      const { getContactSubmissionErrorMessage } = await import('../lib/firebase/contact');
      setSubmitError(getContactSubmissionErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliverables = poc.deliverables ?? poc.highlights ?? [];
  const processNotes = poc.processNotes ?? [];
  const images = poc.images ?? [];
  const firstImage = images[0];
  const selectedGalleryImage = images[selectedIndex] ?? images[0] ?? null;

  return (
    <>
      <Seo
        title={`${poc.clientName} Redesign Concept | Relentiv`}
        description={poc.description}
        path={`/poc/${poc.slug}`}
        image={firstImage?.src}
        robots="noindex, nofollow"
      />

      <div className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-[#030303] to-transparent h-32 pointer-events-none" />

      {/* Sleek Floating Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed top-6 inset-x-0 z-50 px-6 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-8 rounded-full border border-white/10 bg-[#0a0a0a]/80 px-6 py-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
             <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <Sparkles className="h-3 w-3 text-black" />
             </div>
             <span className="text-sm font-medium tracking-wide text-white/90">POC Review</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-white/60">
            <button onClick={() => scrollToDesigns(0)} className="hover:text-white transition-colors duration-200">Concept</button>
            <button onClick={scrollToContact} className="hover:text-white transition-colors duration-200">Discuss</button>
          </nav>
          <button
            onClick={onBook}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-gray-200 transition-colors"
          >
            Book Call
          </button>
        </div>
      </motion.header>

      <main className="bg-[#030303] text-white selection:bg-emerald-500/30">
        
        {/* HERO SECTION - NO SCROLL NEEDED TO SEE VALUE */}
        <section className="relative min-h-[100dvh] w-full flex items-center overflow-hidden pt-28 lg:pt-32 pb-12">
          {/* Stunning Background Ambient Effects */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-[150px] mix-blend-screen" />
             <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-400/5 blur-[120px] mix-blend-screen" />
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/50 to-[#030303]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-20 lg:items-center">
            
            {/* Left Content */}
            <motion.div
               variants={staggerContainer}
               initial="hidden"
               animate="visible"
               className="max-w-2xl flex flex-col"
            >
              <motion.div variants={slideUp} className="mb-4 lg:mb-6 self-start inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Exclusive Preview • {poc.clientName}
              </motion.div>
              
              <motion.h1 
                variants={slideUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.05] text-white mb-6"
              >
                {poc.title || "Your brand's new digital presence."}
              </motion.h1>

              <motion.p 
                variants={slideUp}
                className="hidden lg:block text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mb-10 font-light"
              >
                We analyzed your current experience and engineered a vastly superior, high-converting direction. <strong className="text-white font-medium">Here is what we solved:</strong>
              </motion.p>

              {/* Directly showing the deliverables/value prop in the hero so they don't have to scroll */}
              <motion.div variants={slideUp} className="hidden lg:flex flex-col gap-4 mb-12">
                {deliverables.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200 text-base">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-3 lg:gap-4 order-last lg:order-none mt-6 lg:mt-0">
                <button
                  type="button"
                  onClick={() => scrollToDesigns()}
                  className="inline-flex h-12 lg:h-14 items-center justify-center gap-3 rounded-full bg-emerald-500 px-8 text-sm font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  Explore the Concept
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex h-12 lg:h-14 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm"
                >
                  Share Your Thoughts
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Massive Striking Hero Image */}
            <motion.div 
               initial={{ opacity: 0, x: 100, rotateY: 15, rotateX: 5 }}
               animate={{ opacity: 1, x: 0, rotateY: -2, rotateX: 2 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
               className="relative lg:h-[85vh] w-full flex items-center justify-center perspective-[2000px] mt-4 lg:mt-0 order-2 lg:order-none"
            >
               {firstImage && (
                 <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(16,185,129,0.15)] group transform-gpu">
                    <div className="absolute inset-x-0 top-0 h-10 border-b border-white/10 bg-[#111] flex items-center px-4 gap-2 z-10">
                       <div className="flex gap-1.5">
                         <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                         <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                         <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                       </div>
                       <div className="ml-4 h-5 w-48 rounded-md bg-white/5 border border-white/5 flex items-center px-2">
                         <span className="text-[9px] text-white/30 uppercase tracking-widest">{poc.clientName} Preview</span>
                       </div>
                    </div>
                    
                    <div className="w-full aspect-[16/10] lg:aspect-auto lg:h-[calc(85vh-2.5rem)] relative overflow-hidden bg-[#0a0a0a]">
                       <img 
                         src={firstImage.src} 
                         alt={firstImage.alt} 
                         className="w-full h-full object-cover object-top filter brightness-[0.9] transition-transform duration-1000 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                    
                    {/* Hover reveal play button style to click into gallery */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                      <button 
                        onClick={() => scrollToDesigns(0)}
                        className="h-20 w-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 hover:scale-105 transition-all shadow-2xl"
                      >
                         <Maximize2 className="h-6 w-6" />
                      </button>
                    </div>
                 </div>
               )}

               {/* Stats / Process Float Note */}
               {processNotes[0] && (
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1, duration: 0.8 }}
                   className="absolute -bottom-6 -left-6 z-30 max-w-sm rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 backdrop-blur-xl shadow-2xl hidden md:block"
                 >
                    <div className="flex items-center gap-3 mb-2">
                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-400 font-bold">1</span>
                       <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Design Process</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {processNotes[0]}
                    </p>
                 </motion.div>
               )}
            </motion.div>

          </div>
        </section>

        {/* FULL WIDTH IMMERSIVE GALLERY SECTION */}
        <section ref={galleryRef} className="py-24 bg-gradient-to-b from-[#030303] to-[#0a0a0a] border-t border-white/5 relative z-10">
          <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">Complete Visual Breakdown</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{poc.intro}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!emblaApi?.canScrollPrev()}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!emblaApi?.canScrollNext()}
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="pl-6 lg:pl-12 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
               {images.map((image, index) => (
                 <div key={image.src + index} className="min-w-0 flex-[0_0_85%] md:flex-[0_0_65%] lg:flex-[0_0_55%] pr-6 md:pr-8">
                   <div 
                     className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] cursor-pointer"
                     onClick={() => {
                        emblaApi?.scrollTo(index);
                        setIsLightboxOpen(true);
                     }}
                   >
                     <img 
                       src={image.src} 
                       alt={image.alt}
                       draggable={false}
                       className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 select-none pointer-events-none"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full self-start mb-4">
                          {image.kind}
                        </div>
                        <p className="text-white md:text-lg max-w-2xl font-light transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {image.caption}
                        </p>
                     </div>
                     <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                        <Maximize2 className="h-5 w-5" />
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12 mt-10">
            <div className="flex flex-wrap gap-2">
               {images.map((image, index) => (
                 <button
                   key={index}
                   onClick={() => emblaApi?.scrollTo(index)}
                   className={`h-2 rounded-full transition-all duration-300 ${
                     selectedIndex === index ? 'w-12 bg-emerald-500' : 'w-2 bg-white/20 hover:bg-white/40'
                   }`}
                 />
               ))}
            </div>
          </div>
        </section>

        {/* ULTRA-PREMIUM CONTACT / NEXT STEPS SECTION */}
        <section ref={contactRef} className="py-24 bg-[#050505] relative border-t border-white/5">
           {/* Glow Effect */}
           <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] mix-blend-screen pointer-events-none" />

           <div className="mx-auto w-full max-w-5xl px-6 relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">Let's build this together.</h2>
                 <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    If this direction resonates with your brand's vision, drop a quick note. We'll handle the next steps. No friction.
                 </p>
              </div>

              <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl">
                 <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        Direct Line
                      </div>
                      <h3 className="text-2xl font-medium text-white mb-4">Fastest way forward</h3>
                      <p className="text-sm text-gray-400 mb-8 max-w-sm">
                        Submit this quick note to instantly notify the design team. We typically respond within the hour.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                       <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Mail className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-sm">{CONTACT_EMAIL}</span>
                       </a>
                       <button onClick={onBook} className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors group">
                          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <CalendarDays className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-sm">Schedule a deep-dive call</span>
                       </button>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid md:grid-cols-2 gap-5">
                       <input
                          id={nameId}
                          name="name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-[#111]"
                       />
                       <input
                          id={emailId}
                          name="email"
                          type="email"
                          required
                          placeholder="Work Email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-[#111]"
                       />
                    </div>
                    
                    <textarea
                       id={messageId}
                       name="message"
                       required
                       rows={5}
                       value={formData.message}
                       onChange={handleChange}
                       disabled={isSubmitting}
                       className="w-full rounded-[1.5rem] border border-white/10 bg-black/50 px-5 py-5 text-white placeholder:text-gray-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-[#111] resize-none"
                    />

                    {submitError && (
                      <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                        {submitError}
                      </p>
                    )}
                    {submitSuccess && (
                      <p className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-400">
                        {submitSuccess}
                      </p>
                    )}

                    <div className="flex justify-end mt-2">
                       <button
                         type="submit"
                         disabled={isSubmitting || !isFormValid}
                         className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                       >
                         {isSubmitting ? 'Sending Note...' : "Send Note"}
                         <Send className="h-4 w-4" />
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </section>

      </main>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && selectedGalleryImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex flex-col"
          >
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            
            <div className="relative z-20 flex items-center justify-between p-6 md:p-8">
              <div className="max-w-2xl">
                <span className="inline-block mb-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  {selectedGalleryImage.kind}
                </span>
                <p className="text-gray-300 text-sm md:text-base font-light">
                  {selectedGalleryImage.caption}
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="h-14 w-14 shrink-0 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 relative z-0">
               <button
                 onClick={() => emblaApi?.scrollPrev()}
                 disabled={!emblaApi?.canScrollPrev()}
                 className="absolute left-6 z-20 h-14 w-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-0 transition-all backdrop-blur-md"
               >
                 <ChevronLeft className="h-6 w-6" />
               </button>
               
               <img
                 src={selectedGalleryImage.src}
                 alt={selectedGalleryImage.alt}
                 className="max-h-[85vh] max-w-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
               />

               <button
                 onClick={() => emblaApi?.scrollNext()}
                 disabled={!emblaApi?.canScrollNext()}
                 className="absolute right-6 z-20 h-14 w-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-0 transition-all backdrop-blur-md"
               >
                 <ChevronRight className="h-6 w-6" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
