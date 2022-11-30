// start a static file server w/ an extra route for index.html
import {fileURLToPath} from 'url';
import fs from "fs";
import http from "http";
import nodeStatic from "node-static";
import fetch from "node-fetch";
import dot from "dot";
import path from "path";
const port = process.env.PORT ? +process.env.PORT : 8000;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const indexTpl = dot.template(
  fs.readFileSync(path.join(__dirname, "..", "index.dot"))
);

const { CLOUD_URL = "https://cloud.netsblox.org", ENV = "dev" } = process.env;
const isDevMode = ENV !== "production";

const file = new nodeStatic.Server(path.join(__dirname, ".."));
const server = http.createServer(async (req, res) => {
  const [url, queryString=''] = req.url
    .split("?")
    .map(url => url.replace(/#.*$/, ""));
  const isIndexHtml = url === "/" || url === "/index.html";
  console.log(req.url);
  if (isIndexHtml) {
    // dynamically generate the index.html file
    const query = Object.fromEntries(
      queryString.split("&").map(chunk => {
        const [key, value] = chunk.split("=");
        return [key.toLowerCase(), decodeURIComponent(value)];
      })
    );
    const metaInfo = {
      title: "NetsBlox",
      description: "Add project notes here...",
      cloud: CLOUD_URL,
      isDevMode
    };

    if (query.action === "present") {
      const url =
        CLOUD_URL + `/projects/user/${query.owner}/${query.name}/metadata`;
      const response = await fetch(url);
      if (response.status < 399) {
        const metadata = await response.json();
        // TODO: parse the notes? These should probably be saved separately
        metaInfo.title = metadata.name;
        metaInfo.image = {
          url: CLOUD_URL + `/projects/id/${metadata.id}/thumbnail`,
          width: 640,
          height: 480
        };
      }
    } else if (query.action === "example") {
      // TODO: add nice thumbnails for this, too
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

function addScraperSettings(userAgent, metaInfo) {
  // fix the aspect ratio for facebook
  if (userAgent.includes("facebookexternalhit") || userAgent === "Facebot") {
    metaInfo.image.url += "?aspectRatio=1.91";
  }
}
