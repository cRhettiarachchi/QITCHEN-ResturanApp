const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Contents = require('./models/contents');
const app = express();

// app.use((req, res, next) => {
//   res.send('this is great');
// });
mongoose.connect("mongodb+srv://Charith:K7ulBusW5xqve3y0@cluster0-ow00d.mongodb.net/BudgetDB?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true})
  .then(() => {
    console.log('connected successful');
  }).catch(() => {
  console.log('connection failed');
});

app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});
// 2orBJk23OtCucTyp

app.get('/contents', (req, res, next) => {
  Contents.find()
    .then((documents) => {
      res.json({
        message: 'good',
        contents: documents
      });
    })
});

app.post('/contents', (req, res, next) => {
  const content = new Contents({
    heading: req.body.heading,
    description: req.body.description,
    category: req.body.category
  });
  content.save().then((value) => {
    res.status(200).json({
      message: "done",
      id: value._id
    });
  });
});

app.delete('/contents/:id', (req, res, next) => {
  console.log('delete mehtod called');
  Contents.deleteOne({id: req.params.id}).then(value => {
    console.log(value);
    res.json({
      message: 'done'
    })
  })
});

module.exports = app;
