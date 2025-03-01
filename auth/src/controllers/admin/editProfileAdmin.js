const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const Admin = require("../../models/adminModel");
const sentense = require("../../common/en-us.json");
const { ROLES } = require("../../models/enums");

const editProfileAdmin = async (req, res, next) => {
  const adminRequest = req.body;

  try {
    const { email, password, role, createdBy, _id } = req.body;
    if (email) {
      throw new ErrorHandler(
        sentense["email-not-allowed"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (password) {
      throw new ErrorHandler(
        sentense["password-not-allowed"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (role || createdBy) {
      throw new ErrorHandler(
        sentense["unathorized"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const adminSavedData = await Admin.findOneAndUpdate(
      {
        _id,
        isUserDeleted: false,
      },
      adminRequest,
      {
        returnDocument: "after",
      }
    );

    if (!adminSavedData) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }

    res.status(STATUS_CODE.SUCCESS).json({
      adminSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { editProfileAdmin };
