const ErrorHandler = require("../../helpers/errorHandler");
const Admin = require("../../models/adminModel");
const { STATUS_CODE } = require("../../common/common");
const sentense = require("../../common/en-us.json");

const getSingleAdmin = async (req, res, next) => {
  const requestedAdminId = req.params.id;
  try {
    const admin = await Admin.findById(requestedAdminId).exec();
    if (!admin) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (admin && admin.isUserDeleted) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    res.status(STATUS_CODE.SUCCESS).json({
      admin,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSingleAdmin };
