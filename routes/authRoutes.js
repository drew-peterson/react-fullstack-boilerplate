const passport = require("passport");

const passportTypes = require("../services/passportTypes");
const googleOAuth = passportTypes.googleOAuth;
const googleOAuthCb = passportTypes.googleOAuthCb;
const facebookOAuth = passportTypes.facebookOAuth;
const facebookOAuthCb = passportTypes.facebookOAuthCb;
const createLocalUser = require("../middlewares/createLocalUser");
const password = require("../middlewares/password");

module.exports = app => {
  // GOOGLE ------------------------------------------------------
  app.get("/auth/google", googleOAuth);

  // redirect to specific route after passport strategy is model getting user model
  app.get("/auth/google/callback", googleOAuthCb, (req, res) => {
    res.redirect("/");
  });

  // FACEBOOK ------------------------------------------------------
  app.get("/auth/facebook", facebookOAuth);

  app.get("/auth/facebook/callback", facebookOAuthCb, (req, res) => {
    res.redirect("/");
  });

  // EMAIL PASSWORD ------------------------------------------------------
  app.post("/auth/localLogin", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(403).send({ message: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).send({ user: req.user });
      });
    })(req, res, next);
  });

  app.post("/auth/localSignup", createLocalUser, (req, res) => {
    res.status(200).send({ user: req.user });
  });

  // OTHER ------------------------------------------------------
  app.get("/api/current_user", (req, res) => {
    // passport deserialize attaches mongoose user model to req.user once authorized
    res.send(req.user);
  });

  // logout
  app.get("/api/logout", (req, res) => {
    req.logout(); // attached by passport, takes cookie and kills the id
    res.redirect("/");
  });

  app.post('/auth/resetPassword/:token', password.reset, (req, res)=>{
    console.log('resetPassword', req.body, req.params);
  })
  app.post('/auth/forgotPassword', password.forgot, (req, res)=>{
    console.log('forgotPassword', req.body, req.params);
  })

};
