const User = require('../models/User');

const createUser = ({ email, password }) => User.create({ email, password });
const loginUser = (email) => User.findOne({ email });
const logoutUser = (userId) => User.findById(userId);
const getAndUpdateUser = (_id, { avatarURL }) => User.findByIdAndUpdate(_id, { avatarURL });
const getUserByEmail = (email) => User.findOne({ email });
const getUserByVerificationToken = (token) => User.findOne({ verificationToken: token });
const updateVerificationToken = (_id, { verify, verificationToken }) =>
  User.findByIdAndUpdate(_id, { verify, verificationToken });

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAndUpdateUser,
  getUserByEmail,
  getUserByVerificationToken,
  updateVerificationToken
};
