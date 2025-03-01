const Owner = require("../../models/ownerModel");
const emailValidator = require("email-validator");
const ErrorHandler = require("../../helpers/errorHandler");
const { sendJwtTokenToUser } = require("../../helpers/sendJwtToken");
const { isUserExitsByEmail } = require("../../helpers/checkUserByEmail");
const { STATUS_CODE } = require("../../common/common");
const sentense = require("../../common/en-us.json");

const loginOwner = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isRealEmail = emailValidator.validate(email);
    let user;
    if (isRealEmail) {
      user = await isUserExitsByEmail(email, Owner, next);
      if (user) {
        const isPasswordCorrect = await user.comparePassword(password);
        if (isPasswordCorrect) {
          sendJwtTokenToUser(user, res);
          return;
        }
      }
    }
    throw new ErrorHandler(
      sentense["wrong-creds"],
      STATUS_CODE.CLIENT_BAD_REQUEST
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { loginOwner };
