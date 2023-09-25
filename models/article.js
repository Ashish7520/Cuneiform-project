const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Education", "Businessmen", "Positions"],
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
