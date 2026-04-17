import express from "express";
import { uploadResume, getMySkills } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authMiddleware, upload.single("file"), uploadResume);

// ✅ ADD THIS
router.get("/my-skills", authMiddleware, getMySkills);

export default router;