const { editProfileAdmin } = require("./editProfileAdmin");
const { resetAdminPassword } = require("./resetPassword");
const { createAdmin } = require("./createAdmin");
const { loginAdmin } = require("./loginAdmin");
const { logoutAdmin } = require("./logoutAdmin");

module.exports = {
  editProfileAdmin,
  resetAdminPassword,
  createAdmin,
  loginAdmin,
  logoutAdmin,
};
