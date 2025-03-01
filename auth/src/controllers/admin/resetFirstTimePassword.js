const { isUserExitsByEmail } = require("../../helpers/checkUserByEmail");
const ErrorHandler = require("../../helpers/errorHandler");
const Admin = require("../../models/adminModel");
const sentense = require("../../common/en-us.json");
const { STATUS_CODE } = require("../../common/common");

const resetFirstAdminPassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await isUserExitsByEmail(email, Admin, next);
    if (user && user.isFirstTimeLoggedIn) {
      const isPasswordMatch = await user.comparePassword(oldPassword);
      if (isPasswordMatch) {
        user.isFirstTimeLoggedIn = false;
        user.password = newPassword;
        const adminSavedData = await user.save();
        res.status(STATUS_CODE.SUCCESS).json({
          adminSavedData,
        });
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

module.exports = { resetFirstAdminPassword };
