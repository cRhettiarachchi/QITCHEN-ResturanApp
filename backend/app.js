const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/contents');
const app = express();

mongoose.connect("mongodb+srv://Charith:K7ulBusW5xqve3y0@cluster0-ow00d.mongodb.net/BudgetDB?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true})
  .then(() => {
    console.log('connected successful');
  }).catch(() => {
  console.log('connection failed');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(bodyparser.json());

app.use('/contents', router);

module.exports = app;
