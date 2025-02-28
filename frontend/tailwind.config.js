/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3D8D7A',
        secondary: '#B3D8A8',
        accent: '#FBFFE4',
        tertiary: '#A3D1C6',
      },
      fontFamily: {
        'atkinson': ['"Atkinson Hyperlegible Next"', 'serif'],
        'sigmar': ['Sigmar', 'cursive'],
        'lora': ['Lora', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};