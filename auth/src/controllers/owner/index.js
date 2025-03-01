const { editProfileOwner } = require("./editProfileOwner");
const {
  resetFirstOwnerPassword,
} = require("./resetFirstTimePasswordOwner");
const { createOwner } = require("./createOwner");
const { loginOwner } = require("./loginOwner");
const { logoutOwner } = require("./logoutOwner");
const { editOwner } = require("./editOwner");
const { getSingleOwner } = require("./getSingleOwner");
const { deleteOwner } = require("./deleteOwner");
const { getOwners } = require("./getOwners");
const { resetPassword } = require("./resetPassword");
const { setPassword } = require("./setPassword");

module.exports = {
  editProfileOwner,
  resetFirstOwnerPassword,
  createOwner,
  loginOwner,
  logoutOwner,
  getSingleOwner,
  editOwner,
  deleteOwner,
  getOwners,
  resetPassword,
  setPassword
};
