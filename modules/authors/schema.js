const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    password: {
      type: String,
      required: true,
      select: false,
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
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
        default: [],
      },
    ],
  },
  { timestamps: true, strict: true },
);
// criptaggio password 
authorSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (e) {
    next(e);
    throw e;
  }
});

module.exports = mongoose.model("Author", authorSchema, "authors");
