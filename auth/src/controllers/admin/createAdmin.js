const { STATUS_CODE, TOPICS } = require("../../common/common");
const Admin = require("../../models/adminModel");

const createAdmin = async (req, res, next) => {
  const adminRequest = req.body;
  try {
    let adminData;
    let user = await Admin.findOne({ email: adminRequest.email }).exec();
    let admin = new Admin(adminRequest);
    const randomPassword = admin.generateRandomPassword();
    if (user && user.isUserDeleted) {
      Object.assign(user, admin.toObject(), { _id: user._id });
      adminData = await user.save();
    } else {
      adminData = await admin.save();
    }

    // mail this username and password using kafka
    const key = 1;
    const message = {
      from: process.env.EMAIL_USERNAME,
      to: adminData.email,
      subject: "Your credentials",
      html: `
        <p>
          Hi <b>${adminData.username}</b>,<br/> Your password is : <b>${randomPassword}</b>
        </p>`,
    };

    produceMessage(
      TOPICS.SIMPLE_NOTIFICATION,
      NUMBER_OF_PARTITION,
      key,
      message
    );

    res.status(STATUS_CODE.SUCCESS).json({
      adminData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createAdmin };
