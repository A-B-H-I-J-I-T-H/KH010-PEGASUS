// utils/emailSender.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Retrieve email address from environment variable
      pass: process.env.EMAIL_PASSWORD // Retrieve email password from environment variable
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Retrieve email address from environment variable
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
};

module.exports = sendEmail;
