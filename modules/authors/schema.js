const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    surname: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: false,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("Author", authorSchema, "authors");
