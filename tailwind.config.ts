import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#121212",
        "rich-black": "#0A0A0A",
        gold: "#D4AF37",
        "gold-hover": "#E2C04D",
        flame: "#FF4500",
        magenta: "#FF00FF",
        "acid-green": "#00FF00",
        "muted-text": "#A3A3A3",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        satoshi: ['"Satoshi"', "sans-serif"],
        archivo: ['"Archivo Black"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
