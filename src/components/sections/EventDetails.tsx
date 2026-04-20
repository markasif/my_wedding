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
  dayLabel: string;
}

const events: EventItem[] = [
  {
    type: "Nikkah Ceremony",
    venue: "Zubaida Park Auditorium",
    date: "May 16, 2026 — Friday",
    time: "To Be Announced",
    address: "Pathumoochi, Vengara, Kerala",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Zubaida+Park+Auditorium+Pathumoochi+Vengara+Kerala",
    icon: "🕌",
    dayLabel: "Day 01",

  },
  {
    type: "Night Program",
    venue: "Groom's Residence",
    date: "May 16, 2026 — Friday",
    time: "Evening Onwards",
    address: "Aliparambil House, Kuttaloor, Vengara",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Mohammed+Aliparambil+House&query_place_id=ChIJzacREABLpqMDUzwuSA50-S4",
    icon: "🌙",
    dayLabel: "Day 01",

  },
  {
    type: "Marriage Ceremony",
    venue: "Zubaida Park Auditorium",
    date: "May 17, 2026 — Sunday",
    time: "11:30 AM – 3:00 PM",
    address: "Pathumoochi, Vengara, Kerala",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Zubaida+Park+Auditorium+Pathumoochi+Vengara+Kerala",
    icon: "💍",
    dayLabel: "Day 02",

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
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#b8860b]/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        
        <SectionHeader
          arabicTitle="احتفالات الزفاف"
          englishTitle="Ceremony & Celebration"
          mainTitle="Join Us in Celebration"
          inView={inView}
          className="mb-2 md:mb-4 lg:mb-6"
        />

        {/* ── Event Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
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
              <div className="relative h-full bg-white paper-texture border border-gold/15 p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col items-center text-center rounded-sm transition-all duration-700 group-hover:-translate-y-2">
                
                {/* Decorative Inner Frame */}
                <div className="absolute inset-3 border border-gold/10 rounded-sm pointer-events-none" />
                <div className="absolute inset-4 border-[0.5px] border-gold/5 rounded-sm pointer-events-none" />
                
                {/* Day Marker & Title */}
                <div className="mb-4 relative w-full">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gold/10" />
                  <span className="relative z-10 font-script text-xl text-gold pb-1 bg-white px-3">
                    {ev.dayLabel}
                  </span>
                </div>

                {/* Event Type */}
                <h3 className="font-serif text-xl md:text-2xl font-bold text-burgundy mb-4 tracking-tight group-hover:gold-gradient-text transition-all duration-500">
                  {ev.type}
                </h3>

                {/* Details List - Compact Standard Layout */}
                <div className="flex flex-col gap-4 mb-6 w-full relative z-10">
                  
                  {/* Temporal Block */}
                  <div className="flex flex-col items-center">
                    <p className="font-serif text-dark-mid font-bold text-base md:text-lg leading-tight uppercase tracking-widest">
                      {ev.date}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                       <span className="font-pinyon text-gold-muted text-base opacity-70 italic">at</span>
                       <span className="font-serif text-dark-mid font-semibold text-sm md:text-base opacity-90">{ev.time}</span>
                    </div>
                  </div>

                  {/* Ornate Divider */}
                  <div className="flex items-center justify-center gap-3 py-1 opacity-50">
                     <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/30" />
                     <div className="text-gold text-xs">❦</div>
                     <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/40" />
                  </div>

                  {/* Spatial Block */}
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-0.5 mb-1.5">
                       <span className="font-pinyon text-gold-muted text-base opacity-70 italic">held at</span>
                       <p className="font-serif text-dark-mid font-bold text-base md:text-lg leading-tight uppercase tracking-tight">
                         {ev.venue}
                       </p>
                    </div>
                    <p className="font-sans text-[9px] text-text-muted mt-1.5 tracking-[0.15em] leading-relaxed font-medium uppercase max-w-[200px] mx-auto opacity-70">
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

              {/* Float Ornament (SVG instead of emoji) */}
              <div className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center text-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-12 group-hover:scale-125 pointer-events-none">
                 <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M12,18C10.89,18 10,18.89 10,20C10,21.11 10.89,22 12,22C13.11,22 14,21.11 14,20C14,18.89 13.11,18 12,18M20,10C18.89,10 18,10.89 18,12C18,13.11 18.89,14 20,14C21.11,14 22,13.11 22,12C22,10.89 21.11,10 20,10M4,10C2.89,10 2,10.89 2,12C2,13.11 2.89,14 4,14C5.11,14 6,13.11 6,12C6,10.89 5.11,10 4,10Z" />
                 </svg>
              </div>
            </motion.div>
          ))}
        </div>


      </div>

      {/* Background Side Elements */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent" />
    </section>
  );
}
