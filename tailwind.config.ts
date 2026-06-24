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
        gold: "#B08D57",
        "gold-hover": "#C9A96E",
        forest: "#1B4332",
        "forest-light": "#2D6A4F",
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
        manrope: ['"Manrope"', "sans-serif"],
        "source-sans": ['"Source Sans 3"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
