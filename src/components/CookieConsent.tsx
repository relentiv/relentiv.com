import {useEffect, useState} from 'react';

const GA_ID = import.meta.env?.VITE_GA4_ID;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!import.meta.env?.PROD || !GA_ID) {
      return;
    }

    const stored = window.localStorage.getItem('relentiv-cookie-consent');
    setVisible(!stored);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[110] mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#050505]/95 p-5 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-300">
          Relentiv uses analytics cookies to understand site traffic after you opt in.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem('relentiv-cookie-consent', 'declined');
              setVisible(false);
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem('relentiv-cookie-consent', 'accepted');
              window.dispatchEvent(new Event('relentiv-cookie-consent'));
              window.location.reload();
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
