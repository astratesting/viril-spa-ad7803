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
        gold: "#C9A96E",
        "muted-text": "#A3A3A3",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
