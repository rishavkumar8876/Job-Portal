import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  title: String,
  company: String,
  location: String,
  salary: String,
  job_type: String,
  description: String,
  required_skills: [String],
  recruiter_id: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Job", schema);