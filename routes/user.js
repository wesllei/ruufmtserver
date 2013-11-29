/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var UserSchema = require('../models/userschema.js');
var User = mongoose.model('User', UserSchema);

exports.list = function(req, res) {
	res.send("respond with a resource");
};
exports.add = function(req, res) {
	var idGcm = req.params.id;
	console.log(idGcm);
	if (!idGcm) {
		res.json({
			status : false
		});
		return;
	}
	var newUser = new User({
		date : Date.now(),
		idGcm : idGcm
	});

	User.findByIdGcm(idGcm, function(err, resul) {
		if (err) {
			console.log(err);
		} else {
			if (resul.length == 0) {
				newUser.save(function(err) {
					if (err) {
						console.log(err);
						res.json({
							status : false
						});
					} else {
						res.json({
							status : true
						});
					}
				});
			} else {
				res.json({
					status : true
				});
			}
		}
	});
};
