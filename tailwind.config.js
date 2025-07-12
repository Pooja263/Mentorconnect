/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': [
          '"Times New Roman"',
          'Times',
          'serif'
        ],
        'serif': [
          '"Times New Roman"',
          'Times',
          'serif'
        ],
      },
    },
  },
  plugins: [],
}

