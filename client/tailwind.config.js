/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                marquee: "marquee 7s linear infinite",
                marquee2: "marquee2 7s linear infinite",
            },

            screens: {
                "-md": { max: "768px" },
            },

            fontFamily: {
                proximaNova: ["proxima-nova-regular", "sans-serif"],
                garamond: ["garamond", "serif"],
            },

            fontSize: {
                // xs: ["0.9375rem", { lineHeight: "1.4375rem" }], // was 0.875rem
                // sm: ["1.0625rem", { lineHeight: "1.5625rem" }], // was 1rem
                base: ["1.125rem", { lineHeight: "1.5625rem" }], // was 1.125rem
                // lg: ["1.375rem", { lineHeight: "2rem" }], // was 1.25rem
                // xl: ["1.5rem", { lineHeight: "2.125rem" }], // was 1.375rem
                // "2xl": ["1.75rem", { lineHeight: "2.25rem" }], // was 1.625rem
                // "3xl": ["2.25rem", { lineHeight: "2.5rem" }], // was 2.0625rem
                // "4xl": ["2.75rem", { lineHeight: "2.875rem" }], // was 2.5625rem
                // "5xl": ["3.375rem", { lineHeight: "1" }], // was 3.1875rem
                // "6xl": ["4.125rem", { lineHeight: "1" }], // was 3.9375rem
            },

            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },

                marquee2: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
