const isUserExitsByEmail = async (email, model, next) => {
  try {
    const user = await model.findOne({ email, isUserDeleted: false });
    return user;
  } catch (err) {
    next(err);
  }
};

module.exports = { isUserExitsByEmail };
