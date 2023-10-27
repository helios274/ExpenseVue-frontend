/** @type {import('tailwindcss').Config} */
// import {} from "./src/assets/images/home.jpeg"
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      red: colors.red,
      gray: colors.gray,
      primary: "#FDF0F0",
      secondary: "#F1B4BB",
      tertiary: "#1F4172",
      quaternary: "#132043",
    },
    extend: {
      fontFamily: {
        playpen: ["Playpen Sans", "cursive"],
      },
      backgroundImage: {
        home: "url('./src/assets/images/home1.jpeg')",
      },
    },
  },
  plugins: [],
};
