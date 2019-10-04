import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class mailerMiddleware {
    static async mailer(emailTosend) {
        try {
            const options = {
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            };
            const client = await nodemailer.createTransport(options);
            await client.sendMail(emailTosend);
        } catch (error) {
            throw error;
        }
    }
}

export default mailerMiddleware;