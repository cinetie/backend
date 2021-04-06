/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import dotenv from "dotenv";
import ejs from "ejs";
import nodemailer from "nodemailer";

dotenv.config();

const mailer = async (emailToSend) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS,
      },
    });
    const { body } = emailToSend[1];

    const emailOptions = {
      from: '"Cinetie Support" <support@cinetie.com>',
      to: emailToSend[0].to,
      subject: emailToSend[0].subject,
      html: body,
    };
    return transporter
      .sendMail(emailOptions)
      .then((success) => success)
      .catch((err) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export default mailer;
