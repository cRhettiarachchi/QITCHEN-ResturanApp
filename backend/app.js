const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/contents');
const userRouter = require('./routes/users');
const messageRouter = require('./routes/messages');
const app = express();

mongoose.connect("mongodb+srv://Charith:K7ulBusW5xqve3y0@cluster0-ow00d.mongodb.net/BudgetDB", {useNewUrlParser: true,  useUnifiedTopology: true})
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
app.use("/images", express.static(path.join("backend/images")));

app.use('/contents', router);
app.use('/users', userRouter);
app.use('/message', messageRouter);

module.exports = app;
