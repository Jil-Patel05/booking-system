const { isUserExitsByEmail } = require("../../helpers/checkUserByEmail");
const ErrorHandler = require("../../helpers/errorHandler");
const Owner = require("../../models/ownerModel");
const sentense = require("../../common/en-us.json");
const { STATUS_CODE } = require("../../common/common");

const resetFirstOwnerPassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await isUserExitsByEmail(email, Owner, next);
    if (user && user.isFirstTimeLoggedIn) {
      const isPasswordMatch = await user.comparePassword(oldPassword);
      if (isPasswordMatch) {
        user.isFirstTimeLoggedIn = false;
        user.password = newPassword;
        const ownerSavedData = await user.save();
        res.status(STATUS_CODE.SUCCESS).json({
          ownerSavedData,
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

module.exports = { resetFirstOwnerPassword };
