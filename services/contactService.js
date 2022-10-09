const Contact = require('../models/Contact');

const listAllContacts = () => Contact.find({});
const getContactById = (contactId) => Contact.findById(contactId);
const createContact = (contactData) => Contact.create(contactData);
const deleteContact = (contactId) => Contact.findByIdAndDelete(contactId);
const updateFavoriteContact = (contactId, { favorite }) =>
  Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );

  const updateContact = (contactId, contactData) =>
  Contact.findByIdAndUpdate(
    contactId,
    { $set: contactData },
    { new: true }
  );

module.exports = {
  listAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateFavoriteContact
}