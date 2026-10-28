import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite configuration for the React frontend.
 *
 * The development server uses a proxy so that API requests
 * can be forwarded to the backend server without CORS issues.
 */
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
