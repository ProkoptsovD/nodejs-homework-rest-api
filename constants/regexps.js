const emailRegExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
// eslint-disable-next-line no-useless-escape
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

module.exports = {
    emailRegExp,
    phoneRegExp
}