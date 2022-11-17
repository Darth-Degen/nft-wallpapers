/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // colors: {
      //   dark: "#121212",
      //   gray: "#DDDDDD",
      //   silver: "#f1f1f1",
      //   purps: "#3730a3"
      //   light-purps: "#818cf8"
      // },
    },
  },
  plugins: [],
};
