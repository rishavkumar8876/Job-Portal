import express from "express";
import { createJob, getJobs, getJobById } from "../controllers/jobController.js";
import { applyJob } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);

// ✅ ADD THESE
router.get("/:jobId", getJobById);
router.post("/:jobId/apply", authMiddleware, applyJob);

export default router;