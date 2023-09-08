("use strict");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailfence.com",
  port: 465,
  secure: true,
  auth: {
    user: "renatehem@mailfence.com",
    pass: "Nodemailer_1234",
  },
  tls: { rejectUnauthorized: false },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"Renate😉" <renatehem@mailfence.com>',
    to: "io@nettburau.no",
    subject: "Data verified ✔",
    text: "Data is verified",
    html: "<b>Hello world</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

module.exports = {
  sendVerificationEmail: main,
};
