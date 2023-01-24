/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      gridAutoColumns: {
        "2fr": "minmax(0, 2fr)",
      },
      colors: {
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        lightBlue: "#4287EE",
        blue: "#0066ff",
        yellow: "#E4D00A",
        green: "#50C878",
        gray: "#818589",
        red: "#D22B2B",
        persian_plum: "#70161E",
        polished_pine: "#529F95",
        camel: "#B49A67",
        dark_jungle_green: "#00120B",
        gainsboro: "#D9D9D9",
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
  plugins: [],
};
