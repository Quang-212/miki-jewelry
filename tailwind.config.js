/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: { max: '376px' },
      },
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
        'primary-3': '#B78D71',
        'primary-4': '#D4BBAA',
        'primary-5': '#E2D1C6',
        'neutral-1': '#272727',
        'neutral-2': '#626262',
        'neutral-3': '#A9A9A9',
        'neutral-4': '#E9E9E9',
        'neutral-5': '#FFFFFF',
        'caption-1': '#D2311B',
        'caption-2': '#58C27D',
        discount: '#A18A68',
      },
      maxWidth: {
        '218-px': '218px',
        '254-px': '254px',
        '228-px': '228px',
        '412-px': '412px',
        '544-px': '544px',
        '1440-px': '1440px',
      },
      minWidth: {
        '343-px': '343px',
      },
      borderRadius: {
        tag: '4px',
        primary: '8px',
        secondary: '16px',
        tertiary: '12px',
      },
      borderWidth: {
        '1/2-px': '0.5px',
        '1.5-px': '1.5px',
      },
      divideWidth: {
        1: '1px',
      },
      spacing: {
        //* inset, padding, margin, width, height, maxHeight, gap, space, translate
        '6-px': '6px',
        '8-px': '8px',
        '10-px': '10px',
        '12-px': '12px',
        '14-px': '14px',
        '17-px': '17px',
        '18-px': '18px',
        '22-px': '22px',
        '24-px': '24px',
        '26-px': '26px',
        '32-px': '32px',
        '37-px': '37px',
        '42-px': '42px',
        '44-px': '44px',
        '46-px': '46px',
        '52-px': '52px',
        '60-px': '60px',
        '66-px': '66px',
        '72-px': '72px',
        '152-px': '152px',
        '120-px': '120px',
        '146-px': '146px',
        '180-px': '180px',
        '200-px': '200px',
        '228-px': '228px',
        '254-px': '254px',
        '312-px': '312px',
        '351-px': '351px',
        '352-px': '352px',
        '412-px': '412px',
        '450-px': '450px',
        '483.5-px': '483.5px',
        '490-px': '490px',
        '497-px': '497px',
        '548-px': '548px',
        '629-px': '629px',
        '640.5-px': '640.5px',
        '732-px': '732px',
        '824-px': '824px',
        '852-px': '852px',
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
        'btn-primary': 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',

        //* Home Page
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

        //* Register Form
        'register-form-rgba': 'rgba(255, 249, 246, 0.8)',
      },
      boxShadow: {
        'register-form': '0px 0px 86px rgba(0, 0, 0, 0.15)',
        'btn-normal': 'inset 0px 0px 8px rgba(0, 0, 0, 0.6)',
        'popper-search': 'rgb(0 0 0 / 12%) 0px 2px 12px',
      },
      dropShadow: {
        about: '0px 4px 162px rgba(0, 0, 0, 0.2)',
        'product-category': '0px 4px 52px rgba(15, 15, 15, 0.25)',
        'product-card': '0px 4px 58px rgba(15, 15, 15, 0.1)',
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
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      checkBox: {
        icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.3333 6.66667V25.3333H6.66667V6.66667H25.3333ZM25.3333 4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V6.66667C28 5.2 26.8 4 25.3333 4Z" fill="black"/></svg>',
      },
    },
  },
  variants: {
    extend: {},
  },
};
