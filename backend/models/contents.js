const mongoose = require('mongoose');

const contentCollection = mongoose.Schema({
  heading: ({type: String, required: true}),
  description: ({type: String, required: true}),
  category: ({type: String, required: true}),
  price: ({type: Number, required: true}),
  imagePath: ({type: String, required: true})
});

module.exports = mongoose.model('Contents', contentCollection);
