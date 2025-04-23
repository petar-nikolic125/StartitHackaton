/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                dark:        '#0e0b1d',
                panel:       '#111111',
                accent1:     '#D93EFF',
                accent2:     '#FF894C',
                brandPurple: '#8A3FFC',
            },
            backgroundImage: {
                'hero-glow':
                    'radial-gradient(circle at 50% 50%, rgba(255,0,204,0.4), rgba(255,153,0,0.2), transparent)',
            },
            animation: {
                fadeIn: 'fadeIn 0.8s ease-out forwards',
                float:  'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%':   { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                float: {
                    '0%,100%': { transform: 'translateY(0)' },
                    '50%':     { transform: 'translateY(-8px)' },
                },
            },
        },
    },
    plugins: [],
};
