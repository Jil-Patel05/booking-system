const { STATUS_CODE } = require("../../common/common");

const logout = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(STATUS_CODE.SUCCESS).json({
    success: true,
    message: "Logged Out",
  });
};

module.exports = { logout };
