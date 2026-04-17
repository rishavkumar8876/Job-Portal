import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { applyJob } from "../controllers/applicationController.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

const router = express.Router();

// ✅ Apply to job
router.post("/:jobId/apply", authMiddleware, applyJob);

// ✅ Get my applications
router.get("/my-applications", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      user_id: req.user.id,
    });

    const jobs = await Job.find();

    const result = applications.map(app => {
      const job = jobs.find(j => j.id === app.job_id);

      return {
        ...app._doc,
        job: job || null, // ✅ IMPORTANT
      };
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;