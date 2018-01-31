// OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user'); // bring in mongo class

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
			callbackURL: '/auth/google/callback', // passport as correct domain
			proxy: true // tell passport to trust proxy and keep https for callback
		},
		(accessToken, refreshToken, profile, done) => {
			newOrExistingUser(profile.id, done);
		}
	)
);

// Facebook
// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: keys.FACEBOOK_APP_ID,
// 			clientSecret: keys.FACEBOOK_APP_SECRET,
// 			callbackURL: '/auth/facebook/callback'
// 		},
// 		(accessToken, refreshToken, profile, done) => {}
// 	)
// );

// ** PROMISES **
// function newOrExistingUser(_oAuthId, done) {
// 	User.findOne({ _oAuthId }).then(existingUser => {
// 		if (existingUser) {
// 			done(null, existingUser); // calls passport.serializeUser and passes existingUser as first arg -> user
// 		} else {
// 			// create new user...
// 			new User({ _oAuthId }).save().then(user => {
// 				done(null, user);
// 			});
// 		}
// 	});
// }

// ** ES6 async await
const newOrExistingUser = async (_oAuthId, done) => {
	const existingUser = await User.findOne({ _oAuthId });
	if (existingUser) {
		return done(null, existingUser); // calls passport.serializeUser and passes existingUser as first arg -> user
	}
	// the return above will leave function so we dont need else....
	const user = await new User({ _oAuthId }).save(); // create new user
	done(null, user);
};

// JWT
// Using JWT's in the header of each request in the other course was a result of putting the react app on one domain and the API server on a different one.  In a few lectures we dive really deep into talking about why the server setup in this course makes working with cookies possible.  One of the nasty things around JWT's is that there isn't a great place to store them on the client side - they are almost always weak against XSS attacks.  Using cookies solves that huge huge issue.

// cookeies --> we dont have to worry about them on the react side of

// COOKIES
// request from browser after logged in > cookie extracts user id and in req we get req.user
// I think cookie only store the user._id -> the deserialize is the last middleware and attaches the user model to the req
