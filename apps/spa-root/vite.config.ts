import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import externalize from "vite-plugin-externalize-dependencies";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    ViteEjsPlugin({
      isLocal: process.env.NODE_ENV === "development",
    }),
    externalize({ externals: ["@rubik"] }),
  ],
  build: {
    rollupOptions: {
      external: ["@rubik"],
      output: {
        format: "systemjs",
      },
    },
  },
});
