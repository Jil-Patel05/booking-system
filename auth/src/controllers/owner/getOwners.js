const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const sentense = require("../../common/en-us.json");
const Owner = require("../../models/ownerModel");
const { PAGE_SIZE } = require("../../common/common");

const getOwners = async (req, res, next) => {
  const { page, limit, createdBy } = req.query;
  try {
    if (!page || !limit) {
      throw new ErrorHandler(
        sentense["not-enough-info"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const query = {
      isUserDeleted: false,
    };
    if (createdBy) {
      query.createdBy = createdBy;
    }
    const owners = await Owner.find(query)
      .skip(PAGE_SIZE * (page - 1))
      .limit(limit)
      .exec();
    res.status(STATUS_CODE.SUCCESS).json({
      owners,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOwners };
