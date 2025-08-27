/*import express from "express";
import { getAnonymousPosts, createAnonymousPost } from "../controller/anonymous-controller.js";
import { authenticateJWT } from "../controller/authMiddleware.js";

const router = express.Router();

// public route - fetch all anonymous posts
router.get("/all", getAnonymousPosts);

// protected route - create anonymous post
router.post("/create", authenticateJWT, createAnonymousPost);

export default router;*/



import express from "express";
import { getAnonymousPosts, createAnonymousPost } from "../controller/anonymous-controller.js";
import { authenticateJWT } from "../controller/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/all", getAnonymousPosts);

// Protected route
router.post("/create", authenticateJWT, createAnonymousPost);

export default router;

