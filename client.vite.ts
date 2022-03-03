import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const root = resolve(__dirname, "src", "client");

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    root,
    base: "./",
    build: {
      outDir: resolve(__dirname, "dist", "public")
    },
    server: {
      port: Number(env.VITE_CLIENT_PORT) || 3001,
      proxy: {
        "/api": {
          target: `http://localhost:${env.VITE_SERVER_PORT || 3000}`,
          changeOrigin: true
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "~": root
      }
    }
  });
};
