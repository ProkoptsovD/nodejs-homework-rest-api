const express = require('express');
const {
  listContactsController,
  getContactByIdController,
  addContactContoller,
  removeContactController,
  updateContactController,
  updateFavoriteContactController
} = require('../../controllers/contactsControllers');

const { isExist, validateContactFields } = require('../../middleware/contactsValidationMiddlware');

const router = express.Router();

router.get('/', listContactsController);

router.get('/:contactId', isExist('contactId'), getContactByIdController);

router.post('/', isExist('body'), validateContactFields, addContactContoller);

router.delete('/:contactId', isExist('contactId'), removeContactController);

router.put('/:contactId',
  isExist('contactId'),
  isExist('body'),
  validateContactFields,
  updateContactController
);

router.patch('/:contactId/favorite',
  isExist('contactId'),
  isExist('favorite'),
  updateFavoriteContactController
);

module.exports = router;
