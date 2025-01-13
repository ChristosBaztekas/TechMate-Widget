/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkColor: "#000000", // Default Dark Color
        lightColor: "#FFF", // Default Light Color
        primaryColor: "#501AC8", // Change Chatbot Theme
        hoverColor: "#B366CF", // Change Chatbot Hover Theme
        gradientColor: "#1C064C", // Change Chatbot Send Gradient Theme
        footerColor: "#370E92", // Change Footer Theme
      },
      screens: {
        "vsm": "574px",
      },
    },
  },
  plugins: [],
}

