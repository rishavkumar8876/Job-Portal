import Application from "../models/Application.js";
import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { calculateMatchScore } from "../utils/matchScore.js";

export const applyJob = async (req, res) => {
  try {
    const job = await Job.findOne({ id: req.params.jobId });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const resume = await Resume.findOne({ user_id: req.user.id });

    if (!resume) {
      return res.status(400).json({ error: "Please upload resume first" });
    }

    // ✅ prevent duplicate apply
    const existing = await Application.findOne({
      job_id: job.id,
      user_id: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    // ✅ calculate match score
    const score = calculateMatchScore(
      resume.extracted_skills,
      job.required_skills
    );

    const application = new Application({
      job_id: job.id,
      user_id: req.user.id,
      match_score: score,
    });

    await application.save();

    res.json({
      message: "Applied successfully",
      match_score: score,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};