/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      },
      colors: {
        primary: "#00040f",
        primaryHalf: "#34b3e0",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        lightBlue: "#4287EE",
        lightlightBlue: "#00aaff",
        boxColor: "rgb(255, 255, 255)",
        hoverBox:"#DDDDDD",
        blue:"#0066ff",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        yellow : "#E4D00A",
        green : "#50C878",
        gray : "#818589",
        red : "#D22B2B",
        test: "#96A3AC",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      ms: "1000px",
      md: "1350px",
      lg: "1500px",
      xl: "1700px",
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};