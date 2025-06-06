/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark background base colors
        dark1: '#0F0D1A',
        dark2: '#1A1A2E',

        // Neon palette
        primary: '#FF3CAC',
        secondary: '#784BA0',
        accent: '#2B86C5',
        'dark-overlay': 'rgba(0, 0, 0, 0.5)',

        // Instagram‐inspired palette
        'insta-yellow': '#FEDA77',
        'insta-orange': '#FA7E1E',
        'insta-pink':   '#D62976',
        'insta-purple': '#962FBF',
        'insta-blue':   '#4F5BD5',
      },

      backgroundImage: {
        // ====================================================================
        // 1) Single seamless, long‐page gradient. Apply “bg-seamless-gradient
        //    bg-fixed bg-cover” once at your app’s root so that it stays
        //    anchored behind every section (Home → Features → Pricing → Creators).
        // ====================================================================
        'seamless-gradient': 'linear-gradient(to bottom, #0F0D1A, #1A1A2E, #0F0D1A)',

        // ====================================================================
        // 2) (Optional) Keep any other standalone gradients you still want to
        //    layer on top—for example, for a phone screen or text. But they
        //    will sit above the anchored “seamless-gradient.”
        // ====================================================================
        'page-gradient':  'linear-gradient(to bottom, #2b0030, #0f0d1a)',
        'hero-gradient':  'linear-gradient(45deg, #FF3CAC, #784BA0, #2B86C5)',
        'pulse-gradient': 'radial-gradient(circle at center, rgba(255,60,172,0.3), transparent 70%)',

        'insta-gradient-1': 'linear-gradient(45deg, #FEDA77, #FA7E1E)',
        'insta-gradient-2': 'linear-gradient(45deg, #FA7E1E, #D62976)',
        'insta-gradient-3': 'linear-gradient(45deg, #D62976, #962FBF)',
        'insta-gradient-4': 'linear-gradient(45deg, #962FBF, #4F5BD5)',

        'insta-spectrum': 'linear-gradient(45deg, #FEDA77, #FA7E1E, #D62976, #962FBF, #4F5BD5)',
      },

      boxShadow: {
        'glow-primary': '0 0 20px rgba(255,60,172,0.8), 0 0 40px rgba(43,134,197,0.6)',
        'glow-accent':  '0 0 16px rgba(43,134,197,0.6), 0 0 32px rgba(120,75,160,0.5)',
        'insta-glow':   '0 0 30px rgba(254,218,119,0.6), 0 0 60px rgba(214,41,118,0.4)',
        'card-lg':      '0 8px 32px rgba(0,0,0,0.5)',
        'phone-glow':   '0 0 60px rgba(255,60,172,0.4), 0 0 90px rgba(43,134,197,0.3)',
      },

      keyframes: {
        // Text‐gradient animation for headings or shimmering text
        textGradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
        // Icon‐card gradient shift (if used anywhere)
        cardGradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
        // Phone scale/pulse
        phoneScale: {
          '0%, 100%': { transform: 'scale(0.95)' },
          '50%':      { transform: 'scale(1)' },
        },
        phoneGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        // General neon pulse
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        // Instagram-spectrum gradient shift
        instaSpectrumShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
        // Badge-pulse for “Most Popular” labels or partner logos
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.1)' },
        },
        // Avatar subtle glow (opacity pulse)
        avatarGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        // Badge shake (for labels on hover)
        badgeShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(2px)' },
          '75%':      { transform: 'translateX(-2px)' },
        },
        // Divider swing
        dividerSwing: {
          '0%, 100%': { transform: 'translateX(-50%) scaleX(1)' },
          '50%':      { transform: 'translateX(-50%) scaleX(1.3)' },
        },
        // Underline pulse
        underlinePulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(1)' },
          '50%':      { opacity: '1',   transform: 'scaleX(1.2)' },
        },
        // Background “fog” pulse (very low opacity)
        bgGlowPulse: {
          '0%, 100%': { opacity: '0' },
          '50%':      { opacity: '0.4' },
        },
      },

      animation: {
        'text-gradient':   'textGradientShift 5s ease-in-out infinite',
        'card-gradient':   'cardGradient 6s ease-in-out infinite',
        'phone-scale':     'phoneScale 6s ease-in-out infinite',
        'phone-glow':      'phoneGlow 4s ease-in-out infinite',
        'logo-glow':       'glowPulse 3s ease-in-out infinite',
        'insta-spectrum':  'instaSpectrumShift 6s ease-in-out infinite',
        'badge-pulse':     'badgePulse 2.5s ease-in-out infinite',
        'avatar-glow':     'avatarGlow 4s ease-in-out infinite',
        'badge-shake':     'badgeShake 2s ease-in-out infinite',
        'divider-swing':   'dividerSwing 4s ease-in-out infinite',
        'underline-pulse': 'underlinePulse 2s ease-in-out infinite',
        'bg-glow-pulse':   'bgGlowPulse 4s ease-in-out infinite',
      },

      fontFamily: {
        sans:    ['Inter',   'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },

      borderRadius: {
        'full-phone': '2rem',
        'card-lg':    '1.5rem',
      },

      transitionProperty: {
        'bg-pos':     'background-position',
        'shadow':     'box-shadow',
        '-transform': 'transform',
        'width':      'width',
      },

      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },

      lineHeight: {
        hero: '1.1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
