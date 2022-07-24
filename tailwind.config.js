/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat'],
        secondary: ['Playfair Display'],
      },
      fontSize: {
        '32-px': '32px',
      },
      colors: {
        primary: '#251C17',
        secondary: '#6E5544',
        'primary-1': '#6E5544',
        'neutral-1': '#272727',
        'caption-1': '#D2311B',
      },
      maxWidth: {
        '412-px': '412px',
        '1440-px': '1440px',
      },
      borderRadius: {
        primary: '8px',
        secondary: '16px',
      },
      spacing: {
        //* padding, margin, width, height, maxHeight, gap, space, translate
        '8-px': '8px',
        '12-px': '12px',
        '22-px': '22px',
        '24-px': '24px',
        '32-px': '32px',
        '46-px': '46px',
        '152-px': '152px',
        '120-px': '120px',
        '146-px': '146px',
        '351-px': '351px',
        '412-px': '412px',
        '4238-px': '4238px',
      },
      lineHeight: {
        '48-px': '48px',
        '58-px': '56px',
        '106-px': '106px',
        '128-px': '128px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
