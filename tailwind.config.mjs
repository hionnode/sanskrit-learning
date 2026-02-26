/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FFFBEB',
        saffron: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        charcoal: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      fontSize: {
        'sanskrit': ['1.375rem', { lineHeight: '2.0' }],
        'sanskrit-lg': ['1.5rem', { lineHeight: '2.0' }],
      },
      lineHeight: {
        'devanagari': '1.9',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.stone.800'),
            '--tw-prose-headings': theme('colors.stone.900'),
            lineHeight: '1.9',
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.stone.200'),
            '--tw-prose-headings': theme('colors.stone.100'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
