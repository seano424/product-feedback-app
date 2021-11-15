module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#AD1FEA',
      secondary: '#4661E6',
      'dark-100': '#647196',
      'dark-200': '#3A4374',
      'dark-300': '#4661E6',
      white: '#FFFFFF',
      'light-100': '#F7F8FD',
      'light-200': '#F2F4FF',
      'gradient-1': '#62BCFA',
      'gradient-2': '#F49F85',
    },
    fontfamily: {
      display: ['Jost', 'sans-serif'],
      body: ['Jost', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
