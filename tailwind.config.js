/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
     extend: {
    transitionTimingFunction: {
      soft: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
  },
  plugins: [],
}
