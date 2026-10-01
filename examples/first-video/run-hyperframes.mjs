import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Use optional portable dependencies installed for this Windows workspace.
// Explicit environment settings take precedence; other machines use their PATH.
const workspaceRoot = fileURLToPath(new URL("../../", import.meta.url));
const environment = { ...process.env };
const ffmpegDirectory = join(workspaceRoot, ".tools", "ffmpeg", "bin");
const binaries = [
  ["HYPERFRAMES_FFMPEG_PATH", join(ffmpegDirectory, "ffmpeg.exe")],
  ["HYPERFRAMES_FFPROBE_PATH", join(ffmpegDirectory, "ffprobe.exe")],
  [
    "HYPERFRAMES_BROWSER_PATH",
    join(
      workspaceRoot,
      ".tools",
      "browser",
      "chrome-headless-shell-win64",
      "chrome-headless-shell.exe",
    ),
  ],
];
if (process.platform === "win32") {
  for (const [key, path] of binaries) {
    if (!environment[key] && existsSync(path)) environment[key] = path;
  }
  if (existsSync(join(ffmpegDirectory, "ffmpeg.exe"))) {
    const pathKey = Object.keys(environment).find((key) => key.toLowerCase() === "path") ?? "PATH";
    environment[pathKey] = ffmpegDirectory + delimiter + (environment[pathKey] ?? "");
  }
}

const npmCli =
  process.env.npm_execpath ??
  join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
if (!existsSync(npmCli)) {
  throw new Error(
    "Run this example through its npm scripts: npm run check, npm run preview, npm run render.",
  );
}
const child = spawn(
  process.execPath,
  [
    npmCli,
    "exec",
    "--yes",
    "--package=hyperframes@0.8.103",
    "--",
    "hyperframes",
    ...process.argv.slice(2),
  ],
  {
    cwd: fileURLToPath(new URL(".", import.meta.url)),
    env: environment,
    stdio: "inherit",
    windowsHide: true,
  },
);
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
