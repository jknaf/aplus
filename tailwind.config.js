/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './pages/**/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#F2F0EB',
        'brand-surface': '#E5E3DC',
        'brand-orange': '#6B8F4A',
        'brand-muted': '#8A8A80',
        'brand-dark': '#2C3530',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 25s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'stamp': 'stamp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'scan': 'scan 3s linear infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'kenburns-1': 'kenburns-1 25s ease-in-out infinite alternate',
        'kenburns-2': 'kenburns-2 28s ease-in-out infinite alternate',
        'kenburns-3': 'kenburns-3 30s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(249,115,22,0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(249,115,22,0.3)' },
        },
        'stamp': {
          '0%': { opacity: '0', transform: 'scale(2)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scan': {
          '0%': { top: '-20%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '120%', opacity: '0' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'kenburns-1': {
          '0%': { transform: 'scale(1) translate(0, 0)', transformOrigin: '50% 50%' },
          '100%': { transform: 'scale(1.15) translate(-2%, -1%)', transformOrigin: '50% 50%' },
        },
        'kenburns-2': {
          '0%': { transform: 'scale(1.1) translate(2%, 1%)', transformOrigin: '40% 60%' },
          '100%': { transform: 'scale(1.2) translate(-2%, -2%)', transformOrigin: '40% 60%' },
        },
        'kenburns-3': {
          '0%': { transform: 'scale(1) translate(0, 0)', transformOrigin: '60% 40%' },
          '100%': { transform: 'scale(1.18) translate(2%, 2%)', transformOrigin: '60% 40%' },
        },
      },
    },
  },
  plugins: [],
}
