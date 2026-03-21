import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "motion/react";

interface PageTransitionProps {
  enabled?: boolean;
  duration?: number;
  hold?: number;
}

export default function PageTransition({ 
  enabled = true, 
  duration = 2.0, 
  hold = 0.2 
}: PageTransitionProps) {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    
    // When location changes, show the overlay
    setIsVisible(true);
    
    // Hide it shortly after to create a reveal effect
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, hold * 1000);
    
    return () => clearTimeout(timer);
  }, [location, enabled, hold]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="transition-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] pointer-events-none bg-[#050505] flex items-center justify-center"
        >
          {/* Rough Gradient & Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-[#050505] to-[#050505] opacity-90"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/30 rounded-full blur-[120px]"></div>
          
          {/* Noise */}
          <div
            className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
