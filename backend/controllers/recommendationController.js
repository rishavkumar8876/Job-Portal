import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { calculateMatchScore } from "../utils/matchScore.js";

export const getRecommendations = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user_id: req.user.id });

    if (!resume) return res.json([]);

    const jobs = await Job.find();

    const recommendations = jobs.map((job) => {
      const matchScore = calculateMatchScore(
        resume.extracted_skills,
        job.required_skills
      );

      return {
        ...job._doc,
        matchScore: matchScore,
      };
    }).filter(job => job.matchScore >= 40);

    // sort highest match first
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    res.json(recommendations);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};