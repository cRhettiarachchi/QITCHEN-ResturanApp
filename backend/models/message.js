const mongoose = require('mongoose');

const messageCollection = mongoose.Schema({
  email: ({type: String, require: true}),
  name: ({type: String, require: true}),
  message: ({type: String, require: true})
});

module.exports = mongoose.model('message', messageCollection);
