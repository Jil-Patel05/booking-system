const { editProfileAdmin } = require("./editProfileAdmin");
const {
  resetAdminPassword,
  resetFirstAdminPassword,
} = require("./resetFirstTimePassword");
const { createAdmin } = require("./createAdmin");
const { loginAdmin } = require("./loginAdmin");
const { logoutAdmin } = require("./logoutAdmin");
const { editAdmin } = require("./editAdmin");
const { getSingleAdmin } = require("./getSingleAdmin");
const { deleteAdmin } = require("./deleteAdmin");
const { getUsers } = require("./getAdmins");
const { resetPassword } = require("./resetPassword");
const { setPassword } = require("./setPassword");


module.exports = {
  editProfileAdmin,
  resetFirstAdminPassword,
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getSingleAdmin,
  editAdmin,
  deleteAdmin,
  getUsers,
  resetPassword,
  setPassword
};
