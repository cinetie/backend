/* eslint-disable quotes */
import userService from '../services/userServices'
import tokenService from '../services/tokenService'
import billingServices from '../services/billingServices'
import sessionService from '../services/loginSessionServices'
import payment from '../helpers/payment'
import bcrypt from '../helpers/bcrypt'
import response from '../helpers/response'
import jwt from '../helpers/jwt'
import cry from '../helpers/crypto'
import mdw from '../helpers/mailer'
import Util from '../helpers/utilities'
import date from '../helpers/date'
const util = new Util()
class userController {
	static async signupUser(req, res) {
		try {
			const newUser = req.body
			newUser.password = await bcrypt.encrypt(newUser.password)
			newUser.isVerified = false
			newUser.plan = "Setup"
			const search = await userService.getUserByMail(newUser.email)
			if(search)util.setErrorResponse(res,"user already exists",403)
			const createdUser = await userService.createNewUser(newUser)
			const part1 = cry.crypto()
			const token = jwt.jwtSign(`${part1}${newUser.email}`, process.env.SECRET, '1d')
			const tokenToSave = {
				email: newUser.email,
				token: token,
				desc: 'Login-Active'

			}
			await tokenService.createNewToken(tokenToSave, token)
			const emailTosend = {
				to: req.body.email,
				from: process.env.EMAIL_USER,
				subject: 'CINETIE - Please verify your email!',
				text: 'Dear ' + newUser.firstName + ' please follow this link to verify your email http://localhost:5000/auth/verify/?id=' + createdUser.id + '&&token=' + token,
			}
			await mdw.mailer(emailTosend)
			const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET, '1d')
			createdUser.token = userToken
			delete createdUser.password
			util.setSuccessResponse(res, 'Signed up successfully', 201, createdUser)

		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
	static async verify(req, res) {
		try {
			const { id } = req.query
			const { token } = req.query
			const decoded = jwt.jwtVerify(token,process.env.SECRET)
			const user = await userService.getUserById(id)
			if (!user) response.errorResponse(res, 404, 'User not found')
			jwt.jwtVerify(token, process.env.SECRET)
			const newUser = {
				isVerified: true
			}
			await tokenService.destroyToken(token)
			const updatedUser = await userService.updateUser(decoded, newUser)
			if(!updatedUser) util.setErrorResponse(res,`Can't verify user ${decoded}`,400)
			const emailTosend = {
				to: user.email,
				from: process.env.EMAIL_USER,
				subject: 'Success email has been verified',
				text: 'Dear ' + user.lastName + ' Your Email has been verified successfully '
			}
			await mdw.mailer(emailTosend)
			res.redirect('https://www.google.com')
		} catch (error) {
			util.setErrorResponse(res, `Something went wrong ${error.message}`, 500)
		}
	}
	static async loginUser(req, res) {
		try {

			const user = await userService.getUserByMail(req.body.email)
			const status = bcrypt.compare(req.body.password, user.password)
			if (!status || !user) util.setErrorResponse(res, 'Invalid email or password!', 400)
			if (!user.isVerified) util.setErrorResponse(res, 'Verify your account first!', 401)
			const token = jwt.jwtSign({
				key: cry.crypto(),
				email: req.body.email
			}, process.env.SECRET, '1d')
			user.token = token
			delete user.password
			const date = new Date()
			const session = {
				email: user.email,
				date: date.toDateString(),
				timeIn: date.toTimeString(),
				timeOut: null,
				state: 'in'
			}
			const addedSession = await sessionService.addSession(session)
			if (!addedSession) util.setErrorResponse(res, 'Can\'t register session', 500)
			util.setSuccessResponse(res, 'Logged in successfully!', 200, token)
		} catch (error) {
			util.setErrorResponse(res, 'Something Went wrong logging in ' + error, 500)
		}
	}
	static async forgotPassword(req, res) {
		try {
			const user = await userService.getUserByMail(req.body.email)
			if (!user) response.errorResponse(res, 404, 'User not found!')
			const token = jwt.jwtSign(`${cry.crypto()}${user.firstName}`, process.env.SECRET, '1d')
			const emailTosend = {
				to: req.body.email,
				from: process.env.EMAIL_USER,
				template: 'forgot-password',
				subject: 'Password help has arrived!',
				text: 'Dear ' + user.firstName + ' please follow this link to reset your password http://localhost:5000/auth/reset_password/?id=' + user.id + '&&token=' + token + '',
			}
			await mdw.mailer(emailTosend)
			response.successResponse(res, 200, 'Reset password link sent successfully!')
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong!', error)
		}
	}
	static async resetPassword(req, res) {
		try {
			const token = req.query.token
			const id = req.query.id
			jwt.jwtVerify(token, process.env.SECRET)
			const user_ = userService.getUserById(id)
			if (!user_) response.errorResponse(res, 404, 'User not found!', 'user undefined')
			const hash = bcrypt.encrypt(req.body.password)
			const newPass = {
				password: hash
			}
			await userService.updateUser(id, newPass)
			response.successResponse(res, 200, 'Password reset successfully!')
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong!', error)
		}
	}
	static async socialLogin(req, res) {
		try {
			let message;
			let code;
			let user = await userService.getUserByMail(req.user.email)
			if (!user) {
				message = 'Signed Up';
				code = 201;
				user = await userService.createNewUser(req.user, req.user.email);
			} else {
				message = 'Logged In';
				code = 200;
			}
			const token = await jwt.jwtSign({
				key: cry.crypto(),
				email: req.user.email
			}, process.env.SECRET, '1d')
			res.redirect(`https://cinetie-frontend.herokuapp.com/social_auth?token=${token}`)
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong!', error.message)
		}
	}
	static async deleteAccount(req, res) {
		try {

			const {
				id
			} = req.query
			const status = await userService.deleteUser(id)
			status != 0 ? util.setSuccessResponse(res, 'deleted successfully', 200, status) : util.setErrorResponse(res, 'An error occured', 422)
		} catch (error) {
			util.setErrorResponse(res, 'An error occured : ' + error, 522)
		}
	}
	static async updateAccount(req, res) {
		try {
			const {
				id
			} = req.query
			const newInfo = req.body
			const updated = await userService.updateUser(id, newInfo)
			updated != 0 ? util.setSuccessResponse(res, 'updated successfully', 200, updated) : util.setErrorResponse(res, 'An error occured', 422)
		} catch (error) {
			util.setErrorResponse(res, error, 522)
		}
	}
	static async updateAccountAndSubscription(req, res) {
		try {
			const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET)
			const newInfo = req.body
			const subscriptionData = {
				paymentMethod: newInfo.paymentMethod,
				email: email,
				plan: newInfo.plan,
				phoneNumber: newInfo.phoneNumber,
				isBilledAnnually: newInfo.isBilledAnnually,
			}
			
			//check if there is a current subscription
			const currentSubsctption = await billingServices.getCurrentSubscription(email)
			if(Object.values(currentSubsctption).length === 0){
				const paymentDetails = await payment.registerNewSubscription(subscriptionData)
				console.log('here')
				let frequency = 0
				if (newInfo.isBilledAnnually === true) {
					frequency = "YEAR"
				} else {
					frequency = "MONTH"
				}
				const paymentData = {
					user: {
						"email": email,
						"paymentMethod": newInfo.paymentMethod,
						"isBilledAnnually": newInfo.isBilledAnnually,
						"plan": newInfo.plan
					},
					opay: {
						"price": paymentDetails.price,
						"phoneNumber": newInfo.phoneNumber
					},
					paypal: {
						"plan": newInfo.plan,
						"price": paymentDetails.price,
						"frequency": frequency,
						"currency": "USD",
						"total": paymentDetails.price,
						"urls": {
							"success": `${process.env.PAYPAL_SUCCESS}?user=${jwt.jwtSign(email,process.env.SECRET)}`,
							"failOrCancel": process.env.PAYPAL_FAIL_CANCEL
						}
					}
				}
				const response = await userService.updateUser(email, newInfo)
				if(newInfo.paymentMethod) {
					await payment.commitPayment(req,res,paymentData)
				}else{
					util.setSuccessResponse(res, 'Payment done successfully', 200, response[1][0])
				}
			}else{
				util.setErrorResponse(res,'user has already a current subscription',422)
			}
			
			// (paymentDetails && updates) ? util.setSuccessResponse(res, 'User updated easily', 201, { 'user': updates, 'paymentDetails': paymentDetails }) : util.setErrorResponse(res, 'user didn\'t update easily', 400)
		} catch (error) {
			util.setErrorResponse(res, error.message, 522)
		}
	}
	static async getAllAccounts(req, res) {

		try {
			const users = await userService.getAllUsers()
			response.successResponse(res, 200, 'List of users', users)
		} catch (error) {
			util.setErrorResponse(res, error, 503)
		}
	}
	static async getSubscribersInRange(req, res) {
		try {
			//in Milliseconds since epoch.
			const start = date.convertToTimestamp(req.body.start)
			const end = date.convertToTimestamp(req.body.end)
			const data = await billingServices.getMonthlySubscribers(start, end)
			if (Object.values(data).length > 0) {
				util.setSuccessResponse(res, 'Data was found', 200, Object.values(data).length)
			} else {
				util.setErrorResponse(res, 'Data was not found', 400)
			}

		} catch (error) {
			return response.errorResponse(res, 500, 'Something wrong happened ' + error.message, error)
		}
	}
	static async getLiveUsers(req, res) {
		try {
			const data = await sessionService.getLiveSessions();
			(data) ? util.setSuccessResponse(res, 'Found ', 200, Object.values(data).length) : util.setErrorResponse(res, 'Can\'t find Live users ' + JSON.stringify(data), 404)
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}

	static async getUserByEmail(req, res) {
		try {
			const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET)
			const user = await userService.getUserByMail(decoded.email);
			(user) ? util.setSuccessResponse(res, 'Found', 200, user) : util.setErrorResponse(res, 'Data not found', 404)
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}

	static async getUserProfile(req, res) {
		const { email } = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET)
		const response = await userService.getUser(email)
		util.setSuccessResponse(res, 'Found', 200, response)
	}
}

export default userController
