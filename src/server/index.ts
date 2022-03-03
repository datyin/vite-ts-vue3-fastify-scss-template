import { env } from "process";
import { resolve } from "path";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import { getScriptDirectory } from "./helper";

const PORT = Number(env["PORT"]) || 3000;
const server = fastify();

if (import.meta.env.PROD) {
  server.register(fastifyStatic, {
    root: resolve(getScriptDirectory(import.meta.url), "public")
  });
}

server.get("/api/some_endpoint", async (_, reply) => {
  reply.send({ message: "from backend" });
});

server.get("/", async (_, reply) => {
  if (import.meta.env.PROD) {
    reply.sendFile("index.html");
  } else {
    reply.redirect("http://localhost:3001");
  }
});

const start = async () => {
  if (import.meta.env.PROD) {
    await server.listen(PORT, "0.0.0.0");
    console.log("Listening on port", PORT);
  }

  return server;
};

export const vite = start();
