const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const gravatar = require('gravatar');

const { createUser, loginUser, logoutUser, getAndUpdateUser } = require('../services/userService');

const { errorHandlerController } = require('../utils/errorHandler');
const { UnauthorizedError } = require('../errors/errors');
const { createToken } = require('../utils/token');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const registerUserController = async (req) => {
  const user = await createUser(req.body);
  const avatarURL = gravatar.url(req.body.email);

  const response = {
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL
    }
  };

  return Promise.resolve(response);
};

const loginUserController = async (req, _, next) => {
  const { email, password } = req.body;

  const user = await loginUser(email);

  if (!user) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  const doesPasswordMatch = user.checkPassword(password);

  if (!doesPasswordMatch) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  const tokenPayload = {
    userId: user._id,
    email: user.email
  };
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

  if (!user) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  const doesPasswordMatch = user.checkPassword(password);

  if (!doesPasswordMatch) {
    return next(new UnauthorizedError('Email or password is wrong'));
  }

  user.token = null;
  await user.save();

  return Promise.resolve({});
};

const getCurrentUserController = async (req) => {
  const { email, subscription } = req?.user;

  return Promise.resolve({ email, subscription });
};

const updateAvatarController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload } = req.file;

    const img = await Jimp.read(tempUpload);

    img.cover(250, 250).write(tempUpload);

    const extention = tempUpload.split('.').pop();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', resultUpload);
    await getAndUpdateUser(_id, { avatarURL });
    return res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    return next(error);
  }
};

module.exports = {
  registerUserController: errorHandlerController(registerUserController, { status: 201 }),
  loginUserController: errorHandlerController(loginUserController),
  logoutUserController: errorHandlerController(logoutUserController, { status: 204 }),
  getCurrentUserController: errorHandlerController(getCurrentUserController),
  updateAvatarController: errorHandlerController(updateAvatarController)
};
