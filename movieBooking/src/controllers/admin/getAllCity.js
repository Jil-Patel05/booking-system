const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const { getQuery } = require("../../helpers/mysqlQuery");
const sentense = require("../../common/en-US.json");

const getAllCity = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const query = "select city,state,country from city where userId=?";
    const params = [userId];
    const [raws, fields] = await getQuery(query, params);
    if (raws && fields) {
      res.status(STATUS_CODE.SUCCESS).json({
        responseData: raws,
      });
    } else {
      throw new ErrorHandler(
        sentense["can-not-get-cities"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCity };
