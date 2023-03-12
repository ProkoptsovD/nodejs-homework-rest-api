const express = require('express');
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateAvatarController
} = require('../../controllers/usersControllers');
const {
  isUserExists,
  validateUserFields,
  isUserNotExist
} = require('../../middleware/usersValidationMiddleware');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { uploadAvatar } = require('../../middleware/uploadAvatar');

const router = express.Router();

router.post('/signup', validateUserFields, isUserNotExist, registerUserController);
router.post('/login', validateUserFields, isUserExists, loginUserController);
router.get('/logout', authMiddleware, logoutUserController);
router.get('/current', authMiddleware, getCurrentUserController);
router.patch('/avatars', authMiddleware, uploadAvatar.single('avatar'), updateAvatarController);

module.exports = router;
