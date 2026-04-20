"use client";

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-05-17T11:30:00").getTime();

function useCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function calc() {
      const diff = WEDDING_DATE - Date.now();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Footer() {
  const { d, h, m, s } = useCountdown();

  return (
    <footer className="relative bg-[#fdfaf4] overflow-hidden pt-3 md:pt-4 lg:pt-6 pb-2">

      {/* Faint watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] font-bold text-burgundy leading-none">
          ∞
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
        {/* Countdown Header */}
        <p className="font-script text-3xl text-gold-muted mb-2 md:mb-4 lg:mb-6 italic leading-none">The Celebration Begins In</p>

        <div className="flex justify-center items-center gap-2 md:gap-4 mb-2 md:mb-4 lg:mb-6 flex-wrap">
          {[
            { n: d, label: "Days" },
            { n: h, label: "Hours" },
            { n: m, label: "Minutes" },
            { n: s, label: "Seconds" },
          ].map(({ n, label }, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center px-4 md:px-8">
                <span className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold gold-gradient-text tabular-nums leading-none">
                  {String(n).padStart(2, "0")}
                </span>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mt-4 font-bold">
                  {label}
                </span>
              </div>
              {i < 3 && (
                <span className="font-serif text-3xl md:text-5xl text-gold/20 pb-8 select-none">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <span className="font-sans text-[10px] tracking-[0.2em] text-text-muted/40 uppercase font-medium">
            © 2026 Mohammed Asif &amp; Hiba
          </span>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gold/30" />
          <span className="font-script text-2xl text-gold-muted opacity-80">
            #AsifAndHibaWedding2026
          </span>
        </div>
      </div>
    </footer>
  );
}
