// backend/routes/drawings.js
import express from "express";
import fs from "fs";
import path from "path";
import Drawing from "../models/Drawing.js";
// import your auth middleware if you have it:
import { authenticateJWT } from "../controller/authMiddleware.js"; // adjust path

const router = express.Router();

// Ensure uploads folder exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "drawings");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// POST save drawing
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { image, caption } = req.body;
    if (!image) return res.status(400).json({ msg: "No image provided" });

    // image is data:image/png;base64,AAAA...
    const matches = image.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!matches) return res.status(400).json({ msg: "Invalid image data" });

    const ext = matches[1].split("/")[1] || "png";
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    const filename = `drawing_${req.user ? req.user.id : "anon"}_${Date.now()}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filepath, buffer);

    const newDrawing = new Drawing({
      userId: req.user ? req.user.id : undefined,
      filename,
      caption,
    });
    await newDrawing.save();

    return res.json({ msg: "Saved", drawing: newDrawing });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// GET list of drawings (user-specific)
router.get("/", authenticateJWT, async (req, res) => {
  try {
    // return only drawings of this user
    const drawings = await Drawing.find({ userId: req.user.id }).sort({ createdAt: -1 });
    // include direct url to access image
    const host = req.get("host");
    const protocol = req.protocol;
    const drawingsWithUrl = drawings.map((d) => ({
      _id: d._id,
      caption: d.caption,
      createdAt: d.createdAt,
      url: `${protocol}://${host}/uploads/drawings/${d.filename}`,
    }));
    res.json(drawingsWithUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
