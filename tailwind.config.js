/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      black: '#1F1F1F',
      melrose: '#A9B2FF',
      orange: '#FFC54A',
      pink: '#FFE7E7',
      purple: '#5F5EF9',
      red: '#FF564D',
      teal: '#B7F6FF',
      white: '#FFFFFF',
      gray: '#65676B'
    },
    fontFamily: {
      sans: ['AbeeZee', 'sans-serif'],
      headline: ['Atma', 'sans-serif'],
      social: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
    },
    fontSize: {
      xs: '.875rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.5rem',
      xl: '2rem'
    }
  },
  plugins: []
}
