export const isPrerender =
  typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);
