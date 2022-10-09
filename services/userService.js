const User = require('../models/User');

const createUser = ({ email, password }) => User.create({ email, password });
const loginUser = (email) => User.findOne({ email });
const logoutUser = (userId) => User.findById(userId);

module.exports = {
  createUser,
  loginUser,
  logoutUser
}