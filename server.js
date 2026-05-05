const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const archiver = require("archiver");
require("dotenv").config();

const app = express();
const baseDir = process.env.DIR;

app.use(express.json());
app.use("/", express.static(__dirname));
app.use("/gallery", express.static(baseDir));
const upload = multer({ dest: "temp/" });

if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

app.get("/api/files", (req, res) => {
  const target = path.join(baseDir, req.query.path || "");
  if (!fs.existsSync(target)) return res.json([]);
  const items = fs.readdirSync(target, { withFileTypes: true });
  let files = items
    .filter(
      (i) => i.isDirectory() || /\.(jpg|jpeg|png|gif|webp)$/i.test(i.name),
    )
    .map((i) => {
      let preview = null;
      if (i.isDirectory()) {
        try {
          const subPath = path.join(target, i.name);
          const subItems = fs.readdirSync(subPath, { withFileTypes: true });
          const img = subItems.find(
            (sub) =>
              !sub.isDirectory() &&
              /\.(jpg|jpeg|png|gif|webp)$/i.test(sub.name),
          );
          if (img) preview = img.name;
        } catch (err) {}
      }
      return { name: i.name, isDir: i.isDirectory(), preview };
    });

  files.sort((a, b) => {
    if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });
  res.json(files);
});

app.post("/api/upload", upload.array("files"), async (req, res) => {
  const paths = [].concat(req.body.paths || []);
  try {
    for (let i = 0; i < req.files.length; i++) {
      const f = req.files[i];
      const target = path.join(
        baseDir,
        req.query.path || "",
        paths[i] || f.originalname,
      );
      fs.mkdirSync(path.dirname(target), { recursive: true });
      await fs.promises.rename(f.path, target);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/api/mkdir", (req, res) => {
  const target = path.join(baseDir, req.body.path, req.body.name);
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  res.sendStatus(200);
});

app.get("/api/download", (req, res) => {
  const target = path.join(baseDir, req.query.path);
  if (fs.statSync(target).isDirectory()) {
    res.attachment(`${path.basename(target)}.zip`);
    const archive = archiver("zip");
    archive.pipe(res);
    archive.directory(target, false);
    archive.finalize();
  } else {
    res.download(target);
  }
});

app.post("/api/action", (req, res) => {
  const targetPath = path.join(baseDir, req.body.target);
  if (req.body.action === "delete") fs.rmSync(targetPath, { recursive: true });
  if (req.body.action === "rename")
    fs.renameSync(
      targetPath,
      path.join(path.dirname(targetPath), req.body.newName),
    );
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
