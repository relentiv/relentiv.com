import {useId, useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';
import Seo from '../components/Seo';
import {buildBreadcrumbSchema} from '../lib/site';

export default function ContactPage() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
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
        message: formData.message,
      });

      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setSubmitSuccess('Your message has been sent. We will review it and get back to you soon.');
    } catch (error) {
      console.error('Failed to submit contact request:', error);
      const {getContactSubmissionErrorMessage} = await import('../lib/firebase/contact');
      setSubmitError(getContactSubmissionErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  return (
    <>
      <Seo
        title="Contact | Relentiv"
        description="Contact Relentiv to discuss a product build, modernization initiative, or technical consulting engagement."
        path="/contact"
        schemas={[
          buildBreadcrumbSchema([
            {name: 'Home', path: '/'},
            {name: 'Contact', path: '/contact'},
          ]),
        ]}
      />
      <main id="main-content" className="min-h-screen bg-[#050505] px-6 pt-32 pb-24 text-white">
        <div className="mx-auto max-w-5xl">
          <header className="mb-16 border-b border-white/10 pb-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60">Contact</p>
            <h1 className="mb-6 text-5xl font-medium tracking-tighter md:text-7xl">Start a project conversation.</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
              Share a brief outline of your goals and our team will review the request and follow up through the configured contact workflow.
            </p>
          </header>

          <section aria-labelledby="contact-form-title" className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 id="contact-form-title" className="mb-8 text-3xl font-medium text-white">
                Contact form
              </h2>
              <div className="space-y-6">
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
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={emailId} className="text-sm text-gray-300">
                    Email
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={messageId} className="text-sm text-gray-300">
                    Message
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-white outline-none transition-colors focus:border-emerald-500/50"
                  ></textarea>
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
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Send inquiry'}
                </button>
              </div>
            </form>

            <aside aria-labelledby="contact-details-title" className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 id="contact-details-title" className="mb-6 text-2xl font-medium text-white">
                Contact details
              </h2>
              <p className="mb-4 text-gray-400">Email: hello@relentiv.com</p>
              {/* <p className="mb-4 text-gray-400">Phone: +1 (415) 555-0198</p> */}
              <p className="text-gray-400">Kudlu Gate, Bengaluru, Karnataka, India </p>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}
