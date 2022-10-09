const bcrypt = require('bcryptjs');

const salt = Number(process.env.SALT) ?? 10;

const encryptPassword = (password) => bcrypt.hash(password, salt);
const decryptPassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  encryptPassword,
  decryptPassword
}
