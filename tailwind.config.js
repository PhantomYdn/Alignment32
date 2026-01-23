/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // StepIndicator dynamic classes - Physical
    'bg-physical-500', 'ring-physical-200', 'text-physical-600', 'text-physical-700',
    // StepIndicator dynamic classes - Mental
    'bg-mental-500', 'ring-mental-200', 'text-mental-600', 'text-mental-700',
    // StepIndicator dynamic classes - Emotional
    'bg-emotional-500', 'ring-emotional-200', 'text-emotional-600', 'text-emotional-700',
    // StepIndicator dynamic classes - Spiritual
    'bg-spiritual-500', 'ring-spiritual-200', 'text-spiritual-600', 'text-spiritual-700',
    // StepIndicator dynamic classes - Review
    'bg-review-500', 'ring-review-200', 'text-review-600', 'text-review-700',
    // Brand gradient classes used in dynamic button states
    'from-brand-500', 'to-brand-600', 'from-brand-600', 'to-brand-700',
    'hover:from-brand-600', 'hover:to-brand-700',
    // Background and text brand classes
    'bg-brand-500', 'bg-brand-600', 'text-brand-600',
    // Celebration animation
    'animate-celebration-glow',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - deep indigo/purple spectrum
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Category colors
        physical: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        mental: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        emotional: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        spiritual: {
          50: '#faf8ff',
          100: '#f3effe',
          200: '#e9e2fc',
          300: '#d9cef7',
          400: '#c4b5f0',
          500: '#b4a7d6',
          600: '#9a8bc0',
          700: '#7f70a3',
        },
        review: {
          50: '#fffdf7',
          100: '#fef9e7',
          200: '#fdf0c3',
          300: '#fce588',
          400: '#fbd74d',
          500: '#f5c518',
          600: '#d9a706',
          700: '#b38705',
        },
        // Surface colors for cards and backgrounds
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px -5px rgba(139, 92, 246, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'celebration-glow': 'celebrationGlow 2s ease-in-out infinite',
        'confetti-fall': 'confettiFall 3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        celebrationGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
