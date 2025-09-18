// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hash });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.matchPassword(req.body.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       // cookie only over HTTPS
      sameSite: "None",   // allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ msg: "Logged in" });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
});


router.get("/me", auth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }
  res.json({ user: { id: req.user._id, email: req.user.email } });
});

module.exports = router;

