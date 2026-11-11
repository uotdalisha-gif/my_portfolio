/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./eka_wahyu_portfolio.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Satoshi"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Clash Grotesk"', '"Satoshi"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        accent: {
          light: '#93c5fd',
          DEFAULT: '#60a5fa', // soft blue accent
          dark: '#3b82f6',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#3b66f5',
          600: '#2e55dc',
          700: '#1d3fb8',
        }
      }
    },
  },
  plugins: [],
}

