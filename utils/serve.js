// start a static file server w/ an extra route for index.html
import { fileURLToPath } from "url";
import fs from "fs";
import fsp from "fs/promises";
import http from "http";
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

const { CLOUD_URL = "https://cloud.netsblox.org", ENV = "dev" } = process.env;
const isDevMode = ENV !== "production";
writeCloudFile(CLOUD_URL);

const file = new nodeStatic.Server(path.join(__dirname, ".."));
const getExampleThumbnail = cached(async function (cloudUrl, name) {
  console.log("getting thumbnail url for", name);
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
      const url = cloudUrl +
        `/projects/user/${query.Username}/${query.ProjectName}/metadata`;
      const response = await fetch(url);
      if (response.ok) {
        const metadata = await response.json();
        // TODO: parse the notes? These should probably be saved separately
        metaInfo.title = metadata.name;
        metaInfo.image = {
          url: cloudUrl + `/projects/id/${metadata.id}/thumbnail`,
          width: 640,
          height: 480,
        };
      }
    } else if (query.action === "example" && query.ProjectName) {
      metaInfo.image = {
        url: await getExampleThumbnail(cloudUrl, query.ProjectName),
        width: 640,
        height: 480,
      };
    }

    const userAgent = req.headers["user-agent"];
    if (userAgent) {
      addScraperSettings(userAgent, metaInfo);
    }
    res.writeHead(200);
    res.end(indexTpl(metaInfo));
  } else {
    file.serve(req, res);
  }
});
server.listen(port);
console.log("listening on port", port);

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
