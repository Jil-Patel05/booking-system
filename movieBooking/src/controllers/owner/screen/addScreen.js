const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const sentense = require("../../../common/en-US.json");
const { pool } = require("../../../config/mysqlDbConnection");

const calculateScreenIds = (screenReq, firstInsertedId) => {
  let id = firstInsertedId;
  const rowInfo = [];
  screenReq.screens.forEach((screen) => {
    screen.rowsInfo.forEach((row) => {
      const rowData = {
        screenId: id,
        rowName: row.rowName,
        noOfRowSeat: row.noOfRowSeat,
        rowType: row.rowType,
        statusId: row.statusId,
        seatStartFrom: row.seatStartFrom,
        seatEndTo: row.seatEndTo,
      };
      rowInfo.push(rowData);
    });
    id++;
  });
  return rowInfo;
};

const calculateRowIds = (
  screenReq,
  cinemaId,
  screenLastInsertedId,
  rowLastInsertedId
) => {
  let screenIdStartFrom = screenLastInsertedId;
  let rowIdStartFrom = rowLastInsertedId;
  const seatInfo = [];
  const seatStatusId = 1;
  screenReq.screens.forEach((screen) => {
    screen.rowsInfo.forEach((row) => {
      for (let i = row.seatStartFrom; i <= row.seatEndTo; i++) {
        const seatData = {
          rowId: rowIdStartFrom,
          screenId: screenIdStartFrom,
          cinemaId: cinemaId,
          seatName: `${row.rowName}${i}`,
          statusId: seatStatusId,
        };
        seatInfo.push(seatData);
      }
      rowIdStartFrom++;
    });
    screenIdStartFrom++;
  });
  return seatInfo;
};

const prepareScreenData = (screenReq) => {
  const screen = [];
  screenReq.screens.forEach((item) => {
    const screenInfo = {
      screenName: item.screenName,
      noOfRows: item.noOfRows,
      noOfSeats: item.noOfSeats,
      statusId: item.statusId,
    };
    screen.push(screenInfo);
  });
  const screenData = JSON.stringify(screen);
  return screenData;
};

const isInsertionValid = (row) => {
  return row && row[0][0] && row[0][0].lastInsertedId;
};

const addScreen = async (req, res, next) => {
  const screenReq = req.body;
  const totalNumberOfScreen = screenReq.screens.length;
  const screenData = prepareScreenData(screenReq);
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    let isAllInsertionDone = false;
    const query = "call add_screenInfo(?,?,?,?)";
    const params = [
      screenReq.cinemaId,
      screenReq.userId,
      totalNumberOfScreen,
      screenData,
    ];

    const [screen] = await connection.execute(query, params);

    if (isInsertionValid(screen)) {
      const rowInfo = calculateScreenIds(
        screenReq,
        screen[0][0].lastInsertedId
      );
      const rowQuery = "call add_rowInfo(?)";

      const [row] = await connection.execute(rowQuery, [
        JSON.stringify(rowInfo),
      ]);

      if (isInsertionValid(row)) {
        const seatInfo = calculateRowIds(
          screenReq,
          screenReq.cinemaId,
          screen[0][0].lastInsertedId,
          row[0][0].lastInsertedId
        );
        const rowQuery = "call add_seatInfo(?)";

        const [seat] = await connection.execute(rowQuery, [
          JSON.stringify(seatInfo),
        ]);

        if (isInsertionValid(seat)) {
          connection.commit();
          isAllInsertionDone = true;
          res.status(STATUS_CODE.SUCCESS).json({
            message: "Screen added successfully",
          });
        }
      }
    }
    if (!isAllInsertionDone) {
      throw new ErrorHandler(
        sentense["screen-not-added"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
};

module.exports = { addScreen };
