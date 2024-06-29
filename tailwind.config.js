/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxSizing: ['border-box'],
      margin: {'0' : '0'},
      padding: {'0' : '0'},

      backgroundImage : {
        'custom-gradient' : 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'
      }
    },
  },
  plugins: [],
}

