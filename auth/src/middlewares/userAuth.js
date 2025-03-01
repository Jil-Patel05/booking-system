const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helpers/errorHandler");
const { ROLES } = require("../models/enums");
const sentense = require("../common/en-us.json");
const { STATUS_CODE } = require("../common/common");

const userAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const isJwtTokenValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isJwtTokenValid) {
      throw new ErrorHandler(
        sentense["jwt-token-expire"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    const payload = jwt.decode(token);
    if (payload.role !== ROLES.USER) {
      throw new ErrorHandler(sentense["unathorized"], STATUS_CODE.UNAUTHORIZED);
    }
    req.role = payload.role;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { userAuth };
