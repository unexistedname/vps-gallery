import e from "express";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import cors from "cors";

dotenv.config();
const app = e();
const PORT = process.env.PORT;
const DIR = process.env.DIR;
app.use(cors());
app.use(e.json());

app.get("/dir", async (req, res) => {
  try {
    const contents = await fs.readdir(DIR, { withFileTypes:true });

    const files = contents.map((f) => {
        return {
            title: f.name,
            isFolder: f.isDirectory()
        }
    })
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to read directory" });
  }
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
