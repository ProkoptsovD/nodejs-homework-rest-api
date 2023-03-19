const Joi = require('joi');
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().trim().pattern(emailRegexp).required()
});

module.exports = {
  verifyEmailSchema
};
