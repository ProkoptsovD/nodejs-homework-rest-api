const User = require('../models/User');
const { UnauthorizedError, BadRequestError } =  require('../errors/errors');
const { decodeAndVerifyToken } =  require('../utils/token');

const authMiddleware = async (req, _, next) => {
  const token = req.headers.authorization?.split(' ')[1] ?? '';

  if (!token) return next(new BadRequestError('Please, provide a token'));

  try {
    const decodedToken = decodeAndVerifyToken(token);
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) return next(new UnauthorizedError('Not authorized'));

    const doesTokenMatch = token === user.token;

    if(!doesTokenMatch) return next(new UnauthorizedError('Not authorized'));

    req.user = user;

    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'));
  }
};

module.exports = {
  authMiddleware
}
