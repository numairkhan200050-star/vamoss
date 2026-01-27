/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // High-end metallic gold
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4CF63',
          dark: '#9A7B1A',
        },
        // Deep onyx black for the background
        luxury: {
          black: '#050505',
          card: '#0A0A0A',
        }
      },
      fontFamily: {
        // Use a clean, bold font for the premium feel
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
