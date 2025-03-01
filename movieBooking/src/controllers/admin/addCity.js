const { STATUS_CODE } = require("../../common/common");
const { insertQuery } = require("../../helpers/mysqlQuery");

const addCity = async (req, res, next) => {
  try {
    const cityReq = req.body;
    const query = "insert into city(userId,city,state,country) values(?,?,?,?)";
    const params = [req.userId, cityReq.city, cityReq.state, cityReq.country];
    console.log(params);
    const result = await insertQuery(query, params);
    console.log(result);
    res.status(STATUS_CODE.SUCCESS).json({
      message: "City is inserted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCity };
