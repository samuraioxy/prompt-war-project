/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        echo: {
          950: '#06080F',
          900: '#0B0F19',
          850: '#0E1424',
          800: '#131B2E',
          750: '#18233C',
          700: '#1E2C4B',
          600: '#2A3C66',
        },
        cyan: {
          350: '#38ECF9',
          450: '#00D8F6',
          550: '#00B9DE',
        },
        violet: {
          450: '#9061F9',
          550: '#7E3AF2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 35px rgba(139, 92, 246, 0.2)' },
        }
      }
    },
  },
  plugins: [],
}
