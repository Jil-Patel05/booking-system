const Owner = require("../../models/ownerModel");
const Token = require("../../models/tokenModel");
const sentense = require("../../common/en-us.json");
const ErrorHandler = require("../../helpers/errorHandler");
const { STATUS_CODE } = require("../../common/common");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const owner = await Owner.findOne({ email, isUserDeleted: false });
    if (!owner) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const token = await Token.findOne({ email });
    if (token) {
      await token.deleteOne();
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(resetToken, 10);

    const tokenUrl = `${req.protocol}://${req.get(
      "host"
    )}/resetpassword?token=${tokenHash}&id=${owner._id}`;

    const emailTemplate = `
    <p> You're receiving this e-mail because you or someone else has requested a password reset for your user account at.
    <br/>
    <br/>
    Click the link below to reset your password:
    ${tokenUrl}
    <br/>
    <br/>
    It will be expired in <b>1 hr</b>
    `;

    const savedToken = new Token({
      userId: owner._id,
      token: tokenHash,
    });
    savedToken.save();

    const key = 1;
    const message = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Reset password",
      html: emailTemplate,
    };

    produceMessage(
      TOPICS.SIMPLE_NOTIFICATION,
      NUMBER_OF_PARTITION,
      key,
      message
    );

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Email is sent, please procees with that",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { resetPassword };
