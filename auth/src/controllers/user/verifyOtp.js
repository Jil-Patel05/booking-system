const ErrorHandler = require("../../helpers/errorHandler");
const User = require("../../models/userModel");
const OTP = require("../../models/otpModel");
const emailValidator = require("email-validator");
const sentense = require("../../common/en-us.json");
const { STATUS_CODE } = require("../../common/common");
const { sendJwtTokenToUser } = require("../../helpers/sendJwtToken");

const verifyOtp = async (req, res, next) => {
  const { otp, email } = req.body;
  try {
    if (!otp || !email) {
      throw new ErrorHandler(
        sentense["request-not-valid"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const isRealEmail = emailValidator.validate(email);
    if (!isRealEmail) {
      throw new ErrorHandler(
        sentense["not-valid-email-format"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const savedOtp = await OTP.findOne({ email }).exec();
    if (!savedOtp) {
      throw new ErrorHandler(
        sentense["request-not-valid"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (+otp !== savedOtp.otp) {
      throw new ErrorHandler(
        sentense["otp-verfication-error"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const userToSave = new User();
    userToSave.isOtpVerificationDone = true;
    userToSave.email = email;
    const savedUser = await userToSave.save();

    sendJwtTokenToUser(savedUser, res);
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyOtp };
