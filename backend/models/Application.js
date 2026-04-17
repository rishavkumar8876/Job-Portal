import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  job_id: String,
  user_id: String,
  match_score: Number,
  status: { type: String, default: "pending" },
  applied_at: { type: Date, default: Date.now }
});

export default mongoose.model("Application", schema);