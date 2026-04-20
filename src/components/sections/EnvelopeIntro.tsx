"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

/*
  ANIMATION TIMELINE:
  - Idle: Envelope floats.
  - Click: Flap rotates up. As it passes 90 degrees (pointing straight up),
           a realistic beam of volumetric light spills out, widening as the flap folds back.
  - Flap fully back: The light expands to cover the screen.
*/

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const didClick = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  const handleClick = useCallback(() => {
    if (didClick.current) return;
    didClick.current = true;
    
    setIsOpen(true);
    
    // Total animation takes roughly 1.8s. Then we clear it.
    setTimeout(() => {
      onComplete();
    }, 1200); // Trigger hero reveal
  }, [onComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") handleClick();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClick]);

  if (!mounted) return null;

  return (
    <motion.div
      role="button"
      aria-label="Open wedding invitation"
      tabIndex={0}
      onClick={handleClick}
      initial={{ opacity: 1 }}
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeIn" }} // Fade entire scene out at end
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080604", // Very dark warm room
        cursor: isOpen ? "default" : "pointer",
        pointerEvents: isOpen ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)",
      }} />

      {/* ══════════════════════════════════════
          THE REALISTIC LIGHT BEAM
          ══════════════════════════════════════ */}
      {/* Light Container positioned at the envelope opening */}
      <div style={{
        position: "absolute",
        top: "46%", 
        left: "50%",
        width: 0, height: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}>
        
        {/* The intense glowing slit inside the envelope */}
        <motion.div
          initial={{ width: "0px", height: "0px", opacity: 0 }}
          animate={isOpen ? { 
            width: ["0px", "150px", "280px"], 
            height: ["0px", "20px", "60px"],
            opacity: [0, 1, 0.8] 
          } : {}}
          transition={{ duration: 0.6, delay: 0.1, times: [0, 0.4, 1], ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0, left: "50%", x: "-50%", y: "-50%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,235,160,0.9) 20%, rgba(212,175,55,0.5) 60%, transparent 100%)",
            filter: "blur(6px)",
            mixBlendMode: "screen",
          }}
        />

        {/* The actual volumetric beam spilling upward.
            It starts narrow (blocked by flap), then widens dramatically as flap folds back. */}
        <motion.div
          initial={{ scaleY: 0, scaleX: 0.1, opacity: 0 }}
          animate={isOpen ? { 
            scaleY: [0, 0.4, 1],       // Shoots up fast
            scaleX: [0.1, 0.5, 2],     // Widens as flap gets out of the way
            opacity: [0, 0.8, 0],    // Spikes bright, then fades out as it consumes the screen
          } : {}}
          transition={{ duration: 1.2, delay: 0.15, times: [0, 0.3, 1], ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: "absolute",
            top: "-10vh", // Shift up slightly to overlap hinge
            left: "-50vw", // Center a 100vw block
            width: "100vw",
            height: "80vh",
            transformOrigin: "50% 10vh", // Hinge point
            background: "linear-gradient(to top, transparent 0%, rgba(212,175,55,0.1) 10%, rgba(255,235,140,0.6) 50%, rgba(255,255,255,0.9) 100%)",
            clipPath: "polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)", // Wedge shape
            filter: "blur(20px)",
            mixBlendMode: "screen",
          }}
        />
        
        {/* Core hot beam (the densest part of the light) */}
        <motion.div
          initial={{ scaleY: 0, scaleX: 0.05, opacity: 0 }}
          animate={isOpen ? { 
            scaleY: [0, 0.6, 1],
            scaleX: [0.05, 0.2, 1], 
            opacity: [0, 1, 0] 
          } : {}}
          transition={{ duration: 1.0, delay: 0.2, times: [0, 0.4, 1], ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "-5vh",
            left: "-50vw",
            width: "100vw",
            height: "60vh",
            transformOrigin: "50% 5vh",
            background: "linear-gradient(to top, transparent 0%, rgba(255,245,200,0.4) 40%, rgba(255,255,255,1) 100%)",
            clipPath: "polygon(49.5% 0%, 50.5% 0%, 60% 100%, 40% 100%)", // Very sharp wedge
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* ══════════════════════════════════════
          ENVELOPE
          ══════════════════════════════════════ */}
      <motion.div
        animate={isOpen ? { y: 20, scale: 0.96 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "clamp(260px, 75vw, 360px)",
          // CSS animation for idle float, overridden when open
          animation: !isOpen ? "envFloat 3s ease-in-out infinite" : "none",
          zIndex: 30,
        }}
      >
        {/* ── ENVELOPE BODY ── */}
        <motion.div
          animate={isOpen ? { 
            boxShadow: "0 10px 40px rgba(212,175,55,0.2), 0 30px 60px rgba(0,0,0,0.8)" 
          } : { 
            boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.4)" 
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative", width: "100%", paddingBottom: "60%",
            borderRadius: "3px", background: "#f2ece0", overflow: "hidden",
          }}
        >
          {/* Inner envelope backlight - shows light bleeding inside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(255,235,150,0.9) 0%, rgba(212,175,55,0.3) 50%, transparent 100%)",
              zIndex: 5, mixBlendMode: "screen"
            }}
          />

          <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "52%", background: "#e8e0d0", clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#ebe4d4", clipPath: "polygon(0% 0%, 0% 100%, 50% 55%)", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#e5ddc8", clipPath: "polygon(100% 0%, 100% 100%, 50% 55%)", zIndex: 2 }} />

          {/* ── Wax seal (fades out as flap opens) ── */}
          <motion.div
            animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", bottom: "33%", left: "50%", x: "-50%",
              width: 54, height: 54, borderRadius: "50%",
              background: "linear-gradient(145deg, #d4af37 0%, #f7e69f 40%, #b8860b 100%)",
              boxShadow: "0 6px 20px rgba(184,134,11,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 20, border: "0.5px solid rgba(255,255,255,0.3)",
              cursor: "pointer"
            }}
          >
            <span className="font-script text-burgundy text-xl font-bold">A&H</span>
          </motion.div>
        </motion.div>

        {/* ── TOP FLAP ── */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: -175 } : { rotateX: 0 }}
          // Very realistic mechanical ease: starts slow, accelerates, then bounces slightly
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} 
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", paddingBottom: "50%",
            transformOrigin: "top center", transformStyle: "preserve-3d",
            zIndex: 35, background: "#f2ece0",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 80%)",
            boxShadow: isOpen ? "none" : "0 2px 8px rgba(0,0,0,0.14)",
          }}
        >
          {/* Flap Inside Face */}
          <motion.div 
            animate={isOpen ? { backgroundColor: "#a69e8f" } : { backgroundColor: "#e8e0ce" }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute", inset: 0, clipPath: "polygon(0% 0%, 100% 0%, 50% 80%)", backfaceVisibility: "hidden" 
            }} 
          />
          <div style={{
            position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif", fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            color: "#b8860b", opacity: 0.72, whiteSpace: "nowrap", direction: "rtl",
          }}>بِسْمِ ٱللَّهِ</div>
        </motion.div>
      </motion.div>

      {/* ── Idle hint ── */}
      {!isOpen && (
        <div style={{
          position: "absolute", bottom: "clamp(20px,5vh,40px)", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none",
        }}>
          <div style={{ animation: "hintPulse 2s ease-in-out infinite" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.65}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <p className="font-script text-xl tracking-[0.1em] text-gold-muted opacity-80 margin-0">Tap to open</p>
        </div>
      )}

      <style>{`
        @keyframes envFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes hintPulse {
          0%, 100% { transform: translateY(0); opacity: 0.65; }
          50%       { transform: translateY(4px); opacity: 0.3; }
        }
      `}</style>
    </motion.div>
  );
}
