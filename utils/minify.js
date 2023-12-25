/* eslint-disable no-console */
"use strict";

import fsp from "fs/promises";
import path from "path";
import util from "util";
import childProcess from "child_process";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nop = () => {};
const execFile = util.promisify(childProcess.execFile);
const srcPath = path.join(__dirname, "..");

process.chdir(srcPath);
build().catch((err) => console.error(err));

async function build() {
  // Ensure the latest version of the cloud client is built
  await checkCloudChanged();
  await buildCloudClient();
  await minifyJS();
}

async function buildCloudClient() {
  const cloudDir = path.join(__dirname, "..", "src", "cloud");
  await execFile("npm", ["run", "build"], { cwd: cloudDir });
}

async function checkCloudChanged() {
  const paths = await getChangedPaths();
  if (paths.includes("src/cloud")) {
    console.warn(
      `WARNING: Cloud submodule is out of sync. May generate incorrect build files.`,
    );
  }
}

async function getChangedPaths() {
  const { stdout } = await execFile("git", ["status", "--porcelain"]);
  return stdout.split("\n")
    .filter((line) => line.startsWith(" M"))
    .map((line) => line.replace(" M ", ""));
}

async function minifyJS() {
  // Get the given js files
  var devHtml = await fsp.readFile("index.dev.html", "utf8"),
    re = /text\/javascript" src="(.*)">/,
    match = devHtml.match(re),
    srcFiles = [];

  while (match) {
    srcFiles.push(match[1]);
    devHtml = devHtml.substring(match.index + match[0].length);
    match = devHtml.match(re);
  }

  // don't duplicate the main.js file
  const RESERVED_FILE = "main.js";
  srcFiles = srcFiles.filter((f) => !f.endsWith(RESERVED_FILE));

  const srcPath = path.join("dist", "app.js");
  const minPath = srcPath.replace(/\.js$/, ".min.js");
  await fsp.mkdir(path.dirname(srcPath)).catch(nop);
  await srcFiles.reduce(async (prevTask, file) => {
    await prevTask;
    await fsp.appendFile(srcPath, await fsp.readFile(file));
  }, unlinkFile(srcPath));
  try {
    await execFile(
      "closure-compiler",
      ["--js", srcPath, "--js_output_file", minPath],
    );
  } catch (err) {
    throw new Error("Unable to compile JS. Is the closure-compiler installed?");
  }

  const srcLength = (await fsp.readFile(srcPath, "utf8")).length;
  const minLength = (await fsp.readFile(minPath, "utf8")).length;
  console.log("output length:", srcLength);
  console.log("compression ratio:", 1 - (minLength / srcLength));
}

async function unlinkFile(path) {
  try {
    await fsp.unlink(path).catch(nop);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
}
/* eslint-enable no-console */
