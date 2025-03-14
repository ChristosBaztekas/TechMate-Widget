import typography from '@tailwindcss/typography';

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "var(--dark-color)",
        lightColor: "var(--light-color)",
        primaryColor: "var(--primary-color)",
        hoverColor: "var(--hover-color)",
        gradientColor: "var(--gradient-color)",
        footerColor: "var(--footer-color)",
      },
      borderRadius: {
        rad: "10px",
      },
      screens: {
        sm: "500px",
        vsm: "430px",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
