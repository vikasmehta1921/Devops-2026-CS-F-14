import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  // Enable React support in Vite
  plugins: [react()],

  // Development server configuration
  server: {
    // Forward all /api requests to the backend
    proxy: {
      "/api": {
        // Local Express backend
        target: "http://localhost:5000",

        // Change the origin of the request to the target server
        changeOrigin: true,
      },
    },
  },
});
