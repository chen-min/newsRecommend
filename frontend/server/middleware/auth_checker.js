const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
  // console.log('auth_checker: req: ' + req.headers);
  // console.log(jwt,'jwt')
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  console.log(req.headers.authorization,'req.headers.authorization..............')
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  console.log(token, '获取到的token......')
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { 
      return res.status(401).end(); }

    const id = decoded.sub;

    // check if a user exists
    return User.findById(id, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
});
};