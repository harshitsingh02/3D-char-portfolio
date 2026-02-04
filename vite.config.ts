import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // OPTIMIZATION: Split code into smaller chunks for faster loading
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
          gsap: ["gsap"],
        },
      },
    },
    // Increase warning limit since 3D libraries are naturally large
    chunkSizeWarningLimit: 1000,
  },
});