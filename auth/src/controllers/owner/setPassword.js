const Token = require("../../models/tokenModel");
const Admin = require("../../models/adminModel");
const sentense = require("../../common/en-us.json");
const ErrorHandler = require("../../helpers/errorHandler");
const { STATUS_CODE } = require("../../common/common");

const setPassword = async (req, res, next) => {
  const { token, password, _id } = req.body;
  try {
    if (!token || !password) {
      throw new ErrorHandler(
        sentense["token-invalid"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const savedToken = await Token.findOne({ userId: _id });
    console.log(savedToken);
    if (!savedToken) {
      throw new ErrorHandler(
        sentense["token-invalid"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const admin = await Admin.findOne({ _id, isUserDeleted: false }).exec();
    if (!admin) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    admin.password = password;
    await admin.save();
    await savedToken.deleteOne();
    res.status(STATUS_CODE.SUCCESS).json({
      sucess: true,
      message: "Your password has been reseted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { setPassword };
