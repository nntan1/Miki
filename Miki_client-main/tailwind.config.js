/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,jsx,ts,tsx}','./index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    opacity: {
      0: '0',
      20: '0.2',
      40: '0.4',
      60: '0.6',
      80: '0.8',
      100: '1',
    },
    extend: {
      keyframes: {
        down1: {
          '0%' : { transform : 'translateY(-101px)' },
          '100%' :  { transform : 'translateY(0px)' },
        },
        // down2: {
        //   '0%' : { transform : 'translateY(-101px)' },
        //   '100%' :  { transform : 'translateY(0px)' },
        // }
      },
      colors: {
        //background main

        bgm: '#FFF9F6',

        //btn

        btn: '#251C17',

        //circle

        circle2: 'rgba(183, 141, 113, 0.15);',
        circle1: 'rgba(183, 141, 113, 0.1);',

        // primary
        primary_1: '#6E5544',
        primary_2: '#92715A',
        primary_3: '#B78D71',
        primary_4: '#D4BBAA',
        primary_5: '#E2D1C6',

        //neutral
        neutral_1: '#272727',
        neutral_2: '#626262',
        neutral_3: '#A9A9A9',
        neutral_4: '#E9E9E9',
        neutral_5: '#FFFFFF',
      },
      fontFamily: {
        main: ['Montserrat', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        btnB: '8px',
        imgB: '16px',
      },
      keyframes: {
        growth: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        growth: 'growth 0.3s ease-in ',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
