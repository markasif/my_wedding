"use client";

import { motion, useInView } from "framer-motion";
import { useState, FormEvent, useRef } from "react";
import { SectionHeader } from "../shared/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#d4af37";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState("yes");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="rsvp"
      ref={ref}
      className="relative bg-[#fdfaf4] overflow-hidden py-6 md:py-8 lg:py-10 xl:py-12"
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        <SectionHeader
          arabicTitle="تأكيد الحضور"
          englishTitle="Kindly Respond"
          mainTitle="Confirm Your Attendance"
          inView={inView}
        />

        {/* ── Card ── */}
        <motion.div
          className="relative bg-white border border-gold/20 overflow-hidden paper-texture rounded-sm mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Paper texture for card */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          
          {/* Gold accent line at top */}
          <div className="relative h-[3px] gold-gradient-bg" />

          <div className="p-5 md:p-6 lg:p-8 relative z-10">
            {submitted ? (
              <div className="text-center py-10 md:py-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-5xl md:text-7xl mb-6"
                >
                  <span className="gold-gradient-text">🕊️</span>
                </motion.div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4 tracking-tight">
                  Blessings Received
                </h3>
                <p className="font-serif italic text-base text-text-muted leading-relaxed max-w-md mx-auto opacity-80">
                  We have received your response and look forward to your presence.
                </p>
                <div className="mt-6 w-16 h-px bg-gold/30 mx-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                
                {/* ── Grid Layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  
                  {/* Name Input - Full Width */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label
                      htmlFor="rsvp-name"
                      className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80"
                    >
                      Full Name
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      placeholder="Invitee Full Name"
                      required
                      className="bg-cream/15 border border-gold/15 rounded-sm px-4 py-2.5 font-serif text-base text-dark-mid placeholder:text-text-muted/30 outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all duration-500 shadow-sm"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="rsvp-phone"
                      className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80"
                    >
                      Phone Number
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      placeholder="Mobile No."
                      className="bg-cream/15 border border-gold/15 rounded-sm px-4 py-2.5 font-serif text-base text-dark-mid placeholder:text-text-muted/30 outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all duration-500 shadow-sm"
                    />
                  </div>

                  {/* Guest Count (Shared row with Phone) */}
                  <div className="flex flex-col gap-2">
                    {attending === "yes" ? (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <label
                          htmlFor="rsvp-guests"
                          className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80"
                        >
                          Guests Attending
                        </label>
                        <div className="relative">
                          <select
                            id="rsvp-guests"
                            className="w-full bg-cream/15 border border-gold/15 rounded-sm px-4 py-2.5 font-serif text-base text-dark-mid outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all duration-500 cursor-pointer appearance-none shadow-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n} {n > 1 ? "Guests" : "Guest"}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                            <svg width="8" height="5" viewBox="0 0 12 8" fill="none">
                              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="hidden md:block h-full border-l border-gold/5 ml-6" />
                    )}
                  </div>

                  {/* Attendance Choice - Full Width */}
                  <div className="flex flex-col gap-2.5 md:col-span-2">
                    <span className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80 mb-0.5">
                       Will you be joining us?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { val: "yes", label: "Joyfully Accept", sub: "With Honor" },
                        { val: "no",  label: "Regretfully Decline", sub: "With Apologies" },
                      ].map(({ val, label, sub }) => (
                        <label
                          key={val}
                          className={`relative flex items-center gap-3 py-3 px-4 rounded-sm border cursor-pointer transition-all duration-700 ${
                            attending === val
                              ? "border-gold bg-cream/30 shadow-md shadow-gold/5"
                              : "border-gold/10 bg-white/30 text-text-muted hover:border-gold/20 hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="attending"
                            value={val}
                            checked={attending === val}
                            onChange={() => setAttending(val)}
                            className="sr-only"
                          />
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${attending === val ? 'border-gold' : 'border-gold/20'}`}>
                             <div className={`w-1.5 h-1.5 rounded-full transition-transform ${attending === val ? 'bg-gold scale-100' : 'bg-transparent scale-0'}`} />
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-serif text-xs md:text-sm font-bold uppercase tracking-wider ${attending === val ? 'text-burgundy' : 'text-text-muted'}`}>
                              {label}
                            </span>
                            <span className="font-script text-gold/70 text-base leading-none">
                               {sub}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Message Area ── */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="rsvp-message"
                      className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80"
                    >
                       Message for the Couple
                    </label>
                    <textarea
                      id="rsvp-message"
                      placeholder="Share your prayers & warm wishes..."
                      rows={2}
                      className="bg-cream/15 border border-gold/15 rounded-sm px-4 py-3 font-serif text-base text-dark-mid placeholder:text-text-muted/30 outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 focus:bg-white transition-all duration-500 resize-none w-full shadow-sm"
                    />
                  </div>

                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      className="group relative inline-flex items-center gap-4 px-8 py-3 overflow-hidden rounded-sm bg-burgundy shadow-lg"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 gold-gradient-bg translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      <span className="relative z-10 text-gold group-hover:text-black font-sans text-[9px] tracking-[0.3em] uppercase transition-colors duration-700 font-bold">
                        Confirm Attendance
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-gold group-hover:text-black transition-all duration-700 group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
