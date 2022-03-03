import { existsSync } from "fs";
import { rm } from "fs/promises";
import minimist from "minimist";
import spawn from "cross-spawn";

const argv = minimist(process.argv.slice(2));
const mode = argv._.includes("dev") ? "dev" : argv._.includes("build") ? "build" : "preview";
const vite = process.platform === "win32" ? "./node_modules/.bin/vite.cmd" : "./node_modules/.bin/vite";
const vuetsc = process.platform === "win32" ? "./node_modules/.bin/vue-tsc.cmd" : "./node_modules/.bin/vue-tsc";

async function remove(path) {
  if (existsSync(path)) {
    await rm(path, { recursive: true });
  }
}

function handleMessage(title, data, isError) {
  const msg = data.toString().trim();

  if (msg) {
    if (isError) {
      console.error(`[${title}]`, msg);
    } else {
      console.log(`[${title}]`, msg);
    }
  }
}

async function execute(type) {
  const title = type === "server" ? "Server" : "Client";
  const args = ["-c", `${title.toLowerCase()}.vite.ts`];

  if (mode !== "dev") {
    args.push(mode);
  }

  if (mode === "build") {
    await Promise.allSettled([remove("./.swc"), remove("./dist")]);

    try {
      spawn.sync(vuetsc, ["--project", "client.tsconfig.json", "--noEmit"]);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const child = spawn(vite, args, { cwd: process.cwd() });
  child.stdout.on("data", (data) => handleMessage(title, data, false));
  child.stderr.on("data", (data) => handleMessage(title, data, true));
  child.on("close", (code) => console.log(`[${title}]`, `Closed with code ${code}`));
}

await execute("server");
await execute("client");
