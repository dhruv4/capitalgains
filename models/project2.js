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

projectSchema.statics.addProject = function(ttle, bor, desc, mny, date, pkgName) {

	Project.create({
		title : ttle,
		borrower : bor,
		description : desc,
		stat : false,
		money : mny,
		dateStart : date,
		approved : false,
		dateLent : null,
		payments : [],
		packageName: pkgName,
		remaining: mny
	}, function(err, proj){
		if(err) return handleError(err);
	});
};

projectSchema.methods.approveProject = function(id) {
	Project.update({_id : id}, {approved : true, dateLent: Date.now()}, function(err, results) {
        		console.log(results);
	        	callback();
	});
};

projectSchema.methods.pay = function(id, amount) {

	this.queryAmountOwed(db, function(err2, owed){
		if(amount >= owed){
			num = owed - amount;
			Project.update({_id : id},
				{$push : {payments : {date: Date.now(), amount: amount}},
				$set : {remaining : num, stat : true}},
				function(err, results) {
       					console.log(results);
				});
		} else {
			Project.update({_id : id},
				{$push : {payments : {date : Date.now(), amount: amount}},
				$set : {remaining : owed - amount}},
				function(err, results) {
       					console.log(results);
				});
		}
	}, id, amount, new Date());
};

projectSchema.methods.queryAmountOwed = function(db, callback, id, amount, date) {

	Project.findOne({_id : id}, new function(err, proj){
		assert.equal(null, err);
		if(proj != null){
			interestRate(function(err2, intRate){
				var prevDate = proj.dateLent;
				if(proj.payments.length > 0){
					prevDate = proj.payments[prog.payments.length - 1];
				}
				var owed = proj.remaining * Math.pow(1 + intRate / 100,
					Math.abs((date - prevDate) / (365 * 8640000)));
				callback(err2, owed);
			}, proj.packageName);
		} else {
			callback(error, 0);
		}
	});
};

projectSchema.statics.getProject = function(callback, id){

	Project.findOne({_id : id}, function(err, proj){
		assert.equal(null, err);
		callback(err, proj);
	});
};

Project  = mongoose.model('Project', projectSchema);


Project.addProject("Weed", "pandit.rohan@gmail.com", "Selling pot to poor kids",
    5000, new Date(), "1");
