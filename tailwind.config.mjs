/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.0625rem',
      DEFAULT: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
    extend: {
      colors: {
        // Primary
        vermillion: {
          DEFAULT: '#d53e20',
          dark: '#b02e15',
          light: '#e8634a',
        },
        // Surfaces
        paper: '#fbf9f8',
        'surface-palm': '#fdf6e3',
        'surface-bark': '#eaddd7',
        // Borders
        'border-subtle': '#e8e1df',
        // Text
        ink: '#1b100e',
        clay: '#7a4a3f',
        // Accents
        gold: {
          DEFAULT: '#c8a165',
          bright: '#d4af37',
        },
        turmeric: '#f59e0b',
        // Dark mode
        charcoal: {
          600: '#57534E',
          700: '#44403C',
          750: '#362f2b',
          800: '#292524',
          900: '#211411',
        },
        // Legacy compat (used in some component classes)
        cream: '#fbf9f8',
      },
      fontFamily: {
        sans: ['Manrope', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        serif: ['Tiro Devanagari Sanskrit', 'Noto Sans Devanagari', 'Noto Serif', 'serif'],
        devanagari: ['Tiro Devanagari Sanskrit', 'Noto Sans Devanagari', 'Noto Serif', 'serif'],
      },
      fontSize: {
        'body': ['1.125rem', { lineHeight: '1.5' }],
        'sanskrit': ['1.25rem', { lineHeight: '2.0' }],
        'sanskrit-lg': ['1.5rem', { lineHeight: '2.0' }],
        'sanskrit-display': ['3rem', { lineHeight: '1.6' }],
        'caption': ['0.9375rem', { lineHeight: '1.8' }],
        'display': ['2.625rem', { lineHeight: '1.2' }],
        'section': ['2rem', { lineHeight: '1.2' }],
      },
      lineHeight: {
        'devanagari': '2.0',
      },
      boxShadow: {
        'card': '0 2px 10px -1px rgba(88, 56, 45, 0.1)',
        'card-hover': '0 10px 25px -5px rgba(88, 56, 45, 0.2)',
        'page': '0 4px 20px -2px rgba(88, 56, 45, 0.15)',
      },
      backgroundImage: {
        'vermillion-gradient': 'linear-gradient(135deg, #d53e20 0%, #a02e16 100%)',
        'gradient-palmleaf': 'linear-gradient(180deg, rgba(244,239,234,0.4) 0%, rgba(227,216,203,0.4) 100%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1b100e',
            '--tw-prose-headings': '#1b100e',
            lineHeight: '1.8',
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
