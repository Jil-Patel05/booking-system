const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
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
      unique: true,
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
    password: {
      type: String,
      require: true,
      min: [4, "Password must have atleast 8 characters"],
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
    isUserDeleted: {
      type: Boolean,
      require: true,
      default: false,
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
        exact: 6,
      },
    },
    imageURL: {
      type: String,
      trim: true,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// generate Hash password
adminSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// generate random password
adminSchema.methods.generateRandomPassword = function () {
  const randomPasswordString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";
  const minPasswordLength = 8;
  let generatePassword = "";
  for (let ind = 0; ind < minPasswordLength; ind++) {
    const char = randomPasswordString[Math.floor(Math.random() * 63)];
    generatePassword += char;
  }
  this.password = generatePassword;
  return generatePassword;
};

// JWT TOKEN
adminSchema.methods.getJWTToken = function () {
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

// Compare Password
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
