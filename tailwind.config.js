/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundImage': "url('./img/background.jpg')"
      },
      fontFamily:{
        'headerFont':['Bitter'],
        'navFont':['Bitter', 'serif']
      }
    },
  },
  plugins: [],
}

