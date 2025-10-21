import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Route colors
        'route-e': '#0EA5E9',
        'route-w': '#10B981', 
        'route-service': '#F59E0B',
        'route-office': '#8B5CF6',
      },
      screens: {
        'print': { 'raw': 'print' },
      },
    },
  },
  plugins: [],
};

export default config;
