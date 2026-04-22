"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "../shared/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#d4af37";

interface EventItem {
  type: string;
  venue: string;
  date: string;
  time: string;
  address: string;
  mapLink: string;
  icon: string;
}

const events: EventItem[] = [
  {
    type: "Nikkah Ceremony",
    venue: "Zubaida Park Auditorium",
    date: "May 16, 2026 — Saturday",
    time: "10:00 AM",
    address: "Pathumoochi, Vengara, Kerala",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Zubaida+Park+Auditorium+Pathumoochi+Vengara+Kerala",
    icon: "🕌",
  },
  {
    type: "Night Program",
    venue: "Groom's Residence",
    date: "May 16, 2026 — Saturday",
    time: "7:00 PM - 10:30 PM",
    address: "Aliparambil House, Kuttaloor, Vengara",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Mohammed+Aliparambil+House&query_place_id=ChIJzacREABLpqMDUzwuSA50-S4",
    icon: "🌙",
  },
  {
    type: "Marriage Ceremony",
    venue: "Zubaida Park Auditorium",
    date: "May 17, 2026 — Sunday",
    time: "11:30 AM – 3:00 PM",
    address: "Pathumoochi, Vengara, Kerala",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Zubaida+Park+Auditorium+Pathumoochi+Vengara+Kerala",
    icon: "💍",
  },
];

export function EventDetails() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="details"
      ref={ref}
      className="relative bg-[#fdfaf4] py-6 md:py-8 lg:py-10 xl:py-12 overflow-hidden"
    >
      {/* ── Background Patterns ── */}
      <div className="absolute inset-0 bg-[#fdfaf4]" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/royal-feather.png')" }} />
      
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#b8860b]/10 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-10 xl:px-12">
        
        <SectionHeader
          arabicTitle="احتفالات الزفاف"
          englishTitle="Ceremony & Celebration"
          mainTitle="Join Us in Celebration"
          inView={inView}
          className="mb-2 md:mb-4 lg:mb-6"
        />

        {/* Section Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-[180px] md:text-[280px] text-gold/[0.02] select-none pointer-events-none z-0 whitespace-nowrap">
          Ceremony
        </div>

        {/* ── Event Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 xl:gap-12">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
              className="group relative"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Card Shadow Layer */}
              <div className="absolute inset-2 bg-black/5 blur-2xl rounded-sm transform group-hover:translate-y-4 transition-transform duration-700" />
              
              {/* Card - Main Content Layer */}
              <div className="relative h-full royal-card-bg royal-glass gold-rim-glow border border-gold/20 p-4 md:p-6 lg:p-7 xl:p-8 flex flex-col items-center text-center rounded-sm transition-all duration-700 group-hover:-translate-y-2 box-shadow-xl group-hover:shadow-gold/10">
                
                {/* Decorative Subtle Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/fancy-pants.png')]" />
                
                {/* Decorative Inner Frame - Hidden on Mobile to reduce "line" clutter */}
                <div className="hidden md:block absolute inset-3 border border-gold/10 rounded-sm pointer-events-none" />
                <div className="hidden md:block absolute inset-4 border-[0.5px] border-gold/5 rounded-sm pointer-events-none" />
                


                {/* Event Type */}
                <h3 className="font-serif text-xl md:text-2xl font-bold text-burgundy mb-2 md:mb-4 tracking-tight group-hover:gold-gradient-text transition-all duration-500">
                  {ev.type}
                </h3>

                {/* Details List - Compact Standard Layout */}
                <div className="flex flex-col gap-2 md:gap-4 mb-2 md:mb-6 w-full relative z-10">
                  
                  {/* Temporal Block */}
                  <div className="flex flex-col items-center">
                    <p className="font-serif text-dark-mid font-bold text-base md:text-lg leading-tight uppercase tracking-widest">
                      {ev.date}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 md:mt-1.5">
                       <span className="font-pinyon text-gold-muted text-base opacity-70 italic">at</span>
                       <span className="font-serif text-dark-mid font-semibold text-sm md:text-base opacity-90">{ev.time}</span>
                    </div>
                  </div>

                  {/* Ornate Divider */}
                  <div className="flex items-center justify-center gap-3 py-0.5 md:py-1 opacity-50">
                     <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/30" />
                     <div className="text-gold text-xs">❦</div>
                     <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/40" />
                  </div>

                  {/* Spatial Block */}
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-0.5 mb-1 md:mb-1.5">
                       <span className="font-pinyon text-gold-muted text-base opacity-70 italic">held at</span>
                       <p className="font-serif text-dark-mid font-bold text-base md:text-lg leading-tight uppercase tracking-tight">
                         {ev.venue}
                       </p>
                    </div>
                    <p className="font-sans text-[9px] text-text-muted mt-1 md:mt-1.5 tracking-[0.15em] leading-relaxed font-medium uppercase max-w-[200px] mx-auto opacity-70">
                      {ev.address}
                    </p>
                  </div>
                </div>

                {/* Map Link / Button */}
                <a
                  href={ev.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto group/btn relative inline-flex items-center gap-3 px-6 py-2.5 border border-gold/30 text-gold font-sans text-[8px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 rounded-sm hover:text-black font-bold"
                >
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10">Get Directions</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>

              {/* Float Ornament (Upgraded from dots to Royal Flourish) */}
              <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center text-gold/30 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-45 group-hover:scale-125 pointer-events-none animate-float-slow">
                 <svg viewBox="0 0 100 100" fill="currentColor" width="40" height="40">
                    <path d="M50,0 C55,30 70,45 100,50 C70,55 55,70 50,100 C45,70 30,55 0,50 C30,45 45,30 50,0 Z" />
                 </svg>
              </div>
            </motion.div>
          ))}
        </div>


      </div>

      {/* Background Side Elements */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/15 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/15 to-transparent" />
    </section>
  );
}
