import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: "src/react.ts",
      preserveEntrySignatures: "strict",
      output: [
        {
          dir: "dist",
          format: "systemjs",
          manualChunks: () => null,
          entryFileNames: `assets/[name].js`,
        },
      ],
    },
  },
});
