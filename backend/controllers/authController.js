import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashed, name, role });
  await user.save();

  const token = jwt.sign(
    { user_id: user.id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { user_id: user.id, email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
};

export const getMe = (req, res) => {
  res.json(req.user);
};