const colors = require('tailwindcss/colors')

const config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './configs/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    process.env.NODE_ENV === 'production' && require('tailwindcss-animate')
    // require('tailwindcss-animate')
  ],
  theme: {
    colors: {
      primary: colors.red[700],
      secondary: colors.indigo[700],
      success: colors.emerald[400],
      dark: colors.slate[700],
      light: '#FFF0F0',
      litetext: colors.slate[400],
      extralight: colors.slate[200],
      danger: colors.rose[600],
      slate: colors.slate,
      gray: colors.gray,
      neutral: colors.neutral,
      orange: colors.orange,
      yellow: colors.yellow,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      pink: colors.pink,
      red: colors.red,
      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      transparent: colors.transparent
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  }
}

module.exports = config
