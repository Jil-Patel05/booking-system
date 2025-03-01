const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const User = require("../../models/userModel");
const sentense = require("../../common/en-us.json");

const editProfile = async (req, res, next) => {
  const adminRequest = req.body;
  const { email, role, isOtpVerificationDone, _id } = req.body;
  try {
    if (email) {
      throw new ErrorHandler(
        sentense["email-not-allowed"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (role || isOtpVerificationDone === false) {
      throw new ErrorHandler(
        sentense["unathorized"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const userSavedData = await User.findOneAndUpdate(
      {
        _id,
        isUserDeleted: false,
      },
      adminRequest,
      {
        returnDocument: "after",
      }
    );

    if (!userSavedData) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }

    res.status(STATUS_CODE.SUCCESS).json({
      userSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { editProfile };
