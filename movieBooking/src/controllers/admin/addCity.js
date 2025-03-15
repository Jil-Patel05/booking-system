const { STATUS_CODE } = require("../../common/common");
const { insetAndUpdateQuery } = require("../../helpers/mysqlQuery");
const ErrorHandler = require("../../helpers/errorHandler");
const sentense = require("../../common/en-US.json")

const addCity = async (req, res, next) => {
  try {
    const cityReq = req.body;
    const query = "insert into city(userId,city,state,country) values(?,?,?,?)";
    const params = [req.userId, cityReq.city, cityReq.state, cityReq.country];
    const result = await insetAndUpdateQuery(query, params);
    if (result) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: "City is inserted successfully",
      });
    }
    else {
      throw new ErrorHandler(
        sentense["city-not-inserted"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { addCity };
