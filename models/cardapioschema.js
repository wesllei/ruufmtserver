var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardapioSchema = new Schema({
	date : String,
	scrape : Object
});
cardapioSchema.statics.findByScrape = function(data, cb) {
	this.find({
		'date' : new RegExp(data, 'i')
	}, cb);
}
module.exports = cardapioSchema;
