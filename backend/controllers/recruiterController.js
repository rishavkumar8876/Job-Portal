import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ recruiter_id: req.user.id });
  res.json(jobs);
};

export const getStats = async (req, res) => {
  const jobs = await Job.find({ recruiter_id: req.user.id });

  const jobIds = jobs.map(j => j.id);

  const apps = await Application.countDocuments({
    job_id: { $in: jobIds }
  });

  res.json({
    total_jobs: jobs.length,
    total_applications: apps
  });
};