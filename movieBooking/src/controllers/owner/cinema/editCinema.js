const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { insetAndUpdateQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const editCinema = async (req, res, next) => {
  try {
    const cinemaReq = req.body;
    if (cinemaReq.noOfScreen) {
      throw new ErrorHandler(
        sentense["not-authorized-to-change-no-of-screen"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const query = "call edit_cinema(?,?,?,?,?,?,?)";
    const params = [
      cinemaReq.cinemaId,
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
        message: "Cinema updated successfully",
      });
    } else {
      throw new ErrorHandler(
        sentense["cinema-not-updated"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { editCinema };
