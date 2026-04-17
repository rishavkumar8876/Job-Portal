import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  user_id: String,
  file_name: String,
  extracted_text: String,
  extracted_skills: [String],
  uploaded_at: { type: Date, default: Date.now }
});

export default mongoose.model("Resume", schema);