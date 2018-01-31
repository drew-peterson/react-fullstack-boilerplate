const passport = require("passport");

module.exports = app => {
  // GOOGLE
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"), // 2nd part of passport --> get user info and pass back to strategy cb
    (req, res) => {
      // redirect to specific route after passport strategy is model getting user model
      res.redirect("/");
    }
  );

  // FACEBOOK;
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
    }
  );

  // passport deserialize attaches mongoose user model to req.user once authorized
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // logout
  app.get("/api/logout", (req, res) => {
    req.logout(); // attached by passport, takes cookie and kills the id
    res.redirect("/");
  });
};
