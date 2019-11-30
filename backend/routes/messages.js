const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.post('', (req, res, next) => {
  const message = new Message({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  });
  message.save().then(value => {
    console.log('value');
    res.status(200).json({
      message: 'Successful',
    })
  }).catch(err => {
    res.status(201).json({
      message: 'failed'
    })
  });
  console.log('called');
});

module.exports = router;
