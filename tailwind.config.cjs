/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark1: '#0F0D1A',
        dark2: '#1A1A2E',
        primary: '#FF3CAC',
        secondary: '#784BA0',
        accent: '#2B86C5',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(to bottom, #2b0030, #0f0d1a)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
