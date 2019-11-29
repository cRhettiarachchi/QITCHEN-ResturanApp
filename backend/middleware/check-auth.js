const jwt = require('jsonwebtoken');

// Authentication middleware to check
  // if a valid token is passed
  // the user type if it is not an admin error will be passed
module.exports = (req, res, next) => {
  try { // getting the token from the front end and decode it
    const token = req.headers.authorization.split(" ")[1]; // split is because the format is bearer + ' ' token
    const authData = jwt.verify(token, 'This-is-The-One-used-to-Enqript-this-code'); // decoding the token
    if(authData.type !== 'admin') { // check if the token user type is admin
      return res.status(401).json({ // return the error
        error: 'Your are not admin' // error message
      });
    }
    next(); // if not an error get out of the middle ware
  } catch (err) { // if any else error throw the error
    res.status(401).json({
      error: err
    });
  }
};
