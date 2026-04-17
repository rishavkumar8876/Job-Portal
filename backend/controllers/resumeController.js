import "dotenv/config";  // MUST be first line
import Resume from "../models/Resume.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const uploadResume = async (req, res) => {
  try {
    let skills = [];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: [
          `Extract ONLY technical skills (programming languages, frameworks, tools) from this resume. Return STRICT JSON array only. Example: ["Java", "React", "Node.js"].`,
          {
            inlineData: {
              data: req.file.buffer.toString("base64"),
              mimeType: "application/pdf"
            }
          }
        ]
      });

      let aiText = response.text;
      
      // ✅ clean AI response
      aiText = aiText.replace(/```json|```/g, "").trim();
      
      skills = JSON.parse(aiText);
    } catch (error) {
      console.log("AI parsing failed, using fallback", error.message);
      
      // fallback (basic) - Note: raw Buffer string is gibberish for pdfs
      skills = ["Fallback", "Parsing", "Failed"];
    }

    // remove old resume
    await Resume.deleteMany({ user_id: req.user.id });

    // save new resume
    const resume = new Resume({
      user_id: req.user.id,
      file_name: req.file.originalname,
      extracted_text: "Parsed directly by Gemini 2.5 PDF Multimodal",
      extracted_skills: skills,
    });

    await resume.save();

    res.json(resume);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET SKILLS (NO CHANGE)
export const getMySkills = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user_id: req.user.id });

    if (!resume) {
      return res.json([]);
    }

    res.json(resume.extracted_skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};