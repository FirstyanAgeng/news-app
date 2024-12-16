import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.nytimes.com", // URL target API
        changeOrigin: true, // Menyesuaikan origin agar sesuai dengan target
        rewrite: (path) => path.replace(/^\/api/, ""), // Hapus prefix '/api'
      },
    },
  },
});
