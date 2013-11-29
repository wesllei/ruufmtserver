var mongoose = require('mongoose');

var DropCollection = function(collectionName) {
	var collection = mongoose.connection.collections[collectionName]
	collection.drop(function(err) {
		if (err)
			console.log(err);
	})
}

module.exports = DropCollection