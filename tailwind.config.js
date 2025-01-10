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
        primaryColor: "#C7313D", // Change Chatbot Theme
        hoverColor: "#B366CF", // Change Chatbot Hover Theme
      },
      screens: {
        "2xl": "1536px",
        "xl": "1280px",
        "lg": "1024px",
        "md": "868px",
        "sm": "640px",
        "vsm": "460px",
        "tiny": "330px",
      },
    },
  },
  plugins: [],
}

