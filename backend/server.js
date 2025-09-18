const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const leadRoutes = require("./routes/leads");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://lead-management-system-virid.vercel.app/", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Test root route
app.get("/", (req, res) => {
  res.json({ message: "Erino Leads API is working 🚀" });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });


