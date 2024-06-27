import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        heading_XL: ['1.5rem', { lineHeight: '1.875rem', fontWeight: '700' }],
        heading_L: ['1.125rem', { lineHeight: '1.4375rem', fontWeight: '700' }],
        heading_M: [
          '0.9375rem',
          { lineHeight: '1.1875rem', fontWeight: '700' },
        ],
        heading_S: [
          '0.75rem',
          {
            lineHeight: '0.9375rem',
            letterSpacing: '0.125rem',
            fontWeight: '700',
          },
        ],
        body_L: ['0.8125rem', { lineHeight: '1.4375rem', fontWeight: '500' }],
        body_M: ['0.75rem', { lineHeight: '0.9375rem', fontWeight: '700' }],
      },
      colors: {
        button: {
          primary: '#635FC7',
          primary_hover: '#A8A4FF',
          primary_text: '#FFFFFF',
          secondary_light: 'hsla(242, 48%, 58%, 10%)',
          secondary_light_hover: 'hsla(242, 48%, 58%, 25%)',
          secondary_text: '#635FC7',
          secondary_dark: '#FFFFFF',
          destructive: '#EA5555',
          desctructive_hover: '#FF9898',
          desctructive_text: '#FFFFFF',
        },
        typography: {
          black: '#000112',
          grey: '#828FA3',
          white: '#FFFFFF',
          destructive: '#EA5555',
          purple: '#635FC7',
        },
        black_primary: '#000112',
        dark_grey_primary: '#20212C',
        dark_grey_secondary: '#2B2C37',
        lines: { light: '#E4EBFA', dark: '#3E3F4E' },
        background: { light: '#F4F7FD', dark: '#20212C', medium: '#E9EFFA' },
      },
    },
  },
  plugins: [],
};
export default config;
