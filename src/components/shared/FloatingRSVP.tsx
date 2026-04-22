"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingRSVP() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[999] flex items-center justify-center"
        >
          <div className="relative group">
            {/* Shimmering Button - Now with Royal Glass */}
            <div className={`
              gold-gradient-bg shimmer-gold royal-glass gold-rim-glow
              px-8 py-3.5 rounded-full 
              shadow-[0_12px_40px_rgba(107,39,55,0.2)]
              border border-gold/30
              flex items-center gap-3
            `}>
              <span className="text-black font-sans text-[10px] md:text-[12px] tracking-[0.2em] uppercase font-bold">
                Confirm Attendance
              </span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="black" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* Pulse effect - More refined */}
            <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30 pointer-events-none" />
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
