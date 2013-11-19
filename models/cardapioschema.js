var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardapioSchema = new Schema({
	date : Date,
	scrape : String
});
cardapioSchema.methods.exist = function(cb){
	return this.model('Cardapio').find({ scrape: this.scrape }, cb); 
}

module.exports = cardapioSchema; 