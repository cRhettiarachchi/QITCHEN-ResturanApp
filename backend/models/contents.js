const mongoose = require('mongoose');
// The schema for contents model
const contentCollection = mongoose.Schema({
  heading: ({type: String, required: true}),
  description: ({type: String, required: true}),
  category: ({type: String, required: true}),
  price: ({type: Number, required: true}),
  imagePath: ({type: String, required: true})
});

module.exports = mongoose.model('Contents', contentCollection); // exporting the schema function expression
