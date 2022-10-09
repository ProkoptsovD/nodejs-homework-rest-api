const express = require('express');
const { registerUserController, loginUserController, logoutUserController, getCurrentUserController } = require('../../controllers/usersControllers');
const { isUserExists, validateUserFields } = require('../../middleware/usersValidationMiddleware');
const { authMiddleware } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', validateUserFields, isUserExists, registerUserController);
router.post('/login', validateUserFields, isUserExists, loginUserController);
router.get('/logout', authMiddleware, logoutUserController);
router.get('/current', authMiddleware, getCurrentUserController);

module.exports = router;