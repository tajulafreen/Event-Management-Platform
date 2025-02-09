const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Music", "Sports", "Tech", "Business", "Education", "Other"], // ✅ Predefined categories
    required: true,
  },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", eventSchema);
