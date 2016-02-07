var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({

		title: String,
		borrower: String,
		description: String,
		status: Boolean,
		money: Number,
		date: Date,
		payments: [ {date: Date, amount: Number}],
		remaining: Number
	});

module.exports = mongoose.model('Project', projectSchema);
