const passport = require('passport');

exports.googleOAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});
exports.googleOAuthCb = passport.authenticate('google', {
  failureRedirect: '/login'
});

exports.facebookOAuth = passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
});
exports.facebookOAuthCb = passport.authenticate('facebook');
