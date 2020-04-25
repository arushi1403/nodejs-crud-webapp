var mongoose = require('mongoose');
mongoose.pluralize(null);
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	email: String,
	username: String,
	password: String
},
{
  versionKey: false
}),
User = mongoose.model('user', userSchema);

module.exports = User;