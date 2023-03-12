const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required()
});

module.exports = {
  userValidationSchema
};
