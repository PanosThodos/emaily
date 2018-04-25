const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); 
//Creates User object (instead of require)

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					//we already have a record with the given profileID
					done(null, existingUser);
				} else {
					//we don't have a user record with this ID, make a new record in mongo
					new User({ googleID: profile.id }).save()//User object(which is actually a User collection in mongodb) creates instance googleID and registers the profileID of google oauth then saves it to mognodb
					.then(user => done(null, user));
				}
			});
		}
	)
);
