class ErrorHandler extends Error{
  constructor(message,statusCode){
      super(message);
      this.statusCode = statusCode
      this.stackeTrace = Error.captureStackTrace(this,this.constructor);
  }   
}

module.exports = ErrorHandler