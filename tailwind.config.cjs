/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0e0b1d",
                panel: "#111111",
                accent1: "#D93EFF",
                accent2: "#FF894C",
                brandPurple: "#8A3FFC",
                primary: "#FF3CAC",
                secondary: "#784BA0",
                accent: "#2B86C5",
            },
            backgroundImage: {
                // unified, continuous page gradient
                "page-gradient":
                    "linear-gradient(to bottom, #1e0036 0%, #220038 40%, #0d0c2a 100%)",
                "hero-glow":
                    "radial-gradient(circle at 50% 50%, rgba(217,62,255,0.4), rgba(255,137,76,0.2), transparent)",
            },
            animation: {
                fadeIn: "fadeIn 0.8s ease-out forwards",
                float: "float 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
        },
    },
    plugins: [],
}
