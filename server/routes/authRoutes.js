const passport = require('passport');//requires passport npm not passport.js

module.exports = app =>{
	//starts google oauth
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	//authenticates and returns to callback "localhost:5000"
	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}