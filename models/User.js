var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
require('./project2.js');

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

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  linkedin: String,
  bank: String,
  projects: [Number]
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.statics.addProject = function(email, id){

    this.update(
        {email : email},
        {$push: {projects : id}},
        function(err, results){
            //assert.equal(null, err);
        });

}


/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function(size) {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
	}
	var md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

sUser = mongoose.model('sUser', userSchema);


sUser.addProject("pandit.rohan@gmail.com", 2);


//userSchema.methods.setName = function(name) { }
