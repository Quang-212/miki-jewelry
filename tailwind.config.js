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
      },
      maxWidth: {
        '1440-px': '1440px',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.5rem',
        lg: '1rem',
      },
      spacing: {
        '120-px': '120px',
        '146-px': '146px',
        '342-px': '342px',
      },
      padding: {
        '8-px': '8px',
        '12-px': '12px',
        '24-px': '24px',
        '32-px': '32px',
        '46-px': '46px',
        '152-px': '152px',
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
