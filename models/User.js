const { Schema, model } = require('mongoose');
const { encryptPassword, decryptPassword } = require('../utils/hashPassword');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String
      // required: [true, 'Avatar is required']
    },
    verify: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required']
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await encryptPassword(this.password);
  }
});

userSchema.methods.checkPassword = async function (password) {
  const isMatch = await decryptPassword(password, this.password);

  return isMatch;
};

userSchema.methods.getId = async function () {
  return this._id;
};

const User = model('user', userSchema);

module.exports = User;
