import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'accent-dark': '#1A1A1A',
        'main-bg': '#F1F5FA',
        'gray-light': '#F4F4F4',
        'gray-medium': '#E6E6E6',
        'gray-regular': '#999999',
        'gray-dark': '#575757',
      },
      fontFamily: {
        'inherit': ['inherit']
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/images/SOFA.png')",
        'demo-pattern': "url('/assets/images/demo-bg.jpg')",
      },
      textShadow: {
        sm: '0 1px 2px accent-dark'
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
  important: true,
};

export default withUt({
  ...config
});
