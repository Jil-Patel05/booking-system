const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const Owner = require("../../models/ownerModel");
const sentense = require("../../common/en-us.json");
const { ROLES } = require("../../models/enums");

const editProfileOwner = async (req, res, next) => {
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
    const ownerSavedData = await Owner.findOneAndUpdate(
      {
        _id,
        isUserDeleted: false,
      },
      adminRequest,
      {
        returnDocument: "after",
      }
    );

    if (!ownerSavedData) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }

    res.status(STATUS_CODE.SUCCESS).json({
      ownerSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { editProfileOwner };
