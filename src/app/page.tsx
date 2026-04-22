"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { InvitationText } from "@/components/sections/InvitationText";
import { EventDetails } from "@/components/sections/EventDetails";
import { RSVP } from "@/components/sections/RSVP";
import { Footer } from "@/components/sections/Footer";
import { FloatingRSVP } from "@/components/shared/FloatingRSVP";

const EnvelopeIntro = dynamic(
  () => import("@/components/sections/EnvelopeIntro").then((m) => ({ default: m.EnvelopeIntro })),
  { ssr: false }
);

export default function Home() {
  const [siteRevealed, setSiteRevealed] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const handleEnvelopeComplete = useCallback(() => {
    setSiteRevealed(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    // Hero fades in 300ms after onComplete fires — overlaps with the 0.4s envelope fade-out
    setTimeout(() => setHeroVisible(true), 300);
  }, []);

  return (
    <>
      {!siteRevealed && (
        <EnvelopeIntro onComplete={handleEnvelopeComplete} />
      )}

      {/*
        Site content: hidden (off-screen / invisible) until the envelope calls onComplete.
        Then it slides up from 30px and fades in over 0.7s.
      */}
      <div
        style={{
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          opacity: heroVisible ? 1 : 0,
          transition: heroVisible
            ? "transform 0.7s ease-out, opacity 0.7s ease-out"
            : "none",
          /* While the envelope is active, keep the page content painted but hidden
             so the browser pre-renders the Hero — avoids flash of white on reveal. */
          visibility: siteRevealed ? "visible" : "hidden",
          position: siteRevealed ? "static" : "fixed",
          top: siteRevealed ? undefined : 0,
          left: siteRevealed ? undefined : 0,
          width: siteRevealed ? undefined : "100%",
          pointerEvents: siteRevealed ? "auto" : "none",
          zIndex: siteRevealed ? undefined : -1,
        }}
      >
        <Hero />
        <InvitationText />
        <EventDetails />
        <RSVP />
        <Footer />
      </div>

      {siteRevealed && <FloatingRSVP />}
    </>
  );
}
