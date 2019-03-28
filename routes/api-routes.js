const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Canvas = require("../models/Canvas");

module.exports = function (app, io, http) {

	app.post("/api/authenticate", function (req, res) {
		console.log(req.body);
		const {username, password} = req.body;
		User.findOne({ username: username })
			.then(function (user) {
				const isValidPass = user.comparePassword(password);
				if (isValidPass) {
					// I need to ask about what I enter for the "superSecretKey. I know that it was a procENV thing" //
					const token = jwt.sign({ data: user.id }, "superSecretKey");
					res.json({
						id: user.id,
						username: user.username,
						token: token
					});
				} else {
					res.status(404).json({ message: "Please enter a valid username and password." });
				}
			})
			.catch(function (err) {
				res.status(404).json({ message: "Please enter a valid username and password." });
			});
	});

	app.post('/api/signup', function(req, res) {
		const userData = {
			username: req.body.username,
			password: req.body.password
		};

		User.create(userData).then(function(dbUser){
			res.json({success:true});
		});
	});

	app.get("/api/protected", function (req, res) {
		res.json({
			message: "Let's get ready to paint!! You've been authenticated!!",
			user: req.user
		});
	});

	app.get("/api/public", function (req, res) {
		res.json({
			message: "Anyone can be here!."
		});
	});

	app.get("/api/canvas", function ( req, res) {
		Canvas.findOne({ name: "Test1" }).then(response => {
			res.json(response);
		}).catch(err => {
			res.json(err);
		});
	});


	io.on('connection', (socket) => {
		socket.on('pixel', data => {
			console.log(data);
			io.emit('message', data);
		})
		console.log('a user is connected');
	})

	app.put("/api/canvas", function( req, res) {
		Canvas.findOneAndUpdate( { name: "Test1" }, { [req.body.coord] : req.body.rgb}, { upsert : true, new : true } ).then(response => {
			if(response.status === 200) {
				io.emit('message', req.body);
			}
			res.json(req.body);
		}).catch(err => {
			res.json(err);
		});
	});


	http.listen(3002, function() {
		console.log("listening on 3002");
	})

}