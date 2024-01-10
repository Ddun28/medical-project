const jwt = require('jsonwebtoken');
const User = require('../model/user');

const adminExtractor = async (request, response, next) => {
  try {
    const token = request.cookies?.accessToken;
    if (!token) {
      return response.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    request.user = user;

    if (user.rol !== 'Admin') {
      return response.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    return response.sendStatus(403);
  }


  next();
};

module.exports = { adminExtractor };