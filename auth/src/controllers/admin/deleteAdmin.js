const ErrorHandler = require("../../helpers/errorHandler");
const Admin = require("../../models/adminModel");
const { STATUS_CODE } = require("../../common/common");
const sentense = require("../../common/en-us.json");

const deleteAdmin = async (req, res, next) => {
  const requestedAdminId = req.params.id;
  try {
    const admin = await Admin.findById(requestedAdminId).exec();
    if (!admin || (admin && admin.isUserDeleted === true)) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const adminSavedData = await Admin.findByIdAndUpdate(
      requestedAdminId,
      { isUserDeleted: true },
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

module.exports = { deleteAdmin };
