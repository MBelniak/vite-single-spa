import { defineConfig, mergeConfig, UserConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import externalize from "vite-plugin-externalize-dependencies";

// https://vitejs.dev/config/
export default (configOverride: UserConfig = {}) =>
  mergeConfig(
    defineConfig({
      base: "/",
      plugins: [
        ViteEjsPlugin({
          isLocal: process.env.NODE_ENV === "development",
        }),
        externalize({ externals: ["@rubik", "react", "react-dom"] }),
      ],
      build: {
        rollupOptions: {
          external: ["@rubik", "react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            format: "systemjs",
          },
        },
      },
    }),
    configOverride
  );
