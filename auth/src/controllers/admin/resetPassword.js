const { isEmailExist } = require("../../helpers/emailExits");
const ErrorHandler = require("../../helpers/errorHandler");
const Admin = require("../../models/adminModel");
const sentense = require("../../common/en-us.json");
const { STATUS_CODE } = require("../../common/statusCode");

const resetAdminPassword = async (req, res, next) => {
  const { email, newPassword, _id } = req.body;
  try {
    const isUserExist = await isEmailExist(email, Admin, next);
    if (!isUserExist) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    // sent email and after that perform this step
    const adminSavedData = await Admin.findByIdAndUpdate(
      _id,
      { newPassword },
      {
        returnDocument: "after",
      }
    );
    res.status(STATUS_CODE.SUCCESS).json({
      adminSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { resetAdminPassword };
