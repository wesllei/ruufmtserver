var mongoose = require('mongoose');

var cardapioSchema = require('../models/cardapioschema.js');

var Cardapio = mongoose.model('Cardapio', cardapioSchema);

var ProcessCardapio = function(data,scrape) {
	
	var newCardapio = new Cardapio({
		date : data,
		scrape : scrape
	});
	Cardapio.findByScrape(data, function(err, resul) {
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
	});
};
module.exports = ProcessCardapio;
