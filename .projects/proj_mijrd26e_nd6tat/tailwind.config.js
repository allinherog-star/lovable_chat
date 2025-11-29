/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jd: {
          red: '#e1251b',
          dark: '#c81623',
          gray: '#f4f4f4',
        }
      }
    },
  },
  plugins: [],
}