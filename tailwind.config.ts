import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        GET: '#10B981',
        POST: '#3B82F6',
        PUT: '#F59E0B',
        DELETE: '#EF4444',
        primary: '#FF6B01',
        secondary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
};
export default config;
