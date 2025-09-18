// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth"); // your JWT middleware

const router = express.Router();

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({ email: req.body.email, password: hash });
  await user.save();
  res.status(201).json({ msg: "User created" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.matchPassword(req.body.password)))
    return res.status(401).json({ msg: "Invalid" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true }).json({ msg: "Logged in" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ message: "Logged out successfully" });
});

// ✅ Add this route
router.get("/me", auth, (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "Not authenticated" });
  res.json({ user: { id: req.user._id, email: req.user.email } });
});

module.exports = router;
