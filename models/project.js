var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({

		title: String,
		borrower: String,
		description: String,
		stat: Boolean,
		money: Number,
		dateStart: Date,
		approved: Boolean,
		dateLent: Date,
		payments: [ {date: Date, amount: Number}],
		packageName: String,
		remaining: Number
	});

module.exports = mongoose.model('Project', projectSchema);

var newProject = function(ttle, bor, desc, mny, date, pkgName) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		insertProject(db, function() {db.close()}, ttle, bor, desc, mny, date, pkgName);
	});
};

var insertProject = function(db, callback, ttle, bor, desc, mny, date, pkgName) {
	db.collection('projects').insertOne( {
		"title": ttle,
		"borrower" : bor,
		"description" : desc,
		"stat" : false,
		"money" : mny,
		"dateStart" : date,
		"approved" : False,
		"dateLent" : null,
		"payments" : [],
		"packageName": pkgName,
		"remaining": null
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a project.");
		callback(result);
	});
};

var approveProject = function(id) {
	MongoCent.connect(url, function(err, db) {
		assert.equal(null, err);
		updateProjectApprove(db, function(){db.close();}, id);
	});
});

var updateProjectApprove = function(db, callback, id) {
	db.collection('projects').updateOne(
		{"_id" : id}, 
		{$set: {"approved" : true}},
      		function(err, results) {
        		console.log(results);
	        	callback();
		});
	});
};

var pay = function(id, amount, date) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		updateProjectBalance(db, function(){db.close();}, id, amount, date);
	});
};

var updateProjectBalance = function(db, callback, id, amount, date){
	
	queryAmountOwed(db, function(err2, owed){
		db.collection('projects').updateOne(
			{"_id" : id}, 
			{$push : {"payments" : payments.push({date, amount})},
			$set : {"remaining" : owed - amount}},
      			function(err, results) {
	       	 		console.log(results);
		        	callback();
			}
		);
	}, id, amount, date);
};

var queryAmountOwed = function(db, callback, id, amount, date) {
	var cursor = db.collection('projects').find( {"_id" : id} );
	cursor.each(function(err, proj) {
		assert.equal(null, err);
		if(proj != null) {
			interestRate(function(err2, intRate){
				var owed = proj.remaining * Math.pow(1 + intRate / 100,
					Math.abs((date - proj.payments[payments.length - 1].date) / (365 * 8640000)));
				callback(err2, owed);
			}, proj.packageName); 
		} else {
			callback(err, 0);
		}
	};
};
