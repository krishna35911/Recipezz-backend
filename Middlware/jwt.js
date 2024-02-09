const jwt = require('jsonwebtoken');
const users = require('../model/userschema');

const jwtMiddleware = async (req, res, next) => {
  console.log('inside jwt middleware');

  // Check if 'authorization' header exists
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(401).json('Authorization header missing');
  }

  // Extract token from the header
  const token = tokenHeader.split(' ')[1];
  console.log(token);

  try {
    const jwtResponse = jwt.verify(token, 'krishnasecretkey');
    const user = await users.findById(jwtResponse.userid);

    if (!user) {
      return res.status(401).json('User not found');
    }

    req.payload = {
      userid: jwtResponse.userid,
      username: user.username,
    };
    next();
  } catch (err) {
    res.status(401).json('Authentication failed');
  }
};

module.exports = jwtMiddleware;
