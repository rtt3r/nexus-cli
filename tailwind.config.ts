import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Nunito',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ['dark', 'light']
  }
};

export default config;
