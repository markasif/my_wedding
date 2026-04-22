"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─── Constants ─── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const GOLD = "#d4af37";

/* ─── Floating Particle ─── */
function Particle({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute bottom-[-10%] rounded-full pointer-events-none bg-white/20 blur-[1px]"
      style={{ left: x, width: size, height: size }}
      animate={{
        y: ["0%", "-120vh"],
        opacity: [0, 0.4, 0],
        x: ["0%", (Math.random() > 0.5 ? "20px" : "-20px")],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/* ─── Main Hero component ─── */
export function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax mouse track */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const bgX = useTransform(springX, [-1, 1], [-20, 20]);
  const bgY = useTransform(springY, [-1, 1], [-20, 20]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    mouseX.set((e.clientX / w - 0.5) * 2);
    mouseY.set((e.clientY / h - 0.5) * 2);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (!mounted) return <div className="h-screen bg-[#080c12]" />;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 bg-[#080c12]"
    >
      {/* ── Background image with Parallax ── */}
      <motion.div 
        className="absolute inset-[-40px] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <Image
          src="/images/hero-bg-royal-v2.png"
          alt="Royal Wedding Backdrop"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105"
        />
        {/* Overlays for Depth and Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c12]/95 via-[#080c12]/40 to-[#080c12]/95" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" 
             style={{ background: "radial-gradient(circle at 50% 40%, transparent 0%, rgba(8,12,18,0.98) 100%)" }} />
      </motion.div>

      {/* ── Ambient Particles ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <Particle x="10%" delay={0} size={2} />
        <Particle x="25%" delay={2} size={3} />
        <Particle x="45%" delay={4} size={1.5} />
        <Particle x="70%" delay={1} size={2.5} />
        <Particle x="85%" delay={5} size={2} />
        <Particle x="95%" delay={3} size={4} />
      </div>

      {/* ── Main content wrapper — Improved contrast box ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl py-12 px-6 rounded-lg">

        {/* 1. Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
          className="mb-4 md:mb-6"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            style={{
              fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
              fontSize: "clamp(1.6rem, 6vw, 3.8rem)",
              color: GOLD,
              textShadow: "0 0 40px rgba(212,175,55,0.7), 0 0 80px rgba(212,175,55,0.3)",
              direction: "rtl"
            }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </motion.div>

        {/* 2. Names (Clean & Elegant) */}
        <div className="mb-4 md:mb-6 w-full px-4 relative">
          {/* Typography Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-[180px] md:text-[320px] text-gold/[0.03] select-none pointer-events-none z-[-1] whitespace-nowrap">
            A & H
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE_OUT }}
            style={{ willChange: "transform, opacity" }}
          >
            <h1 className="font-serif text-white flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10 leading-none tracking-tight">
              <span className="gold-gradient-text" style={{ fontSize: "clamp(2.8rem, 10vw, 6.5rem)", fontWeight: 700 }}>
                Asif
              </span>
              <span className="font-pinyon italic text-[#d4af37] opacity-80" 
                    style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)", fontFamily: "var(--font-pinyon)" }}>
                &amp;
              </span>
              <span className="gold-gradient-text" style={{ fontSize: "clamp(2.8rem, 10vw, 6.5rem)", fontWeight: 700 }}>
                Hiba
              </span>
            </h1>
          </motion.div>
        </div>

        {/* 3. Date & Venue (Summary) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE_OUT }}
          className="flex flex-col items-center gap-4 md:gap-6 mb-4 md:mb-6"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gold blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative px-6 py-2 md:px-12 md:py-3 border-y border-[#d4af37]/40 bg-black/40 backdrop-blur-md">
               <p className="font-sans text-[10px] md:text-[14px] tracking-[0.4em] md:tracking-[0.7em] uppercase text-[#d4af37] font-bold">
                 May 17, 2026 • Sunday
               </p>
            </div>
          </div>
          
          <p className="font-serif italic text-white/90 text-lg md:text-2xl tracking-wide">
            Zubaida Park Auditorium, Vengara
          </p>
        </motion.div>

        {/* 4. CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="#rsvp"
            className="group relative inline-block px-6 py-3 md:px-14 md:py-4 overflow-hidden rounded-sm shimmer-gold"
          >
            <div className="absolute inset-0 border-2 border-[#d4af37]/50" />
            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[#d4af37] group-hover:text-black font-sans text-[10px] md:text-[12px] tracking-[0.5em] uppercase transition-colors duration-500 font-bold">
              Confirm Attendance
            </span>
          </a>
        </motion.div>


      </div>

    </section>
  );
}
