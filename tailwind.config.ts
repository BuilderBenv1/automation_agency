import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#faf9f7',
        'bg-2': '#f3f1ed',
        navy: '#0f1b2d',
        'navy-mid': '#1e2f47',
        accent: '#1a4fa0',
        'accent-light': '#e8eef8',
        brand: {
          text: '#141210',
          mid: '#3d4045',
          muted: '#767b82',
          border: '#e2ddd8',
          'border-dark': '#c8c2bb',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.8rem, 5vw, 4.6rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.8rem, 3vw, 2.6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        brand: '3px',
      },
    },
  },
  plugins: [],
}

export default config
