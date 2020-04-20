"use strict";
const nodemailer = require("nodemailer");
const template = require('./templates');
const config = require('./config');

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = async(email) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.credentials.email, // generated ethereal user
      pass: config.credentials.password // generated ethereal password
    }
  });

  console.log("FROM ",config.credentials.email);
  console.log("PASS",config.credentials.password);
  console.log("TO ",email);
  // setup email data with unicode symbols
  let mailOptions = {
    from: config.credentials.email, // sender address
    to: email, // list of receivers
    subject: 'Welcome' , // Subject line
    text: "It's good see you with us!", // plain text body
    html: template.welcome // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

