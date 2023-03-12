const { userValidationSchema } = require('../validation/userValidation');
const { ValidationError, ConflictError } = require('../errors/errors');
const User = require('../models/User');

const validateUserFields = (req, _, next) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    return next(new ValidationError(message));
  }

  return next();
};

const isUserExists = async (req, _, next) => {
  const { email } = req.body;

  try {
    const hasEmail = await User.exists({ email });

    if (!hasEmail) {
      return next(new ConflictError(`There is no a user with such email`));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const isUserNotExist = async (req, _, next) => {
  const { email } = req.body;

  try {
    const hasEmail = await User.exists({ email });

    if (hasEmail) {
      return next(new ConflictError(`Email is in use`));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateUserFields,
  isUserExists,
  isUserNotExist
};
