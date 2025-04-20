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
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeInDown: "fadeInDown 0.5s ease-out",
        fadeInLeft: "fadeInLeft 0.5s ease-out",
        fadeInRight: "fadeInRight 0.5s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        morph: 'morph 3s ease-in-out infinite',
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
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
