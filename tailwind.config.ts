import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

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
      }
    },
  },
  plugins: [],
};

export default withUt({
  ...config
});
