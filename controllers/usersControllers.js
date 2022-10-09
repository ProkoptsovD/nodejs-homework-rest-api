const {
  createUser,
  loginUser,
  logoutUser
} = require('../services/userService');

const { errorHandlerController } = require('../utils/errorHandler');
const { UnauthorizedError } = require('../errors/errors');
const { createToken } = require('../utils/token');

const registerUserController = async (req) => {
  const user = await createUser(req.body);

  const response = {
    user: {
      email: user.email,
      subscription: user.subscription
    }
  }

  return Promise.resolve(response);
};

const loginUserController = async (req, _, next) => {
  const { email, password } = req.body;
  
  const user = await loginUser(email);

  if(!user) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }
  
  const doesPasswordMatch = user.checkPassword(password);

  if(!doesPasswordMatch) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  const tokenPayload = {
    userId: user._id,
    email: user.email
  }
  const token = createToken(tokenPayload);

  user.token = token;
  await user.save();

  const response = {
    token, 
    user: {
      email: user.email,
      subscription: user.subscription
    }
  };
  
  return Promise.resolve(response);
};

const logoutUserController = async (req, _, next) => {
  const { _id, password } = req.user;
  
  const user = await logoutUser(_id);

  if(!user) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }
  
  const doesPasswordMatch = user.checkPassword(password);

  if(!doesPasswordMatch) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  user.token = null;
  await user.save();

  return Promise.resolve({});
};

const getCurrentUserController = async (req) => {
  const { email, subscription } = req?.user;

  return Promise.resolve({ email, subscription });
}

module.exports = {
  registerUserController: errorHandlerController(registerUserController, { status: 201 }),
  loginUserController: errorHandlerController(loginUserController),
  logoutUserController: errorHandlerController(logoutUserController, { status: 204 }),
  getCurrentUserController: errorHandlerController(getCurrentUserController)
}