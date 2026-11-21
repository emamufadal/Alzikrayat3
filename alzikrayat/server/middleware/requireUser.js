const mongoose = require('mongoose');
const User = require('../models/User');

// Basic auth for this project: the client sends the logged-in user's id
// in the "x-user-id" header and we check that the user really exists.
// (JWT tokens are left for the optional Project 4.)
module.exports = async (req, res, next) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Please login first' });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
