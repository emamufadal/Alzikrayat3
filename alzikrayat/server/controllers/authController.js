const bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 10;

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const existing = await User.findOne({ email: req.body.email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'This email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create({ ...req.body, password: hashedPassword });

    // toJSON on the model removes the password field
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    const passwordOk = user && (await bcrypt.compare(req.body.password, user.password));

    if (!passwordOk) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};
