import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        purple_primary: '#635FC7',
        purple_hover: '#A8A4FF',
        black_primary: '#000112',
        dark_grey_primary: '#20212C',
        dark_grey_secondary: '#2B2C37',
        lines_dark: '#3E3F4E',
        lines_light: '#E4EBFA',
        medium_grey: '#828FA3',
        light_grey: '#F4F7FD',
        red_primary: '#EA5555',
        red_hover: '#FF9898',
      },
      textColor: {
        black_primary: '#000112',
        medium_grey: '#828FA3',
      },
      borderColor: {
        lines_light: '#E4EBFA',
      },
    },
  },
  plugins: [],
};
export default config;
