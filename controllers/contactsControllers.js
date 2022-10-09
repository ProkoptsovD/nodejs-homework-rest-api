const {
    listAllContacts,
    getContactById,
    createContact,
    updateContact,
    updateFavoriteContact,
    deleteContact
} = require('../services/contactService');

const { errorHandlerController } = require('../utils/errorHandler');
const { wrapperFactory } = require('../utils/wrapperFactory');

const listContactsController = () => listAllContacts();
const getContactByIdController = (req) => getContactById(req.params.contactId); 
const addContactContoller = (req) => createContact(req.body);
const removeContactController = (req) => deleteContact(req.params.contactId);
const updateContactController = (req) => updateContact(req.params.contactId, req.body);
const updateFavoriteContactController = (req) => updateFavoriteContact(req.params.contactId, req.body);

module.exports = {
    ...wrapperFactory(
        errorHandlerController,
        listContactsController,
        getContactByIdController,
        addContactContoller,
        removeContactController,
        updateContactController,
        updateFavoriteContactController
    )
}