"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const GOLD = "#d4af37";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay or when everything is mounted
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080c12]"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

          <div className="relative flex flex-col items-center">
            {/* Animated Initials Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mb-8"
            >
              <h1 
                className="font-serif text-5xl md:text-7xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f0d060] to-[#b8860b]"
                style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))" }}
              >
                A & H
              </h1>
              
              {/* Pulsing ring around logo */}
              <motion.div
                className="absolute inset-[-20px] border border-[#d4af37]/20 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Progress line */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
               <motion.div 
                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 style={{ width: "50%" }}
               />
            </div>

            {/* Subtle Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-sans text-[9px] tracking-[0.5em] uppercase text-[#d4af37]/60"
            >
              Loading Your Invitation
            </motion.p>
          </div>

          {/* Golden ornaments in corners */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#d4af37]/20" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#d4af37]/20" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#d4af37]/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#d4af37]/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
