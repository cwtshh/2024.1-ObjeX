const nodemailer = require('nodemailer');
const email = process.env.NODEMAILER_MAIL;
const pass = process.env.NODEMAILER_PASS;

const send_mail = async (receiver, subject, text) => {
  const mailOptions = {
    from: email,
    to: receiver,
    subject: subject,
    html: text,
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: email,
        pass: pass,
    }
  });
  
  try {
    let info = await transporter.sendMail(mailOptions);

    console.log('Email enviado: ' + info.response);

    return info;
  } catch(error){
    console.log('Falha ao enviar email: ' + error);
    
    throw error;
  }
}

module.exports = send_mail;