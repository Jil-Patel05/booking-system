const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const sentense = require("../../common/en-us.json");
const { ROLES } = require("../../models/enums");
const Admin = require("../../models/adminModel");
const { PAGE_SIZE } = require("../../common/common");

const getUsers = async (req, res, next) => {
  const { page, limit, createdBy } = req.query;
  try {
    if (!page || !limit) {
      throw new ErrorHandler(
        sentense["not-enough-info"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const query = {
      role: ROLES.ADMIN,
      isUserDeleted: false,
    };
    if (createdBy) {
      query.createdBy = createdBy;
    }
    const admins = await Admin.find(query)
      .skip(PAGE_SIZE * (page - 1))
      .limit(limit)
      .exec();
    res.status(STATUS_CODE.SUCCESS).json({
      admins,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers };
