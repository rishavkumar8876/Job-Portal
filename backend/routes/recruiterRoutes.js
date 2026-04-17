import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyJobs, getStats } from "../controllers/recruiterController.js";

const router = express.Router();

router.get("/my-jobs", authMiddleware, getMyJobs);
router.get("/stats", authMiddleware, getStats);

export default router;