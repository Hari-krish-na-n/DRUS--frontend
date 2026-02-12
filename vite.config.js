import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // optional: remove /api prefix if your backend doesn’t use it
        // rewrite: path => path.replace(/^\/api/, ""),
      }
    }
  }
});
