const STATUS_CODE = Object.freeze({
  SUCCESS: 200,
  REDIRECTION: 301,
  CLIENT_BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
});

const TOPICS = Object.freeze({
  URGENT_NOTIFICATION: "urgentNotfication",
  SIMPLE_NOTIFICATION: "simpleNotification",
});

const EMAIL_SUBJECTS = Object.freeze({
  OTP: "OTP",
  RESET_PASSWORD: "Reset password",
});

const PAGE_SIZE = 10;

module.exports = { STATUS_CODE, PAGE_SIZE, TOPICS, EMAIL_SUBJECTS };
