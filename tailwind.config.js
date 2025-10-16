const colors = require('tailwindcss/colors');
const { colours } = require("./src/utils/colours");

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
