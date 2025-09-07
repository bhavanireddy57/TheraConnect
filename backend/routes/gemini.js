/*import express from "express";
import { chatWithGemini } from "../controller/gemini-controller.js";

const router = express.Router();

router.post("/", chatWithGemini); // ✅ this line

export default router;*/


import express from "express";
import { chatWithGemini } from "../controller/gemini-controller.js";
import { authenticateJWT } from "../controller/authMiddleware.js";

const router = express.Router();

// ✅ Secure route
router.post("/", authenticateJWT, chatWithGemini);

export default router;
