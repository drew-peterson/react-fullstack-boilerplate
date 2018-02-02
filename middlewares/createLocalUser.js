const mongoose = require("mongoose");
const User = mongoose.model("user"); // bring in mongo class

module.exports = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  console.log("createLocalUser", email, password, firstName, lastName);
  // if a user is found then continue on you are authorized to continue...
  try {
    const user = await new User({
      email,
      password,
      firstName,
      lastName
    }).save();

    req.logIn(user, function(err) {
      if (err) return next(err);
      next(null, user);
    });
  } catch (err) {
    next(err);
  }
};
