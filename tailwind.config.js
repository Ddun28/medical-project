/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn",
        fadeOut: "fadeOut",
        scaleIn: "scaleIn",
        scaleOut: "scaleOut",
      },
      
      keyframes: {
        fadeIn: {
          "0%": {opacity: 0},
          "100%":{opacity: 1},
        },
        fadeOut: {
          "0%": {opacity: 1},
          "100%":{opacity:0},
        },

        scaleIn:{
          "0%": {transform: "scale(0)"},
          "100%": {transform: "scale(1)"},
        },
        scaleOut:{
          "0%": {transform: "scale(1)"},
        "100%": {transform: "scale(0)"},},
      },

      fontFamily: {
        "principal": ['"Be Vietnam Pro"', 'sans-serif']
      },

      colors: {
        "bright-red": "hsl(12, 88%, 59%)",
        "dark-blue": "hsl(228, 39%, 23%)",
        "dark-grayish-blue": "hsl(227, 12%, 61%)",
        "very-dark-blue": "hsl(233, 12%, 13%)",
        "very-pale-red": "hsl(13, 100%, 96%)",
        "vary-light-gray": "hsl(0, 0%, 98%)",
      },

      backgroundImage: {
        "close-menu": "url('/img/icon-close.svg')",
        "open-menu": "url('/img/icon-hamburger.svg')"
      }

    },
  },
  plugins: [],
}