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
        grayFade:
          'linear-gradient(to bottom, white, white 20%, black 20%, black 80%, white 80%, white)',
        status: {
          success: '#28a745',
          info: '#007bff',
          warning: '#fd7e14',
          error: '#dc3545',
        },
      },
    },
  },
  plugins: [],
};
export default config;
