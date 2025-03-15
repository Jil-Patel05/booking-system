const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { insetAndUpdateQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");
const { pool } = require("../../../config/mysqlDbConnection");

const addScreen = async (req, res, next) => {
  const screenReq = req.body;
  const totalNumberOfScreen = screenReq.screens.length;
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
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const query = "call add_screenInfo(?,?,?,?)";
    const params = [
      screenReq.cinemaId,
      screenReq.userId,
      totalNumberOfScreen,
      screenData,
    ];

    const [row] = await connection.execute(query, params);

    if (row && row[0][0] && row[0][0].lastInsertedId) {
      console.log("added");
      let firstInsertedId = row[0][0].lastInsertedId;
      const rowInfo = [];
      screenReq.screens.forEach((screen) => {
        screen.rowsInfo.forEach((row) => {
          const rowData = {
            screenId: firstInsertedId,
            rowName: row.rowName,
            noOfRowSeat: row.noOfRowSeat,
            rowType: row.rowType,
            statusId: row.statusId,
            seatStartFrom: row.seatStartFrom,
            seatEndTo: row.seatEndTo,
          };
          rowInfo.push(rowData);
        });
        firstInsertedId++;
      });
      const rowQuery = "call add_rowInf(?)";
      const [rowData] = await connection.execute(rowQuery, [
        JSON.stringify(rowInfo),
      ]);
      if (rowData && rowData[0][0] && rowData[0][0].lastInsertedId) {
        connection.commit();
        res.status(STATUS_CODE.SUCCESS).json({
          message: "Screen added successfully",
        });
      } else {
        throw new ErrorHandler(
          sentense["screen-not-added"],
          STATUS_CODE.CLIENT_BAD_REQUEST
        );
      }
    } else {
      throw new ErrorHandler(
        sentense["screen-not-added"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
  } catch (err) {
    connection.rollback();
    console.log("connection rolledback");
    next(err);
  } finally {
    connection.release();
  }
};

module.exports = { addScreen };
