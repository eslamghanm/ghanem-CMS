/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
        },
        gold: '#f59e0b'
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}

