const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helpers/errorHandler");
const sentense = require("../common/en-US.json");
const { STATUS_CODE, ROLES } = require("../common/common");

const ownerAuth = (req, res, next) => {
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
    if (payload.role !== ROLES.OWNER) {
      throw new ErrorHandler(sentense["unathorized"], STATUS_CODE.UNAUTHORIZED);
    }
    req.userId = payload.id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { ownerAuth };
