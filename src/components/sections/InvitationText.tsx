"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "../shared/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

export function InvitationText() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#fdfaf4] py-6 md:py-8 lg:py-10 xl:py-12 overflow-hidden"
    >
      {/* ── Artistic Background Elements ── */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} 
      />
      
      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Ornate Borders ── */}
      <div className="absolute inset-4 md:inset-8 border-[0.5px] border-[#d4af37]/20 pointer-events-none rounded-sm" />
      <div className="absolute inset-6 md:inset-12 border-[1.5px] border-[#d4af37]/10 pointer-events-none rounded-sm shadow-inner" />

      {/* Decorative Ornaments (Corners) */}
      {[
        "top-8 left-8 rotate-0",
        "top-8 right-8 rotate-90",
        "bottom-8 left-8 -rotate-90",
        "bottom-8 right-8 rotate-180"
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-[#d4af37]/30 pointer-events-none select-none hidden lg:block`}>
           <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 C20,0 40,20 40,40 C40,20 60,0 80,0 C60,0 40,-20 40,-40 C40,-20 20,0 0,0 Z" />
           </svg>
        </div>
      ))}

      <div className="relative max-w-6xl mx-auto text-center px-10 xl:px-12">
        
        {/* 1. Bilingual Header */}
        <SectionHeader
          arabicTitle="دعوة الزفاف"
          englishTitle="Wedding Invitation"
          inView={inView}
          showTopMargin={true}
          className="mb-2 md:mb-4 lg:mb-6"
        />

        {/* 2. Formal Opening */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, delay: 0.1, ease: EASE }}
           className="mb-2 md:mb-4 lg:mb-6"
        >
          <p className="font-serif italic text-text-muted text-base md:text-2xl leading-relaxed max-w-2xl mx-auto opacity-80">
            "Together with our families, we request the honour of your presence at the wedding ceremony of our children"
          </p>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-2" />
        </motion.div>

        {/* 3. The Families Section (Symmetric Mirrors) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 md:mb-4 lg:mb-6 relative">
          
          {/* Elegant Center Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent transform -translate-x-1/2" />

          {/* Groom's Family Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="flex flex-col items-center h-full"
          >
            <div className="relative p-6 md:p-8 lg:p-10 xl:p-12 w-full h-full border border-gold/15 bg-white/40 royal-shadow paper-texture rounded-sm flex flex-col group overflow-hidden">
               {/* Subtle Watermark Ornament */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/[0.04] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 20 C60 0 100 0 100 40 C100 70 50 100 50 100 C50 100 0 70 0 40 C0 0 40 0 50 20 Z" />
                  </svg>
               </div>

               {/* Label */}
               <div className="relative">
                 <span className="inline-block px-2 md:px-4 py-1 border border-gold/30 text-[8px] md:text-[10px] tracking-[0.6em] uppercase text-gold font-bold mb-2 md:mb-6 bg-white/80 shadow-sm mt-2">Groom</span>
               </div>
               
               {/* Name */}
               <h3 className="font-serif text-2xl md:text-5xl font-bold text-burgundy tracking-tight mb-2 md:mb-6 relative">
                 Mohammed Asif
               </h3>

               {/* Parents */}
                <div className="space-y-2 md:space-y-3 mb-2 md:mb-6 flex-grow flex flex-col justify-center relative">
                   <span className="font-script text-3xl text-gold-muted leading-none block">Son of</span>
                  <div className="space-y-1">
                    <p className="font-serif text-dark-mid text-base md:text-xl font-bold uppercase tracking-wide">Mr. Mohamed Aliparambil</p>
                    <p className="font-serif italic text-gold-muted py-1 opacity-60 text-lg">&amp;</p>
                    <p className="font-serif text-dark-mid text-base md:text-xl font-bold uppercase tracking-wide">Mrs. Ayishabeevi Valiyapeediyekkal</p>
                  </div>
               </div>

               {/* Address */}
                <div className="pt-2 md:pt-6 mt-auto relative">
                   <p className="font-sans text-[10px] text-text-muted tracking-[0.2em] uppercase leading-relaxed max-w-[280px] mx-auto font-medium">
                    ALIPARAMBIL(H), KUTTALOOR, <br className="hidden md:block" /> VENGARA, MALAPPURAM
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Bride's Family Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="flex flex-col items-center h-full"
          >
            <div className="relative p-6 md:p-8 lg:p-10 xl:p-12 w-full h-full border border-gold/15 bg-white/40 royal-shadow paper-texture rounded-sm flex flex-col group overflow-hidden">
               {/* Subtle Watermark Ornament */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/[0.04] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 20 C60 0 100 0 100 40 C100 70 50 100 50 100 C50 100 0 70 0 40 C0 0 40 0 50 20 Z" />
                  </svg>
               </div>

               {/* Label */}
                <div className="relative">
                  <span className="inline-block px-2 md:px-4 py-1 border border-gold/30 text-[8px] md:text-[10px] tracking-[0.6em] uppercase text-gold font-bold mb-2 md:mb-6 bg-white/80 shadow-sm mt-2">Bride</span>
                </div>
               
               {/* Name */}
                <h3 className="font-serif text-2xl md:text-5xl font-bold text-burgundy tracking-tight mb-2 md:mb-6 relative">
                 Hiba
               </h3>

               {/* Parents */}
                <div className="space-y-2 md:space-y-3 mb-2 md:mb-6 flex-grow flex flex-col justify-center relative">
                   <span className="font-script text-3xl text-gold-muted leading-none block">Daughter of</span>
                  <div className="space-y-1">
                    <p className="font-serif text-dark-mid text-base md:text-xl font-bold uppercase tracking-wide">Mr. Mohammed KP</p>
                    <p className="font-serif italic text-gold-muted py-1 opacity-60 text-lg">&amp;</p>
                    <p className="font-serif text-dark-mid text-base md:text-xl font-bold uppercase tracking-wide">Mrs. Hajara Mohammed</p>
                  </div>
               </div>

               {/* Address */}
                <div className="pt-2 md:pt-6 mt-auto relative">
                   <p className="font-sans text-[10px] text-text-muted tracking-[0.2em] uppercase leading-relaxed max-w-[320px] mx-auto font-medium">
                    KADAKKADAN PADATH PEEDIYAKKAL(H), <br className="hidden md:block" /> PUTHANPEEDIKA, OORAKAM MELMURI
                  </p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* 4. Secondary Information Area (Symmetric Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 md:mb-4 lg:mb-6 relative">
          
          {/* Left: Digital Navigation (Below Groom) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="flex flex-col items-center h-full"
          >
            <div className="relative p-4 md:p-8 bg-white/60 backdrop-blur-sm border border-gold/20 royal-shadow paper-texture rounded-sm w-full h-full flex flex-col items-center justify-center group overflow-hidden">
               <div className="relative p-1.5 bg-white border border-gold/30 rounded-sm max-w-[120px] transition-all duration-700 hover:border-gold">
                  <div className="relative aspect-square overflow-hidden bg-white border border-gold/10">
                     <img 
                       src="/images/barcode.jpeg" 
                       alt="Location QR Code"
                       className="w-full h-full object-cover" 
                     />
                  </div>
               </div>
                <div className="mt-2 md:mt-4 text-center">
                   <span className="font-script text-2xl text-gold block mb-0.5 md:mb-1">Venue Location</span>
                   <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-gold/60 font-bold leading-none">Scan to Navigate</p>
                </div>
            </div>
          </motion.div>

          {/* Right: Special Recognition (Below Bride) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="flex flex-col items-center h-full"
          >
            <div className="relative p-4 md:p-8 bg-white/60 backdrop-blur-sm border border-gold/20 royal-shadow paper-texture rounded-sm w-full h-full flex flex-col items-center justify-center group overflow-hidden">
               {/* Background pattern */}
               <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/vintage-speckles.png')]" />
               
                              <p className="font-script text-2xl text-gold mb-2 md:mb-4 leading-none text-center">Sharing Love & Happiness</p>
                
                <div className="flex flex-col items-center gap-1.5 md:gap-2 w-full">
                   <p className="font-serif text-lg md:text-2xl font-bold text-burgundy tracking-tight">Fathima Rinfa</p>
                   <span className="font-script text-2xl text-gold opacity-50">&amp;</span>
                   <p className="font-serif text-lg md:text-2xl font-bold text-burgundy tracking-tight">Fathima Rena</p>
                </div>
            </div>
          </motion.div>
        </div>

        {/* 5. Heartfelt Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="pt-2 md:pt-8"
        >
          <p className="font-serif italic text-base text-text-muted mb-4 max-w-2xl mx-auto opacity-80 leading-relaxed">
            "Your presence will add more joy to our occasion and we look forward to celebrating together"
          </p>
          

        </motion.div>

      </div>

    </section>
  );
}
