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
        primary: '#251C17', //* text color + btn color
        wrapper: '#FFF9F6', //* background color
        'primary-1': '#6E5544',
        'primary-2': '#92715A',
        'primary-3': '#92715A',
        'primary-4': '#92715A',
        'primary-5': '#92715A',
        'neutral-1': '#272727',
        'neutral-2': '#626262',
        'neutral-3': '#A9A9A9',
        'neutral-4': '#E9E9E9',
        'neutral-5': '#FFFFFF',
        'caption-1': '#D2311B',
      },
      maxWidth: {
        '412-px': '412px',
        '544-px': '544px',
        '1440-px': '1440px',
      },
      borderRadius: {
        primary: '8px',
        secondary: '16px',
      },
      spacing: {
        //* inset, padding, margin, width, height, maxHeight, gap, space, translate
        '6-px': '6px',
        '8-px': '8px',
        '10-px': '10px',
        '12-px': '12px',
        '14-px': '14px',
        '18-px': '18px',
        '22-px': '22px',
        '24-px': '24px',
        '32-px': '32px',
        '37-px': '37px',
        '42-px': '42px',
        '46-px': '46px',
        '60-px': '60px',
        '66-px': '66px',
        '72-px': '72px',
        '152-px': '152px',
        '120-px': '120px',
        '146-px': '146px',
        '217-px': '217px',
        '351-px': '351px',
        '412-px': '412px',
        '629-px': '629px',
        '824-px': '824px',
        '4238-px': '4238px',
      },
      lineHeight: {
        '48-px': '48px',
        '58-px': '58px',
        '106-px': '106px',
      },
      backgroundImage: {
        'hero-image': "url('/static/images/home-hero.jpg')",
        'hero-rgba': 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
