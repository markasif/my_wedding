import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Asif & Hiba | Wedding Invitation · May 2026",
  description:
    "Join us in celebrating the wedding of Mohammed Asif & Hiba — May 16 & 17, 2026 · Zubaida Park Auditorium, Pathumoochi, Vengara, Kerala.",
  openGraph: {
    title: "Mohammed Asif & Hiba | Wedding Invitation",
    description: "The wedding of Mohammed Asif & Hiba — May 16 & 17, 2026 · Zubaida Park Auditorium, Vengara.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      style={
        {
          "--font-playfair-display": playfair.style.fontFamily,
          "--font-montserrat": montserrat.style.fontFamily,
          "--font-pinyon": pinyonScript.style.fontFamily,
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <LoadingScreen />
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
