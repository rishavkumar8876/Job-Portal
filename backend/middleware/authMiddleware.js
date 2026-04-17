import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ id: decoded.user_id });
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;