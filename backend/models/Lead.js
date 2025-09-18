const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  phone: String,
  company: String,
  city: String,
  state: String,
  source: String,
  status: String,
  score: Number,
  lead_value: Number,
  is_qualified: Boolean,
  last_activity_at: Date
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);
