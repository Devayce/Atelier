/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#fde1ee',
        'brand-wine': '#6b1226',
      }
    },
  },
  plugins: [],
}
