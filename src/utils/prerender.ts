export const isPrerender =
  typeof window === 'undefined' ||
  (typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent));
