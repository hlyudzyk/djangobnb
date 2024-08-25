import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'lightbase': '#AACEF7',
        'lightbase-hover': '#89BEF4',
        'footer':'#F7F7F7',
      }
    },
  },
  plugins: [],
};
export default config;
