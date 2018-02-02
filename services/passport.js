// OAuth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("user"); // bring in mongo class

// generate unqiue indenityfing info
// turn mongoose model into id
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is not _oAuthId --> referring to user._id (mongo id) for specific user
});
// id: is the above user.id
// turn id into mongoose model and attached to req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google
// https://developers.google.com/identity/one-tap/web/get-started -- new google login??
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", // passport as correct domain
      proxy: true // tell passport to trust proxy and keep https for callback
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        _oAuthId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      };
      newOrExistingUser(data, done);
    }
  )
);

// Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        _oAuthId: profile.id
        // firstName: profile.name.givenName,
        // lastName: profile.name.familyName
      };
      newOrExistingUser(data, done);
    }
  )
);

// Email password
const localOptions = {
  usernameField: "email",
  passwordField: "password"
};
passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(user, false, { message: "User not found" });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err, { message: "error during password" });
        }
        if (!isMatch) {
          return done(null, false, { message: "password does not match" });
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err, false, { err });
    }
  })
);

// ** ES6 async await
const newOrExistingUser = async ({ _oAuthId, firstName, lastName }, done) => {
  // _oAuthId is the google or facebook id not mongoose...
  const existingUser = await User.findOne({ _oAuthId });
  if (existingUser) {
    return done(null, existingUser); // calls passport.serializeUser and passes existingUser as first arg -> user
  }
  // the return above will leave function so we dont need else....
  try {
    const user = await new User({ _oAuthId, firstName, lastName }).save(); // create new user
    done(null, user);
  } catch (err) {
    done(err);
  }
};

// JWT
// Using JWT's in the header of each request in the other course was a result of putting the react app on one domain and the API server on a different one.  In a few lectures we dive really deep into talking about why the server setup in this course makes working with cookies possible.  One of the nasty things around JWT's is that there isn't a great place to store them on the client side - they are almost always weak against XSS attacks.  Using cookies solves that huge huge issue.

// cookeies --> we dont have to worry about them on the react side of

// COOKIES
// request from browser after logged in > cookie extracts user id and in req we get req.user
// I think cookie only store the user._id -> the deserialize is the last middleware and attaches the user model to the req
