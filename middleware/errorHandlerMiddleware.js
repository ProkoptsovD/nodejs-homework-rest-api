const {
  BadRequestError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError
} = require('../errors/errors');

const errorHandlerMiddleware = (err, _, res, __) => {
  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof ValidationError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
  // return res.status(500).json({ message: 'Internal server error' });
};

module.exports = {
  errorHandlerMiddleware
};
