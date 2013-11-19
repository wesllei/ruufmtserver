var mongoose = require('mongoose');

var cardapioSchema = require('../models/cardapioschema.js');

var Cardapio = mongoose.model('Cardapio', cardapioSchema);

var ProcessCardapio = function(scrape) {
	console.log(scrape);
	var newCardapio = new Cardapio({
		date : Date.now(),
		scrape : scrape
	});
	newCardapio.exist(function(err, resul) {
		console.log(err);
		console.log(resul);
		if (err) {
			console.log(err);
		} else {
			if (resul.length == 0) {
				newCardapio.save(function(err) {
					if (err)
						return handleError(err);
				});
			}
		}
	})
};
module.exports = ProcessCardapio; 