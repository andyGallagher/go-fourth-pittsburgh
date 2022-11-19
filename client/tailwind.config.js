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
