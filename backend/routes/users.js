const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// just a get method to see if the router is working
router.get('', (req, res, next) => {
  console.log('this is working');
  res.json({
    message: 'done'
  });
});

// post method to add a new user
router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => { // encrypting the password
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name
    });
    user.save().then((result) => { // save the user as a new user
      res.json(result);
    }).catch(result => { // catch to catch any errors ps: the errors are not handle properly in the front end
      res.json({
        message: 'failed',
        result: result
      });
    });
  });
}); // end of the method

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
      name: updatedUser.name,
      type: updatedUser.type
    }, 'This-is-The-One-used-to-Enqript-this-code',
      {expiresIn: '23h'});
    res.json({
      message: 'successfully-Authenticated',
      token: token,
      expiresIn: 86400,
      user: {email: updatedUser.email, name: updatedUser.name, type: updatedUser.type, id: updatedUser._id}
    });
  }).catch(err => {
    console.log('Final error');
    return res.status(401).json({
      message: err
    });
  });
});

// router.delete('/delete/:email', (req, res, next) => {
//   User.deleteOne({email: req.params.email}).then((result) => {
//     console.log(result);
//   })
// });

module.exports = router;
