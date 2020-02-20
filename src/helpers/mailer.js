/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import dotenv from 'dotenv'
import ejs from 'ejs'
import nodemailer from 'nodemailer'

dotenv.config()

const mailer = async (emailToSend) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SENDGRID_USER,
				pass: process.env.SENDGRID_PASS
			}
		})console.log(2.0)
		const { path } = emailToSend[2]
		ejs.renderFile(path, emailToSend[0], (error, data) => {
			if (error) {
				return error
			} else {
				const emailOptions = {
					from: emailToSend[1].from,
					to: emailToSend[1].to,
					subject: emailToSend[1].subject,
					html: data
				}console.log(2.1)
				transporter.sendMail(emailOptions,(err,status)=>{
					if(err){
						console.log(2.9)
						console.log(err)
					}else{
						console.log(3.1)
						console.log(status)
					}
				})
					// // .then(() => console.log('sent email'))
					// .catch(() => error)
			}
		})
	} catch (error) {
		throw error
	}
}

export default mailer
