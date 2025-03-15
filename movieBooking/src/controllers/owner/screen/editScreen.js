const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { insetAndUpdateQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const editScreen = async (req, res, next) => {
  try {
    const screenReq = req.body;
    const query = "Call add_screen(?,?,?,?,?)";
    const params = [
      screenReq.id,
      screenReq.cinemaId,
      req.userId,
      screenReq.screenName,
      screenReq.noOfRows,
      screenReq.noOfSeats,
    ];
    const [row] = await insetAndUpdateQuery(query, params);
    if (row[0][0].statusMessage) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: "Screen updated successfully",
      });
    } else {
      throw new ErrorHandler(
        sentense["can-not-get-screen"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { editScreen };
