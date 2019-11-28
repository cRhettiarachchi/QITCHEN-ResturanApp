const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const authData = jwt.verify(token, 'This-is-The-One-used-to-Enqript-this-code');
    if(authData.type !== 'admin') {
      return res.status(401).json({
        error: 'Your are not admin'
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      error: err
    });
  }
};
