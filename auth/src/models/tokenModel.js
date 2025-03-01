const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    trim: true,
  },
  token: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
    trim: true,
    expires: 3600,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
