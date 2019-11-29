const mongoose = require('mongoose');
const uValidator = require('mongoose-unique-validator');

// model schema for user
const userSchema = mongoose.Schema({
  email: ({type: String, required: true, unique: true}),
  name: ({type: String, required: true,}),
  password: ({type: String, required: true}),
  type: ({type: String, default: 'user'})
});

userSchema.plugin(uValidator); // mongoose unique validator to check if the email is valid

module.exports = mongoose.model('User', userSchema); // exporting the user function expression
