const { STATUS_CODE } = require("../../common/common");
const ErrorHandler = require("../../helpers/errorHandler");
const Owner = require("../../models/ownerModel");
const { ROLES } = require("../../models/enums");
const sentense = require("../../common/en-us.json");

const createOwner = async (req, res, next) => {
  const ownerRequest = req.body;
  try {
    if (ownerRequest.role !== ROLES.OWNER) {
      throw new ErrorHandler(
        sentense["owner-allowed"],
        STATUS_CODE.CLIENT_BAD_REQUEST
      );
    }
    let ownerData;
    let user = await Owner.findOne({ email: ownerRequest.email }).exec();
    let owner = new Owner(ownerRequest);
    const randomPassword = owner.generateRandomPassword();
    console.log(randomPassword);
    if (user && user.isUserDeleted) {
      Object.assign(user, owner.toObject(), { _id: user._id });
      ownerData = await user.save();
    } else {
      ownerData = await owner.save();
    }

    // mail this username and password
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
      ownerData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOwner };
