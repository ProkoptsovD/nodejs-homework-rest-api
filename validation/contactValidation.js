const Joi = require('joi');
const { phoneRegExp } = require('../constants/regexps');

const contactValidationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean(),
});

module.exports = {
  contactValidationSchema
}