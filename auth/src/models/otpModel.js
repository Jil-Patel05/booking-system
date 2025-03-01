const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    validate: {
      validator: function (value) {
        return emailValidator.validate(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    trim: true,
    unique: true,
  },
  otp: {
    type: Number,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
    trim: true,
    expires: 120,
  },
});

module.exports = mongoose.model("OTP", otpSchema);
