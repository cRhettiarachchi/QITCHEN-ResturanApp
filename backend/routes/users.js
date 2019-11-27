const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('', (req, res, next) => {
  console.log('this is working');
  res.json({
    message: 'done'
  });
});

router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
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

router.post('/login', (req, res, next) => {
  let updatedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.json({
        message: 'wrong-email'
      });
    }
    updatedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      console.log('Result Error');
      return res.json({
        message: 'wrong-password'
      });
    }
    const token = jwt.sign({
      email: updatedUser.email,
      id: updatedUser._id,
      name: updatedUser.name
    }, 'This-is-The-One-used-to-Enqript-this-code',
      {expiresIn: '23h'});
    res.json({
      message: 'successfully-Authenticated',
      token: token,
      expiresIn: 86400
    });
  }).catch(err => {
    console.log('Final error');
    return res.status(401).json({
      message: err
    });
  });
});

module.exports = router;
