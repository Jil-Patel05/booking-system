const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: [2, "firstName must have atleast 2 characters"],
      default: "Guest",
      trim: true,
    },
    lastname: {
      type: String,
      min: [2, "lastName must have atleast 2 characters"],
      trim: true,
    },
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
    countryCode: {
      type: Number,
      cast: "{VALUE} is not a number",
      trim: true,
    },
    mobile: {
      type: Number,
      cast: "{VALUE} is not a number",
      trim: true,
    },
    role: {
      type: String,
      require: true,
      enum: {
        values: ["masterAdmin", "admin", "owner", "user"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    isOtpVerificationDone: {
      type: Boolean,
      require: true,
      default: false,
    },
    isUserDeleted: {
      type: Boolean,
      require: true,
      default: false,
    },
    address: {
      country: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      pincode: {
        type: Number,
        cast: "{VALUE} is not a number",
        trim: true,
        exact: 6,
      },
    },
    imageURL: {
      type: String,
      trim: true,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
  },
  { timestamps: true }
);

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastname,
      role: this.role,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

userSchema.statics.generateOTP = function () {
  const otpSting = "1234567890";
  const otpLength = 6;
  let generatedOTP = "";
  for (let ind = 0; ind < otpLength; ind++) {
    const char = otpSting[Math.floor(Math.random() * 9)];
    generatedOTP += char;
  }
  return generatedOTP;
};

module.exports = mongoose.model("User", userSchema);
