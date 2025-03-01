const ErrorHandler = require("../../helpers/errorHandler");
const Owner = require("../../models/ownerModel");
const { STATUS_CODE } = require("../../common/common");
const sentense = require("../../common/en-us.json");

const getSingleOwner = async (req, res, next) => {
  const requestedOwnerId = req.params.id;
  try {
    const owner = await Owner.findById(requestedOwnerId).exec();
    if (!owner) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    if (owner && owner.isUserDeleted) {
      throw new ErrorHandler(
        sentense["user-deleted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    res.status(STATUS_CODE.SUCCESS).json({
      owner,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSingleOwner };
