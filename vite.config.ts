import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["three"],
      output: {
        format: "umd",
        name: "ThreeBundle",
        globals: {
          three: "THREE",
        },
      },
    },
  },
});
