/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "#000000", // Default Dark Color
        lightColor: "#FFF", // Default Light Color
        primaryColor: "#C7313D", // Change Chatbot Theme
        hoverColor: "#E55640", // Change Chatbot Hover Theme
        gradientColor: "#681017", // Change Chatbot Send Gradient Theme
        footerColor: "#9D2816", // Change Footer Theme
      },
      borderRadius: {
        rad: "18px",
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
  plugins: [],
};
