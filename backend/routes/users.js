const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('', (req, res, next) => {
  console.log('this is working');
  res.json({
    message: 'done'
  });
});

router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name
    });
    user.save().then((result) => {
      res.json(result);
    }).catch(result => {
      res.json({
        message: 'failed',
        result: result
      });
    });
  });
});

module.exports = router;
