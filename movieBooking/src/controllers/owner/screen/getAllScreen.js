const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { getQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const prepareData = (rowData) => {
  let dataToReturn = [];
  const mapping = {};
  let index = 0;
  rowData.forEach((data) => {
    const obj = {
      screenId: data.screenId,
      screenName: data.screenName,
      noOfRows: data.noOfRows,
      noOfSeats: data.noOfSeats,
      statusId: data.statusId,
    };
    if (mapping[data.screenId]) {
      dataToReturn[mapping[data.screenId] - 1].rowsInfo.push({
        rowId: data.rowId,
        rowName: data.rowName,
        noOfRowSeat: data.noOfRowSeat,
        rowType: data.rowType,
        statusId: data.statusId,
        seatStartFrom: data.seatStartFrom,
        seatEndTo: data.seatEndTo,
      });
    } else {
      dataToReturn[index] = obj;
      dataToReturn[index].rowsInfo = [
        {
          rowId: data.rowId,
          rowName: data.rowName,
          noOfRowSeat: data.noOfRowSeat,
          rowType: data.rowType,
          statusId: data.statusId,
          seatStartFrom: data.seatStartFrom,
          seatEndTo: data.seatEndTo,
        },
      ];
      index++;
      mapping[data.screenId] = index;
    }
  });
  return dataToReturn;
};

const getAllScreen = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { cinemaId } = req.body;
    const query = "call get_allScreen(?,?)";
    const params = [cinemaId, userId];
    const [rows] = await getQuery(query, params);
    if (rows && rows[0][0].isUserValid) {
      const rowData = rows[1];
      const dataToReturn = prepareData(rowData);
      res.status(STATUS_CODE.SUCCESS).json({
        responseData: dataToReturn,
      });
    } else {
      throw new ErrorHandler(
        sentense["can-not-get-cinemas"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllScreen };
