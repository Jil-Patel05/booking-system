const { STATUS_CODE } = require("../common/common");

const sendJwtTokenToUser = (user, res) => {
  const token = user.getJWTToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(STATUS_CODE.SUCCESS)
    .cookie("token", token, cookieOptions)
    .json({ user, token });
};

module.exports = { sendJwtTokenToUser };
