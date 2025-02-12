import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api-test.techmate.gr/",
        changeOrigin: true,
        secure: false, // Set to true if the API has a valid SSL certificate
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});