var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	date : Date,
	idGcm : String
});
UserSchema.statics.findByIdGcm = function(idGcm, cb) {
	this.find({
		'idGcm' : new RegExp(idGcm, 'i')
	}, cb);
}
module.exports = UserSchema;
