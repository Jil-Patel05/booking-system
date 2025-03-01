const { STATUS_CODE } = require("../common/common");
const ErrorHandler = require("../helpers/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || STATUS_CODE.SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, STATUS_CODE.CLIENT_BAD_REQUEST);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, STATUS_CODE.CLIENT_BAD_REQUEST);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, STATUS_CODE.CLIENT_BAD_REQUEST);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, STATUS_CODE.CLIENT_BAD_REQUEST);
  }

  // stack trace issue haha
  const stackLines = err.stack.split("\n");

  // Find the stack line corresponding to the current function
  const callerLine = stackLines[1]; // Adjust index based on where this function appears

  // Extract file path and line/column numbers using regex
  const pathMatch = callerLine.match(/\((.*):(\d+):(\d+)\)/);

  if (pathMatch) {
    const [_, filePath, lineNumber, columnNumber] = pathMatch;
    err.stackTrace = `Path: ${filePath}, Line: ${lineNumber}, Column: ${columnNumber}`;
    console.log(
      `Path: ${filePath}, Line: ${lineNumber}, Column: ${columnNumber}`
    );
  } else {
    err.stackTrace = "Could not extract path information.";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stackTrace: err.stackTrace,
  });
};
