/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tuji-gold': '#FFC107',
        'tuji-dark': '#1A1A1A',
        'tuji-accent': '#FFA500',
        'tuji-light': '#F5F5F5',
        'background': '#0A0A0A',
        'foreground': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
