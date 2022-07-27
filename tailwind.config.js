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
        '40-px': '40px',
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
        '254-px': '254px',
        '351-px': '351px',
        '352-px': '352px',
        '412-px': '412px',
        '450-px': '450px',
        '483.5-px': '483.5px',
        '497-px': '497px',
        '548-px': '548px',
        '629-px': '629px',
        '640.5-px': '640.5px',
        '732-px': '732px',
        '824-px': '824px',
        '4238-px': '4238px',
      },
      lineHeight: {
        '20-px': '20px',
        '48-px': '48px',
        '58-px': '58px',
        '64-px': '64px',
        '106-px': '106px',
      },
      backgroundImage: {
        'hero-image': "url('/static/images/home-hero.jpg')",
        'hero-image-rgba': 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',

        'latest-collection': "url('/static/images/home-latest-collection.jpg')",
        'latest-collection-framer': "url('/static/images/home-latest-collection-framer.svg')",
        'latest-collection-line': "url('/static/images/home-latest-collection-framer-2.svg')",

        'product-category-ring': "url('/static/images/home-category-ring.png')",
        'product-category-ring-rgba':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 28.54%)',

        'product-category-watch': "url('/static/images/home-category-watch.png')",
        'product-category-watch-rgba':
          'linear-gradient(360deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 28.15%)',

        'product-category-earring': "url('/static/images/home-category-earring.png')",
        'product-category-earring-rgba':
          'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 20.44%)',

        'product-category-bracelet': "url('/static/images/home-category-bracelet.png')",
        'product-category-bracelet-rgba':
          'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 28.74%)',

        'product-category-necklace': "url('/static/images/home-category-necklace.jpg')",
        'product-category-necklace-rgba':
          'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 28.54%)',
      },
      dropShadow: {
        about: '0px 4px 162px rgba(0, 0, 0, 0.2)',
        'product-category': '0px 4px 52px rgba(15, 15, 15, 0.25)',
      },
      backgroundPosition: {
        'center-22%': 'center 22%',
      },
      objectPosition: {
        '90%': '90%',
      },
      scale: {
        1.68: '1.68',
        1.75: '1.75',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
