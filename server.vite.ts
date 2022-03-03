import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePluginNode } from "vite-plugin-node";

const entry = "./src/server/index.ts";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: resolve(__dirname, "dist"),
      target: "esnext",
      rollupOptions: {
        input: {
          main: entry
        },
        output: {
          format: "esm"
        }
      }
    },
    server: {
      port: Number(env.VITE_SERVER_PORT) || 3000
    },
    plugins: [
      ...VitePluginNode({
        exportName: "vite",
        adapter: "fastify",
        appPath: entry,
        tsCompiler: "swc"
      })
    ]
  });
};
