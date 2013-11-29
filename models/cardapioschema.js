var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardapioSchema = new Schema({
	date : String,
	cardapio : Object
});
CardapioSchema.statics.findByScrape = function(data, cb) {
	this.find({
		'date' : data
	}, cb);
}
CardapioSchema.statics.getLast = function(cb) {
	this.find().sort({'date':'descending'}).limit(1).find(cb);
}
CardapioSchema.statics.drop = function(data, cb) {
	mongoose.connection.collections[this.collection].drop(function(err) {
		console.log('collection dropped');
	});
}
module.exports = CardapioSchema;
