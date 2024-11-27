// tailwind.js (or tailwind.config.js for ES Module setup)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Define your content paths
  theme: {
    extend: {
      animation: {
        slideFromLeft: "slideFromLeft 1s ease-in-out forwards",
        slideBackToLeft: "slideBackToLeft 1s ease-in-out forwards",
      },
      keyframes: {
        slideFromLeft: {
          "0%": { transform: "translateX(-100%)" }, // Start off-screen to the left
          "50%": { transform: "translateX(20px)" }, // Move slightly right
          "100%": { transform: "translateX(0)" }, // Final position
        },
        slideBackToLeft: {
          "0%": { transform: "translateX(0)" }, // Start at final position
          "50%": { transform: "translateX(20px)" }, // Move slightly right
          "100%": { transform: "translateX(-100%)" }, // Go off-screen to the left
        },
      },
    },
  },
  plugins: [],
};
