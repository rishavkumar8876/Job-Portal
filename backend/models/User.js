import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  email: String,
  password: String,
  name: String,
  role: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("User", schema);