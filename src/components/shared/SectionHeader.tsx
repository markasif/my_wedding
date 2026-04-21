"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#d4af37";

interface SectionHeaderProps {
  arabicTitle: string;
  englishTitle: string;
  mainTitle?: string;
  inView: boolean;
  className?: string;
  showTopMargin?: boolean;
}

export function SectionHeader({
  arabicTitle,
  englishTitle,
  mainTitle,
  inView,
  className = "mb-2 md:mb-4 lg:mb-6",
  showTopMargin = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className={`text-center ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        style={{
          fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
          fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
          color: GOLD,
          marginBottom: "4px",
          direction: "rtl",
        }}
        className={showTopMargin ? "mt-6" : ""}
      >
        {arabicTitle}
      </div>
      <p className="font-sans text-[10px] md:text-[11px] tracking-[0.6em] uppercase text-[#b8860b]/60 mb-2 font-semibold">
        {englishTitle}
      </p>

      {mainTitle && (
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-[#6b2737] mb-2 tracking-tight uppercase">
          {mainTitle}
        </h2>
      )}

      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
        <span className="text-[#d4af37] text-lg">❦</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
      </div>
    </motion.div>
  );
}
