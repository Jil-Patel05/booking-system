const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { getQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const getCinema = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const query = "select * from cinema where id=? and userId=?";
    const params = [id, userId];
    const [raws, fields] = await getQuery(query, params);
    if (raws && fields) {
      res.status(STATUS_CODE.SUCCESS).json({
        responseData: raws[0],
      });
    } else {
      throw new ErrorHandler(
        sentense["can-not-get-cinema"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getCinema };
