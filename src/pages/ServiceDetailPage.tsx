import Seo from '../components/Seo';
import {services, getServiceBySlug} from '../data/services';
import {buildBreadcrumbSchema} from '../lib/site';
import NotFoundPage from './NotFoundPage';

interface ServiceDetailPageProps {
  slug: string;
  onBook: () => void;
}

export default function ServiceDetailPage({slug, onBook}: ServiceDetailPageProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFoundPage />;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Relentiv',
      url: 'https://relentiv.com',
    },
    serviceType: service.title,
    areaServed: 'Worldwide',
    url: `https://relentiv.com/services/${service.slug}`,
  };

  const breadcrumbs = buildBreadcrumbSchema([
    {name: 'Home', path: '/'},
    {name: 'Services', path: '/services'},
    {name: service.title, path: `/services/${service.slug}`},
  ]);

  return (
    <>
      <Seo
        title={`${service.title} | Relentiv`}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        schemas={[schema, breadcrumbs]}
      />
      <main id="main-content" className="relative min-h-screen overflow-hidden bg-[#050505] pt-32 pb-24 font-sans text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-black pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
          <section aria-labelledby="service-detail-title" className="mb-20 min-h-[40vh] border-b border-white/10 pb-16">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-white/60">Service Detail</p>
            <h1 id="service-detail-title" className="mb-8 text-5xl font-medium tracking-tighter md:text-7xl">
              {service.title}
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-400">{service.description}</p>
          </section>

          <section aria-labelledby="service-detail-features" className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 id="service-detail-features" className="mb-8 text-3xl font-medium tracking-tight text-white">
                Delivery scope
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <aside aria-labelledby="service-detail-tags" className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 id="service-detail-tags" className="mb-6 text-2xl font-medium text-white">
                Technology focus
              </h2>
              <ul className="flex flex-wrap gap-3">
                {service.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">
                    {tag}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onBook}
                className="mt-10 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
              >
                Book a Consultation
              </button>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}
