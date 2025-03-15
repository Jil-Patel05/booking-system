const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const { insetAndUpdateQuery } = require("../../helpers/mysqlQuery");
const sentense = require("../../common/en-US.json");

const editCity = async (req, res, next) => {
  try {
    const cityEditReq = req.body;
    const query =
      "update city set city=?,state=?,country=? where id=? and userId=?";
    const params = [
      cityEditReq.city,
      cityEditReq.state,
      cityEditReq.country,
      cityEditReq.id,
      cityEditReq.userId,
    ];
    const result = await insetAndUpdateQuery(query, params);
    if (result) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: "City is updated successfully",
      });
    } else {
      throw new ErrorHandler(
        sentense["city-not-updated"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { editCity };
