/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#f0d060",
          DEFAULT: "#d4af37",
          dark: "#a8892a",
          muted: "#b8962e",
        },
        burgundy: {
          light: "#b06a7a",
          mid: "#8b3a4e",
          DEFAULT: "#6b2737",
          dark: "#3a1111",
        },
        cream: {
          light: "#fffff0",
          DEFAULT: "#fdfaf4",
          dark: "#f2ece0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair-display)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
