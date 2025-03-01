const { sendOtp } = require("./sendOtp");
const { verifyOtp } = require("./verifyOtp");
const { editProfile } = require("./editProfile");
const { logout } = require("./logout");

module.exports = {
  sendOtp,
  verifyOtp,
  editProfile,
  logout,
};
