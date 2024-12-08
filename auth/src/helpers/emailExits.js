const isEmailExist = async (email, model, next) => {
  try {
    const isEmailExists = await model.findOne({ email });
    if (isEmailExists) {
      return true;
    }
    return false;
  } catch (err) {
    next(err);
  }
};

module.exports = { isEmailExist };