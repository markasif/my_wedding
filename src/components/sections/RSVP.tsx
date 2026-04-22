"use client";

import { motion, useInView } from "framer-motion";
import { useState, FormEvent, useRef, useEffect } from "react";
import { SectionHeader } from "../shared/SectionHeader";
import { supabase } from "@/lib/supabase";
import { AttendanceCounter } from "../shared/AttendanceCounter";

const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD = "#d4af37";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attending, setAttending] = useState("yes");
  const [guestCount, setGuestCount] = useState(1);
  const maxGuests = 15;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // On mount, check if user has already RSVP'd on this device
  useEffect(() => {
    const saved = localStorage.getItem("rsvp_submitted");
    if (saved === "true") {
      setSubmitted(true);
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    let phone = (formData.get("phone") as string).trim();

    // ── Validation: Exactly 10 Digits ──
    // Strip everything except numbers
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }
    
    // Use the cleaned version (10 digits) for DB entry
    phone = cleanPhone;
    
    let guests_count = 0;
    if (attending === "yes") {
      guests_count = guestCount;
    }
    try {
      // 1. Check if they already submitted on this device (to show "Update" message)
      const wasAlreadySubmitted = localStorage.getItem("rsvp_submitted") === "true";

      // 2. Perform Upsert (Insert or Update if phone exists)
      const { error: submitError } = await supabase
        .from('rsvps')
        .upsert(
          { 
            name, 
            phone, 
            guests_count, 
            attending: attending === "yes" 
          },
          { onConflict: 'phone' }
        );

      if (submitError) throw submitError;
      
      localStorage.setItem("rsvp_submitted", "true");
      setIsUpdate(wasAlreadySubmitted);
      setSubmitted(true);
    } catch (err: any) {
      // Detailed logging for debugging
      console.error("Submission error:", err?.message || err);
      if (err?.details) console.error("Error details:", err.details);
      if (err?.hint) console.error("Error hint:", err.hint);
      
      setError("Failed to send response. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="rsvp"
      ref={ref}
      className="relative bg-[#fdfaf4] overflow-hidden pb-6 md:pb-8 lg:pb-10 xl:pb-12"
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

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-10 xl:px-12">

        <SectionHeader
          arabicTitle="تأكيد الحضور"
          englishTitle="Kindly Respond"
          mainTitle="Confirm Your Attendance"
          inView={inView}
        />

        {/* Real-time Attendance Badge */}
        <div className="flex justify-center mb-4 md:mb-6">
          <AttendanceCounter />
        </div>

        {/* ── Card ── */}
        <motion.div
          className="relative bg-white/40 border border-gold/20 overflow-hidden paper-texture rounded-sm mx-auto max-w-2xl royal-glass gold-rim-glow shadow-xl"
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
                  {isUpdate ? "Response Updated!" : "Blessings Received"}
                </h3>
                <p className="font-serif italic text-base text-text-muted leading-relaxed max-w-md mx-auto opacity-80">
                  {isUpdate 
                    ? "We've updated your attendance details. Thank you for keeping us informed!"
                    : "We have received your response and look forward to your presence."}
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-serif text-[10px] md:text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-gold/30 pb-1 hover:text-burgundy hover:border-burgundy transition-all duration-300"
                  >
                    Edit your response
                  </button>
                </div>
                <div className="mt-6 w-16 h-px bg-gold/30 mx-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-8">
                
                {/* ── Grid Layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                  
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
                      name="name"
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
                      name="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter exactly 10 digits"
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
                          className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80"
                        >
                          Guests Attending
                        </label>
                        <div className="flex items-center gap-4 bg-cream/10 border border-gold/15 rounded-sm p-1.5 w-full justify-between shadow-sm">
                          <button
                            type="button"
                            onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                            disabled={guestCount <= 1}
                            className="w-10 h-10 flex items-center justify-center rounded-sm border border-gold/10 text-burgundy hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Decrease guest count"
                          >
                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                              <path d="M1 1h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>
                          
                          <div className="flex flex-col items-center flex-1">
                            <span className="font-serif text-xl font-bold text-burgundy">
                              {guestCount}
                            </span>
                            <span className="font-sans text-[8px] uppercase tracking-tighter text-gold font-bold">
                              {guestCount === 1 ? 'Guest' : 'Guests'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setGuestCount(prev => Math.min(maxGuests, prev + 1))}
                            disabled={guestCount >= maxGuests}
                            className="w-10 h-10 flex items-center justify-center rounded-sm border border-gold/10 text-burgundy hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Increase guest count"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                        {guestCount === maxGuests && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-[9px] text-gold/80 italic text-center mt-1"
                          >
                            For larger groups, please contact the host directly.
                          </motion.p>
                        )}
                      </motion.div>
                    ) : (
                      <div className="hidden md:block h-full border-l border-gold/5 ml-6" />
                    )}
                  </div>

                  {/* Attendance Choice - Full Width */}
                  <div className="flex flex-col gap-1.5 md:gap-2.5 md:col-span-2">
                    <span className="font-serif text-[11px] md:text-xs font-bold text-burgundy tracking-widest uppercase opacity-80 mb-0.5">
                       Will you be joining us?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { val: "yes", label: "Accept", sub: "With Honor" },
                        { val: "no",  label: "Decline", sub: "With Apologies" },
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

                  <div className="flex flex-col items-center gap-4 mt-2 md:mt-4">
                    {error && (
                      <p className="text-red-500 font-serif text-sm italic">{error}</p>
                    )}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`group relative inline-flex items-center gap-4 px-8 py-3 overflow-hidden rounded-sm bg-burgundy shadow-lg shimmer-gold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      whileHover={loading ? {} : { y: -2 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                    >
                      <div className="absolute inset-0 gold-gradient-bg translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      <span className="relative z-10 text-gold group-hover:text-black font-sans text-[9px] tracking-[0.3em] uppercase transition-colors duration-700 font-bold">
                        {loading ? 'Sending...' : 'Confirm Attendance'}
                      </span>
                      {!loading && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-gold group-hover:text-black transition-all duration-700 group-hover:translate-x-1">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.button>
                  </div>


              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
