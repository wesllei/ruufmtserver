var mongoose = require('mongoose');
var userSchema = require('../models/userschema.js');
var User = mongoose.model('User', userSchema);
var gcm = require('node-gcm');
var config = require('../config.js');

var dropCollection = require('./drop_collections.js');

var BroadcastCardapio = function(cardapioObj) {
	User.find(function(err, docs) {
		if (err) {
			console.log(err);
		} else {
			var message;
			var sender = new gcm.Sender(config.gcmSender);
			console.log(cardapioObj);
			for (var i = 0; i < docs.length; i++) {
				console.log(docs[i].idGcm);
				message = new gcm.Message({
					delayWhileIdle : true,
					timeToLive : 3,
					data : cardapioObj
				});
				
				sender.send(message, [docs[i].idGcm], 4, function(err, result) {
					console.log(result);
				});
			}
		}
	});
};
module.exports = BroadcastCardapio;
