const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    title: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    content: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    cover: {
      type: String,
      required: false,
    },
    readTime: {
      value: { Type: Number },
      unit: { Type: String },
    },
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("BlogPost", blogPostSchema, "blogPosts");
