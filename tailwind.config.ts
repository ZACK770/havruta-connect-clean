import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - based on logo gradient
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe', 
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Main purple from logo
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          DEFAULT: '#8b5cf6',
        },
        // Secondary brand color - indigo from logo
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#6366f1', // Main indigo from logo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          DEFAULT: '#6366f1',
        },
        // Accent - vibrant complementary color
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Vibrant magenta
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
          DEFAULT: '#d946ef',
        },
        // Success - soft green
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          DEFAULT: '#22c55e',
        },
        // Warning - warm amber
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
          DEFAULT: '#f59e0b',
        },
        // Background system
        'background-primary': '#fafbff', // Ultra light
        'background-secondary': '#f8fafc', // Light
        'background-tertiary': '#f1f5f9', // Medium light
        'background-dark-primary': '#0f0f23', // Deep dark
        'background-dark-secondary': '#1a1a2e', // Dark
        'background-dark-tertiary': '#252542', // Medium dark
        // Text system
        'text-primary': '#0f0f23', // Deep dark for contrast
        'text-secondary': '#475569', // Muted
        'text-tertiary': '#94a3b8', // Light
        'text-inverse': '#ffffff', // White
        'text-accent': '#8b5cf6', // Brand purple
        // Glass effects
        'glass-light': 'rgba(255, 255, 255, 0.85)',
        'glass-medium': 'rgba(255, 255, 255, 0.6)',
        'glass-dark': 'rgba(15, 15, 35, 0.85)',
        'glass-medium-dark': 'rgba(15, 15, 35, 0.6)',
        // Semantic colors - shadcn/ui compatible
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#8b5cf6',
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        foreground: '#0f172a',
        // Legacy support
        background: '#fafbff',
        text: '#0f0f23',
        glass: 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hebrew: ['Assistant', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-xl': '0 0 60px rgba(139, 92, 246, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-lg': '0 16px 64px 0 rgba(31, 38, 135, 0.1)',
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'gradient-shift': 'gradientShift 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
  direction: 'rtl',
}

export default config
