const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: 'sepalena@gmail.com' };
  await sgMail
    .send(mail)
    .then(() => {
      console.log('Email send successful');
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = {
  sendEmail
};
