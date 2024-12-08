const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const ownerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: [2, "firstName must have atleast 2 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      min: [2, "lastName must have atleast 2 characters"],
      trim: true,
    },
    username: {
      type: String,
      require: true,
      min: [5, "username must have atleast 5 characters"],
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
    },
    password: {
      type: String,
      require: true,
      min: [8, "Password must have atleast 8 characters"],
      trim: true,
    },
    countryCode: {
      type: Number,
      require: true,
      cast: "{VALUE} is not a number",
      trim: true,
    },
    mobile: {
      type: Number,
      require: true,
      cast: "{VALUE} is not a number",
      trim: true,
    },
    isFirstTimeLoggedIn: {
      type: Boolean,
      require: true,
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
    address: {
      country: {
        type: String,
        require: true,
        trim: true,
      },
      state: {
        type: String,
        require: true,
        trim: true,
      },
      city: {
        type: String,
        require: true,
        trim: true,
      },
      street: {
        type: String,
        require: true,
        trim: true,
      },
      pincode: {
        type: Number,
        require: true,
        cast: "{VALUE} is not a number",
        trim: true,
      },
    },
    imageURL: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
