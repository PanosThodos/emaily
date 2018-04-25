const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
require('./models/User');
require("./services/passport"); // requires the whole file (no const, because we don't export anything in that js file)


mongoose.connect(keys.mongoURI);

const app = express(); //run express

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //calls the required function with app parameter

const PORT = process.env.PORT || 5000; // runs server default port, or localhost on port 5000;
app.listen(PORT);
