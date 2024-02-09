const jwt = require('jsonwebtoken');
const admins = require('../model/adminschema');

const adminmiddlware = async (req, res, next) => {
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
    const admin = await admins.findById(jwtResponse.adminid);

    if (!admin) {
      return res.status(401).json('admin not found');
    }

    req.payload = {
        adminid: jwtResponse.adminid,
    };
    next();
  } catch (err) {
    res.status(401).json('Authentication failed');
  }
};

module.exports = adminmiddlware;
