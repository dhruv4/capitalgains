var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
 
var packageSchema = new mongoose.Schema({
	
	_id : Number,
	interest : Number,

});

var Package = mongoose.model('Package', packageSchema);

packageSchema.methods.addPackage = function(id, intRate) {
	Package.create({
		_id : id,
		interest : intRate,
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a package.");
	});
};

packageSchema.methods.interestRate = function(callback, id){
	
	Package.findOne({_id: id}, new function(error, pkg){
		assert.equal(null, err);
		if(pkg != null){
			callback(err, pkg.interest);
		} else {
			callback(err, 0);
		}
	});
};

var queryInterestRate(db, callback, id){
	var cursor = db.collection('packages').find( {"_id" : id});
	cursor.each(function(err, pkg) {
		assert.equal(err, null);
		if(pkg != null){
			//xxxxx
			callback(err, pkg.interest);
		}
			
