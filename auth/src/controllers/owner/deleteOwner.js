const ErrorHandler = require("../../helpers/errorHandler");
const Owner = require("../../models/ownerModel");
const { STATUS_CODE } = require("../../common/common");
const sentense = require("../../common/en-us.json");

const deleteOwner = async (req, res, next) => {
  const requestedOwnerId = req.params.id;
  console.log(requestedOwnerId);
  try {
    const owner = await Owner.findById(requestedOwnerId).exec();
    if (!owner || (owner && owner.isUserDeleted === true)) {
      throw new ErrorHandler(
        sentense["wrong-creds"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const ownerSavedData = await Owner.findByIdAndUpdate(
      requestedOwnerId,
      { isUserDeleted: true },
      {
        returnDocument: "after",
      }
    );
    res.status(STATUS_CODE.SUCCESS).json({
      ownerSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { deleteOwner };
