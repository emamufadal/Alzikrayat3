const Joi = require('joi');
const fs = require('fs');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().max(50).required(),
  lastName: Joi.string().trim().max(50).required(),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).max(100).required(),
  location: Joi.string().trim().allow('').max(100),
  description: Joi.string().trim().allow('').max(500),
  occupation: Joi.string().trim().allow('').max(100),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

const photoSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().allow('').max(500),
});

const commentSchema = Joi.object({
  comment: Joi.string().trim().max(500).required(),
});

// returns a middleware that checks req.body against the given Joi schema
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      { ...req.body },
      { abortEarly: false, stripUnknown: true }
    );

    if (error) {
      // if a file was already saved by multer, remove it
      if (req.file) fs.unlink(req.file.path, () => {});
      const message = error.details.map((d) => d.message).join(', ');
      return res.status(400).json({ message });
    }

    req.body = value;
    next();
  };
}

module.exports = { validate, registerSchema, loginSchema, photoSchema, commentSchema };
