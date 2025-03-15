const { STATUS_CODE } = require("../../../common/common");
const ErrorHandler = require("../../../helpers/errorHandler");
const { getQuery } = require("../../../helpers/mysqlQuery");
const sentense = require("../../../common/en-US.json");

const getAllCinema = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { cityId } = req.body;
    const query =
      "select C1.id,C1.cinemaName,C1.cinemaLandmark,C1.noOfScreen,C3.status,c2.id as facilityId,C2.facility,C4.facilityStatus from cinema as C1 inner join cinemainformation as C2 on c1.id = C2.cinemaId inner join cinemastatusenum as C3 on C1.status = C3.id inner join facilitystatusenum as C4 on C2.facilityStatusId = C4.id where C1.userId = ? and C1.cityId = ?";
    const params = [userId, cityId];
    const [raws, fields] = await getQuery(query, params);
    if (raws && fields) {
      let dataToReturn = [];
      const mapping = {};
      let index = 0;
      raws.forEach((data) => {
        const obj = {
          id: data.id,
          cinemaName: data.cinemaName,
          cinemaLandmark: data.cinemaLandmark,
          noOfScreen: data.noOfScreen,
          status: data.status,
        };
        if (mapping[data.id]) {
          dataToReturn[mapping[data.id] - 1].facilities.push({
            id: data.facilityId,
            facility: data.facility,
            facilityStatusId: data.facilityStatus,
          });
        } else {
          dataToReturn[index] = obj;
          dataToReturn[index].facilities = [
            {
              id: data.facilityId,
              facility: data.facility,
              facilityStatusId: data.facilityStatus,
            },
          ];
          index++;
          mapping[data.id] = index;
        }
      });
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

module.exports = { getAllCinema };
