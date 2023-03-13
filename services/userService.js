const User = require('../models/User');

const createUser = ({ email, password }) => User.create({ email, password });
const loginUser = (email) => User.findOne({ email });
const logoutUser = (userId) => User.findById(userId);
const getAndUpdateUser = (_id, { avatarURL }) => User.findByIdAndUpdate(_id, { avatarURL });

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAndUpdateUser
};
