const nodemailer = require('nodemailer');
const email = process.env.nodemailer_email;
const pass = process.env.nodemailer_pass;


const send_mail = (receiver, subject, text) => {

  const mailOptions = {
    from: process.env.nodemailer_email,
    to: receiver,
    subject: subject,
    text: text,
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: email,
        pass: pass,
    }
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
  });

}

module.exports = send_mail;