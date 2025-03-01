const ErrorHandler = require("../../helpers/errorHandler");
const User = require("../../models/userModel");
const OTP = require("../../models/otpModel");
const emailValidator = require("email-validator");
const sentense = require("../../common/en-us.json");
const { STATUS_CODE, TOPICS, EMAIL_SUBJECTS } = require("../../common/common");
const { produceMessage } = require("../../kafka/kafka");
const NUMBER_OF_PARTITION = 1;

const sendOtp = async (req, res, next) => {
  const userRequest = req.body;
  try {
    if (userRequest.isOtpVerificationDone) {
      throw new ErrorHandler(
        sentense["otp-verfication-error"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const isRealEmail = emailValidator.validate(userRequest.email);
    if (!isRealEmail) {
      throw new ErrorHandler(
        sentense["not-valid-email-format"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const user = await User.findOne({
      email: userRequest.email,
      isUserDeleted: false,
    });
    console.log(user);
    if (user) {
      console.log("insde hsss");
      throw new ErrorHandler(
        sentense["email-exists"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const savedOtp = await OTP.findOne({ email: userRequest.email });
    if (savedOtp) {
      await savedOtp.deleteOne();
    }

    const otp = User.generateOTP();
    const emailTemplate = `<p>
    Please use this otp: <b>${otp}</b>,<br/>
    to continue on booking.<br/><br/>
    This otp is valid for only <b>2 min</b>.
    </p>
    `;

    const otpInfo = {
      email: userRequest.email,
      otp,
    };

    const otpToSave = new OTP(otpInfo);
    await otpToSave.save();

    // sent Email of OTP to user using kafka

    const key = 1;
    const message = {
      from: process.env.EMAIL_USERNAME,
      to: userRequest.email,
      subject: EMAIL_SUBJECTS.OTP,
      html: emailTemplate,
    };

    produceMessage(
      TOPICS.URGENT_NOTIFICATION,
      NUMBER_OF_PARTITION,
      key,
      message
    );

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "OTP has been sent to requested email address",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendOtp };
