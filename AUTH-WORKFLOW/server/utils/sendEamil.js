const nodemailer = require("nodemailer");
const nodemailerConfig = require("./NodemialerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"atah habibi " <atabhabibi@example.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
