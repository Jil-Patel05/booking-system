const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { insetAndUpdateQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const addCinema = async (req, res, next) => {
  try {
    const cinemaReq = req.body;
    const query = "call add_cinema(?,?,?,?,?,?)";
    const params = [
      cinemaReq.userId,
      cinemaReq.cityId,
      cinemaReq.cinemaName,
      cinemaReq.cinemaLandmark,
      cinemaReq.status,
      JSON.stringify(cinemaReq.facilities),
    ];
    const result = await insetAndUpdateQuery(query, params);
    if (result) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: "Cinema added successfully",
      });
    } else {
      throw new ErrorHandler(
        sentense["cinema-not-added"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { addCinema };
