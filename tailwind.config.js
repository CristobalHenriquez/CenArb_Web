/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./Formkit.config.js"
  ],
  theme: {
    extend: {
      screens: {
        'xl-custom': '1920px',
      },
      boxShadow: {
        'inner-top': 'inset 0 5px 5px rgba(0, 0, 0, 0.2)',
        'bottom': '0 3px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

