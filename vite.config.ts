import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
    build: {
      outDir: "dist",
    },
    server: {
      port: mode === "development" ? 3000 : undefined,
    },
    plugins: [react()],
  };
});
