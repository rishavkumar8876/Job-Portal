import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  if (req.user.role !== "recruiter")
    return res.status(403).json({ error: "Only recruiters allowed" });

  const job = new Job({
    ...req.body,
    recruiter_id: req.user.id
  });

  await job.save();
  res.json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ created_at: -1 });
  res.json(jobs);
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ id: req.params.jobId });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};