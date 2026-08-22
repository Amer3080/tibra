import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const IMG_DIR = "public/assets/img";
const MAX_WIDTH = 1600; // أي صورة أعرض من كده هتترجع لـ 1600px بس
const JPEG_QUALITY = 75;
const PNG_QUALITY = 75;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else {
      processFile(full);
    }
  }
}

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const sizeKB = statSync(file).size / 1024;
  if (sizeKB < 300) return; // تجاهل الصور الصغيرة أصلاً

  try {
    const img = sharp(file);
    const meta = await img.metadata();
    let pipeline = img;

    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH });
    }

    if (ext === ".png") {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }

    const buffer = await pipeline.toBuffer();
    const newSizeKB = buffer.length / 1024;

    if (newSizeKB < sizeKB) {
      await sharp(buffer).toFile(file + ".tmp");
      const { renameSync } = await import("fs");
      renameSync(file + ".tmp", file);
      console.log(
        `✔ ${file}: ${sizeKB.toFixed(0)}KB -> ${newSizeKB.toFixed(0)}KB`,
      );
    }
  } catch (e) {
    console.error(`✘ ${file}: ${e.message}`);
  }
}

walk(IMG_DIR);
