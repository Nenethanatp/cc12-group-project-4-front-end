/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      mobile: '350px',
      tablet: '640px',
      desktop: '1280px'
    }
  },
  plugins: []
};
