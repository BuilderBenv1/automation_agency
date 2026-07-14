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
        accent: '#1a4fa0',
        'accent-light': '#e8eef8',
        brand: {
          text: '#141210',
        },
        ink: '#131210',
        'ink-2': '#1c1a16',
        cream: '#f4ede0',
        'cream-2': '#efe6d5',
        lime: '#c8f04a',
        'muted-dark': '#b7b0a2',
        'muted-cream': '#5f5648',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.8rem, 5vw, 4.6rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.8rem, 3vw, 2.6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-mega': ['clamp(2.9rem, 8vw, 6.2rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'h2-band': ['clamp(1.9rem, 4vw, 2.6rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}

export default config
