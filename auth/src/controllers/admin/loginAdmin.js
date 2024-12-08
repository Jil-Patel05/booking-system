const Admin = require("../../models/adminModel");
const emailValidator = require("email-validator");
const ErrorHandler = require("../../helpers/errorHandler");
const { sendJwtTokenToUser } = require("../../helpers/sendJwtToken");

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isRealEmail = emailValidator.validate(email);
    let user;
    if (isRealEmail) {
      user = await Admin.findOne({
        email,
      }).exec();
      if (user) {
        isPasswordCorrect = await user.comparePassword(password);
        if (isPasswordCorrect) {
          sendJwtTokenToUser(user, res);
          return;
        }
      }
    }
    throw new ErrorHandler("Credentials is wrong, please try again", 400);
  } catch (err) {
    next(err);
  }
};

module.exports = { loginAdmin };
