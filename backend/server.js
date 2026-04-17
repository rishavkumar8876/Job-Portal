import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";




dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});