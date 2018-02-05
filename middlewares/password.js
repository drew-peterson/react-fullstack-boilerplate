const mongoose = require('mongoose');
const User = mongoose.model('user'); // bring in mongo class
var crypto = require('crypto');

const Mailer = require('../services/Mailer');
const resetPasswordTemplate = require('../services/emailTemplates/resetPassword');

module.exports = {
  forgot: async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return next('valid email is required');
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        if (!user.password) {
          return next(
            'This user does not have a password please login with facebook or google'
          );
        }
        // create token...
        const buf = crypto.randomBytes(20);
        const token = buf.toString('hex');

        // update user with token
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        const userWithToken = await user.save();

        // send email
        const mailConfig = {
          subject: 'Host Legality - reset password',
          recipients: [{ email: 'drew.m.peterson@gmail.com' }]
        };
        const mailer = new Mailer(
          mailConfig,
          resetPasswordTemplate(userWithToken)
        );
        await mailer.send();
        return next(null, user);
      }
      return next(`No user found with email: ${email}`);
    } catch (err) {
      return next(err);
    }
  },
  reset: async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
      return next('Please provide a password in order to reset');
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (user && password) {
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      try {
        const res = await user.save();
        req.logIn(user, function(err) {
          return next(err, user);
        });
      } catch (err) {
        return next(err);
      }
    } else {
      return next('Token has expired or is not valid');
    }
  }
};
