import {useEffect, useRef} from 'react';
import {useLocation} from 'wouter';

type ScrollPosition = {
  x: number;
  y: number;
};

export default function ScrollRestoration() {
  const [location] = useLocation();
  const positionsRef = useRef<Record<string, ScrollPosition>>({});
  const previousLocationRef = useRef(location);
  const isPopNavigationRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const handlePopState = () => {
      isPopNavigationRef.current = true;
    };

    const saveCurrentScrollPosition = () => {
      positionsRef.current[previousLocationRef.current] = {
        x: window.scrollX,
        y: window.scrollY,
      };
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', saveCurrentScrollPosition);

    return () => {
      saveCurrentScrollPosition();
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', saveCurrentScrollPosition);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    positionsRef.current[previousLocationRef.current] = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const restoreScroll = () => {
      const hash = window.location.hash;

      if (hash) {
        const targetId = decodeURIComponent(hash.slice(1));
        const target =
          document.getElementById(targetId) ?? document.getElementsByName(targetId)[0];

        if (target) {
          target.scrollIntoView({behavior: 'auto', block: 'start'});
          return;
        }
      }

      if (isPopNavigationRef.current) {
        const savedPosition = positionsRef.current[location];

        if (savedPosition) {
          window.scrollTo({
            left: savedPosition.x,
            top: savedPosition.y,
            behavior: 'auto',
          });
          return;
        }
      }

      window.scrollTo({left: 0, top: 0, behavior: 'auto'});
    };

    let nestedFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      nestedFrame = window.requestAnimationFrame(restoreScroll);
    });

    isPopNavigationRef.current = false;
    previousLocationRef.current = location;

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(nestedFrame);
    };
  }, [location]);

  return null;
}
