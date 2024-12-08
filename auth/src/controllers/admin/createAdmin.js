const { STATUS_CODE } = require("../../common/statusCode");
const Admin = require("../../models/adminModel");

const createAdmin = async (req, res, next) => {
  const adminRequest = req.body;
  try {
    const admin = new Admin(adminRequest);
    const randomPassword = admin.generateRandomPassword();
    const adminSavedData = await admin.save();

    // mail this username and password

    res.status(STATUS_CODE.SUCCESS).json({
      adminSavedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createAdmin };
