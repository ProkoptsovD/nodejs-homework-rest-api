const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    from: 'sepalena@gmail.com',
    subject: 'Email verification',
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank"><strong>Please verify email</strong></a>`
  };

  return mail;
};

module.exports = {
  createVerifyEmail
};
