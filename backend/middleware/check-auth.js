const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'This-is-The-One-used-to-Enqript-this-code');
    next();
  } catch (err) {
    res.status(401).json({
      error: err
    });
  }
};
