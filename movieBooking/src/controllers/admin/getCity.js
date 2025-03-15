const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const { getQuery } = require("../../helpers/mysqlQuery");
const sentense = require("../../common/en-US.json");

const getCity = async (req, res, next) => {
  try {
    const { cityId, userId } = req.params;
    const query = "select city,state,country from city where id=? and userId=?";
    const params = [cityId, userId];
    const [raws, fields] = await getQuery(query, params);
    if (raws && fields) {
      res.status(STATUS_CODE.SUCCESS).json({
        responseData: raws[0],
      });
    } else {
      throw new ErrorHandler(
        sentense["can-not-get-city"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getCity };
