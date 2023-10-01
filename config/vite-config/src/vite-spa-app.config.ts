import { defineConfig, mergeConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import externalize from "vite-plugin-externalize-dependencies";
const namedExportsPlugin =
  require("@rubik/named-export-externals-plugin").default;

// https://vitejs.dev/config/
export default (input: string, configOverride: UserConfig = {}) =>
  mergeConfig(
    defineConfig({
      plugins: [
        react(),
        externalize({
          externals: ["@rubik", "react", "react-dom"],
        }),
        namedExportsPlugin({
          externals: ["@rubik", "react", "react-dom"],
        }),
      ],
      base: "/",
      build: {
        minify: false,
        rollupOptions: {
          input,
          external: ["@rubik", "react", "react-dom"],
          preserveEntrySignatures: "strict",
          output: {
            format: "systemjs",
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`,
          },
        },
      },
    }),
    configOverride
  );
