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
        aminah: {
          green: "#183D32",   // Deep forest green
          gold: "#C5A46D",    // Antique gold
          ivory: "#F4F0E6",   // Warm ivory
          charcoal: "#292D2A", // Charcoal
        }
      },
    },
  },
  plugins: [],
};