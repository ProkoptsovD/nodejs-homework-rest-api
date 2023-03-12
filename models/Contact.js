const { Schema, SchemaTypes, model } = require('mongoose');

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone number for contact']
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  { timestamps: true }
)

const Contact = model('contact', contactSchema);

module.exports = Contact;