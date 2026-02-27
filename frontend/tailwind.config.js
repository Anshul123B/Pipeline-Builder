/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c6bc0',
        'primary-dark': '#3f51b5',
        'bg-dark': '#1a1d23',
        'bg-card': '#22262e',
        'bg-input': '#2a2f38',
        border: '#3a3f4a',
        'border-light': '#4a5060',
        text: '#e8e8e8',
        'text-dim': '#a0a4ad',
        'text-faint': '#6b7280',
        'accent-green': '#4ade80',
        'accent-amber': '#fbbf24',
        'accent-purple': '#a78bfa',
        'accent-blue': '#60a5fa',
        'accent-pink': '#f472b6',
        'accent-teal': '#2dd4bf',
        'accent-orange': '#fb923c',
        'accent-cyan': '#22d3ee',
        'accent-violet': '#c084fc',
      },
    },
  },
  plugins: [],
}
