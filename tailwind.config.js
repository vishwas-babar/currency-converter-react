/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customWhite: 'rgba(255, 239, 247, 0.5)'
      }
    },
  },
  plugins: [],
}

