const { STATUS_CODE } = require("../../common/statusCode");

const logoutAdmin = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(STATUS_CODE.SUCCESS).json({
    message: "Logged Out",
  });
};

module.exports = { logoutAdmin };
