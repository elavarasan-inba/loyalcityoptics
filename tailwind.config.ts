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
        navy: '#0A1628',
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        cream: '#F8F4EF',
        'dark-card': '#111827',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '80%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
