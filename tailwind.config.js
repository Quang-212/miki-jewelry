/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#251C17',
        secondary: '',
      },
      fontFamily: {
        primary: ['Montserrat'],
        secondary: ['Playfair Display'],
      },
      maxWidth: {
        '1440-px': '1440px',
      },
      borderRadius: {
        '8-px': '8x',
        secondary: '16x',
      },
      spacing: {
        '13-px': '13px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
