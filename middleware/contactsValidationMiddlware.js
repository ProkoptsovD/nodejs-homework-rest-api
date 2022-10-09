const { isValidObjectId } = require('mongoose');
const { BadRequestError, ValidationError } = require('../errors/errors');
const { contactValidationSchema } = require('../validation/contactValidation');
const { errorHandlerAsync } = require('../utils/errorHandler');
const Contact = require('../models/Contact');

const validateContactFields = (req, _, next) => {
    const { error } = contactValidationSchema.validate(req.body);

    if(error) {
        const { message } = error.details[0];
        return next(
            new ValidationError(message)
        );
    }

    next();
};

const isExist = (param) => 
    async (req, _, next) => {
        switch(param) {
            case 'body': {
                const hasBody = !!req.body;

                return hasBody ? next() : next(new BadRequestError('Request must contain body'));
            }
            case 'favorite': {
                const { favorite } = req.body;

                return favorite ? next() : next(new BadRequestError('Body must contain favorite'));
            }
            case 'contactId': {
                const { contactId } = req.params;

                if(!contactId) {
                    return next(new BadRequestError('Please, provide contact id'))
                }

                const isValidId = isValidObjectId(contactId);

                if (!isValidId) {
                    return next(new ValidationError('Invalid contact id'));
                }

                const hasId = await errorHandlerAsync(Contact.exists.bind(Contact, { _id: contactId }))();

                return hasId ? next() : next(new BadRequestError(`There no contact with such an id ${contactId}`));
            }
            default:
                throw new Error('Unssupported validation key was passed');
        }
    }

module.exports = {
    validateContactFields,
    isExist
};