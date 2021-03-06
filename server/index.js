#! /usr/bin/env node
const path = require("path");
const fs = require("fs");
const express = require("express");
const { exec } = require("child_process");
const contentRoutes = require("./content-routes");
const bodyParser = require("body-parser");

let [, , rootFolder] = process.argv;
rootFolder = rootFolder
  ? path.resolve(process.cwd(), rootFolder)
  : path.resolve(process.cwd());

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/content", contentRoutes(rootFolder));

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "..", "build")));
}

const assetsFolder = path.join(rootFolder, "_assets");
if (fs.existsSync(assetsFolder)) {
  app.use(express.static(assetsFolder));
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(4200, () => {
  console.log(`

  🛠  Timesplitter Dev
  http://localhost:4200

  `);

  if (process.env.NODE_ENV !== "development") {
    exec("open http://localhost:4200");
  }
});
