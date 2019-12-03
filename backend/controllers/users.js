const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => { // encrypting the password
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name
    });
    user.save().then((result) => { // save the user as a new user
      res.json({
        id: result._id,
        name: result.name,
        type: result.type,
        email: result.email
      });
    }).catch(result => { // catch to catch any errors ps: the errors are not handle properly in the front end
      res.json({
        message: 'failed',
        result: result
      });
    });
  });
};

exports.loginUser = (req, res, next) => {
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
};
