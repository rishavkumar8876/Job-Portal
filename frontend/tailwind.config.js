/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          foreground: '#FFFFFF',
          hover: '#4338CA',
        },
        secondary: {
          DEFAULT: '#0F172A',
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
        },
        accent: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        border: '#E2E8F0',
        muted: {
          DEFAULT: '#94A3B8',
          foreground: '#64748B',
        },
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};