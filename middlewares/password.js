const mongoose = require('mongoose');
const User = mongoose.model('user'); // bring in mongo class
var crypto = require('crypto');

const Mailer = require('../services/Mailer');
const resetPasswordTemplate = require('../services/emailTemplates/resetPassword');

module.exports = {
  forgot: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user && user.password) {
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
        next(null, user);
      }
      return next(null, { message: 'No user found or no password' });
    } catch (err) {
      next(err, { message: 'no user found' });
    }
  },
  reset: async (req, res, next) => {
    const { token } = req.params;
    console.log('RESET', token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    console.log('user', user);
  }
};
