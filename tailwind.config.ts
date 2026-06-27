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
        ink: "#0A0A0B",
        "ink-soft": "#111113",
        "ink-line": "#1C1C20",
        flame: "#E8592B",
        magenta: "#D42A6E",
        acid: "#7DDA5A",
        bone: "#F4F1EC",
        ash: "#A3A3A3",
      },
      fontFamily: {
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
        archivo: ['"Archivo Black"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        salon: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
