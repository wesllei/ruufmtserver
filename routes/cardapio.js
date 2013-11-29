var mongoose = require('mongoose');
var CardapioSchema = require('../models/cardapioschema.js');
var Cardapio = mongoose.model('Cardapio', CardapioSchema);

exports.last = function(req, res) {
	Last = Cardapio.getLast(function(err, resul) {
		if (err) {
			console.log(err);
		} else {
			if (resul.length > 0) {
				res.json(resul[0].cardapio)
			}
		}
	});
}