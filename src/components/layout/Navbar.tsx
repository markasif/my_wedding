"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home",           href: "#home"    },
  { name: "Event Details",   href: "#details" },
  { name: "Kindly Respond", href: "#rsvp"    },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link href="#home" className="navbar-logo">A &amp; H</Link>

        {/* Desktop */}
        <nav>
          <ul className="navbar-links">
            {navLinks.map((l) => (
              <li key={l.name}>
                <Link href={l.href}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect y="0"  width="22" height="2" rx="1" fill="currentColor" />
            <rect y="7"  width="16" height="2" rx="1" fill="currentColor" />
            <rect y="14" width="22" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`mobile-nav-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Drawer */}
      <nav className={`mobile-nav-drawer${open ? " open" : ""}`}>
        <button
          className="mobile-nav-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul className="mobile-nav-items">
          {navLinks.map((l) => (
            <li key={l.name}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-footer">
          <p>Asif &amp; Hiba</p>
          <span>16.05.2026</span>
        </div>
      </nav>
    </>
  );
}
