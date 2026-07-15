/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056D2',
        secondary: '#FFC107',
        success: '#28A745',
        danger: '#DC3545',
        background: '#F8FAFC',
        cards: '#FFFFFF',
        textMain: '#1F2937',
      }
    },
  },
  plugins: [],
}
