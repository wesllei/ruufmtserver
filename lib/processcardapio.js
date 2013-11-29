var mongoose = require('mongoose');
var cardapioSchema = require('../models/cardapioschema.js');
var Cardapio = mongoose.model('Cardapio', cardapioSchema);
var broadcastCardapio = require('./broadcastcardapio.js');

var ProcessCardapio = function(data,cardapioObj) {
	
	var newCardapio = new Cardapio({
		date : data,
		cardapio : cardapioObj
	});
	Cardapio.findByScrape(data, function(err, resul) {
		if (err) {
			console.log(err);
		} else {
			if (resul.length == 0) {
				newCardapio.save(function(err) {
					if (err){
						return handleError(err);
					}else{
						broadcastCardapio(cardapioObj);
					}
				});
			}
		}
	});
};
module.exports = ProcessCardapio;
