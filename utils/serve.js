// start a static file server w/ an extra route for index.html
import { fileURLToPath } from "url";
import fs from "fs";
import fsp from "fs/promises";
import http from "http";
import { Transform } from "stream";
import { pipeline } from "stream/promises";
import nodeStatic from "node-static";
import fetch from "node-fetch";
import dot from "dot";
import path from "path";
import assert from "assert/strict";
const port = process.env.PORT ? +process.env.PORT : 8000;
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const indexTpl = dot.template(
  fs.readFileSync(path.join(__dirname, "..", "index.dot")),
);

const {
  CLOUD_URL = "https://cloud.netsblox.org",
  ENV = "dev",
  BUG_DIR,
} = process.env;
const isDevMode = ENV !== "production";
if (BUG_DIR) {
  await fsp.mkdir(BUG_DIR, { recursive: true });
}
writeCloudFile(CLOUD_URL);

const file = new nodeStatic.Server(path.join(__dirname, ".."));
const getExampleThumbnail = cached(async function (cloudUrl, name) {
  const filepath = path.join(
    __dirname,
    "..",
    "Examples",
    name + ".xml",
  );
  const text = await fsp.readFile(filepath, "utf8");
  const thumbnailXml = readFrom(
    readUntil(text, "</thumbnail>"),
    "<thumbnail>data:image/png;base64,",
  );

  return cloudUrl +
    `/projects/thumbnail?xml=${encodeURIComponent(thumbnailXml)}`;
});

const server = http.createServer(async (req, res) => {
  if (isBugReport(req)) {
    return saveBugReport(req, res);
  }

  const [url, queryString = ""] = req.url
    .split("?")
    .map((url) => url.replace(/#.*$/, ""));
  const isIndexHtml = url === "/" || url === "/index.html";
  console.log(req.url);

  if (isIndexHtml) {
    // dynamically generate the index.html file
    const query = Object.fromEntries(
      queryString.split("&").map((chunk) => {
        const [key, value] = chunk.split("=");
        return [key, decodeURIComponent(value)];
      }),
    );
    const cloudUrl = query.cloud || CLOUD_URL;

    const metaInfo = {
      title: "NetsBlox",
      description: "Add project notes here...",
      cloud: cloudUrl,
      isDevMode,
    };

    if (query.action === "present") {
      try {
        const metadata = await getPublicProjectMetadata(cloudUrl, query);
        // TODO: parse the notes? These should probably be saved separately
        if (metadata) {
          metaInfo.title = metadata.name;
          metaInfo.image = {
            url: cloudUrl + `/projects/id/${metadata.id}/thumbnail`,
            width: 640,
            height: 480,
          };
        }
      } catch (err) {
        console.warn(
          `Unable to fetch public project metadata from ${cloudUrl}: ${err.message}`,
        );
      }
    } else if (query.action === "example" && query.ProjectName) {
      try {
        const url = await getExampleThumbnail(cloudUrl, query.ProjectName);
        metaInfo.image = {
          url,
          width: 640,
          height: 480,
        };
      } catch (err) {
        console.warn(
          `Unable to fetch example "${query.ProjectName}"`,
        );
      }
    }

    const userAgent = req.headers["user-agent"];
    if (userAgent) {
      addScraperSettings(userAgent, metaInfo);
    }

    return res.writeHead(200)
      .end(indexTpl(metaInfo));
  } else {
    file.serve(req, res);
  }
});
server.listen(port);
console.log("listening on port", port);

async function getPublicProjectMetadata(cloudUrl, query) {
  const url = cloudUrl +
    `/projects/user/${query.Username}/${query.ProjectName}/metadata`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
}

// Cached function
function cached(fn) {
  const cacheStore = {};

  return async function () {
    const key = [...arguments].join("\t");
    if (!cacheStore[key]) {
      cacheStore[key] = await fn(...arguments);
    }
    return cacheStore[key];
  };
}

function readUntil(text, substring) {
  const index = text.indexOf(substring);
  return text.substring(0, index);
}

function readFrom(text, substring) {
  const index = text.indexOf(substring);
  return text.substring(index + substring.length);
}

function addScraperSettings(userAgent, metaInfo) {
  // fix the aspect ratio for facebook
  if (userAgent.includes("facebookexternalhit") || userAgent === "Facebot") {
    metaInfo.image.url += "?aspectRatio=1.91";
  }
}

async function writeCloudFile(cloud) {
  const configPath = path.join(__dirname, "..", "cloud.txt");
  await fs.promises.writeFile(configPath, cloud);
}

function isBugReport(req) {
  return req.method === "POST" && req.url.startsWith("/bugs/");
}

const MAX_REPORT_LEN = 10000000; // 10 mb
const MAX_REPORT_COUNT = 500;
async function saveBugReport(req, res) {
  if (!BUG_DIR) {
    return res
      .writeHead(400)
      .end("Bug reports not supported by the deployment.");
  }

  // If the length is not too large, save it
  const isAutoReport = req.url.includes("auto");
  const filename = (isAutoReport ? "" : "user") + `${Date.now()}_report.json`;
  const outpath = path.join(BUG_DIR, filename);
  const outStream = fs.createWriteStream(outpath);
  const verifySize = verifyFileSizeTransform(MAX_REPORT_LEN);
  try {
    // We need to pipe the request to verifySize - rather than pass
    // them as individual arguments - so it doesn't close the request
    await pipeline(req.pipe(verifySize), outStream);
  } catch (err) {
    await fsp.rm(outpath, { force: true });
    if (err instanceof DataTooLargeError) {
      return res
        .writeHead(400)
        .end(
          "Bug report too large. Please reduce the size and try again.\n",
        );
    } else {
      console.warn(`Unable to store bug report: ${err}`);
      return res
        .writeHead(500)
        .end("An internal error occurred. Please try again later.");
    }
  }

  await removeExcessReports();

  return res
    .writeHead(200)
    .end();
}

/**
 * If the bug report directory has more than the max number of reports,
 * remove some. First remove automatic reports, then remove by age.
 *
 * This is currently enforced by the naming of the reports as an alphabetical
 * sort should sort them as desired.
 */
async function removeExcessReports() {
  const reports = await fsp.readdir(BUG_DIR);
  if (reports.length > MAX_REPORT_COUNT) {
    const overflowAmount = reports.length - MAX_REPORT_COUNT;
    const reportsToRemove = reports.sort()
      .slice(0, overflowAmount)
      .map((filename) => path.join(BUG_DIR, filename));

    // We will ignore errors below since a race condition could result in trying to delete
    // the same file twice. This should be fine though since it will be deleted either way
    await Promise.all(
      reportsToRemove.map((filename) => fsp.rm(filename, { force: true })),
    );
  }
}

/**
 * Create a stream transform that errors if the data passed through
 * exceeds a threshold.
 */
function verifyFileSizeTransform(maxSize) {
  let len = 0;
  return new Transform({
    transform: (chunk, _encoding, done) => {
      len += chunk.byteLength;
      if (len > maxSize) {
        return done(new DataTooLargeError());
      }
      return done(null, chunk);
    },
  });
}

class DataTooLargeError extends Error {}
