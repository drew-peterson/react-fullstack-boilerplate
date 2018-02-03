const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  _oAuthId: String,
  firstName: String,
  lastName: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  credits: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    unique: true,
    lowercase: true, //doesn not enforce case in unique so apply lowercase
    validate: {
      validator: function(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // validate real email...
        return re.test(email);
      },
      message: "{VALUE} is not a valid email address"
    }
  },
});

//On save hook, encrypt password
userSchema.pre("save", function(next) {
  const user = this;
  if (!user.password) {
    next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(canidatePassword, cb) {
  const user = this;

  bcrypt.compare(canidatePassword, user.password, function(err, isMatch) {
    if (err) {
      return cb(err, isMatch);
    }
    return cb(null, isMatch);
  });
};

mongoose.model("user", userSchema);
