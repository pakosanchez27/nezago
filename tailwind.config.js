/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neza: {
          primary: '#611232',
          secondary: '#FFD175',
          'secondary-b': '#795801',
          tertiary: '#003B17',
          blanco: '#FFFFFF',
          negro: '#000000',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
