import tokenService from '../services/tokenService'
import sessionService from '../services/loginSessionServices'
import cp from '../services/cpServices'
import bcrypt from '../helpers/bcrypt'
import response from '../helpers/response'
import jwt from '../helpers/jwt'
import cry from '../helpers/crypto'
import mdw from '../helpers/mailer'
import Util from '../helpers/utilities'
import uuid from '../helpers/uuid'
import cloudinary from '../helpers/cloudinary'
const util = new Util()
//add an isVerified column to cp
class cpController {
	static async signupCp(req, res) {
		try {
			const newUser = req.body
            
			newUser.password = await bcrypt.encrypt(newUser.password)
			newUser.isVerified = false
			newUser.clientId = uuid.generator()
			const image = req.files.image
			const imageToUpload = await cloudinary(image.tempFilePath,'image')
			newUser.idLink = imageToUpload.url
			const checkUser = await cp.getCpByMail(newUser.email)
			if (checkUser != null) {
				util.setErrorResponse(res,'User already exists',422)
			} else {
				const createdUser = await cp.createNewCp(newUser)
				const part1 = cry.crypto()
				const token = jwt.jwtSign(`${part1}${newUser.email}`, process.env.SECRET,'1d')
				const tokenToSave = {
					email: newUser.email,
					token: token
    
				}
               
				await tokenService.createNewToken(tokenToSave, token)
				const emailTosend = {
					to: req.body.email,
					from: process.env.EMAIL_USER,
					subject: 'Please verify your email!',
					text: 'Dear ' + newUser.firstName + ' please follow this link to verify your email http://localhost:5000/cp/verify/?id=' + createdUser.id + '&&token=' + token,
				}
				await mdw.mailer(emailTosend)
				const userToken = jwt.jwtSign(createdUser.email, process.env.SECRET,'1d')
				createdUser.token = userToken
				delete createdUser.password
				util.setSuccessResponse(res,'Signed up successfully',201,createdUser)
                
			}
        
		} catch (error) {
			util.setErrorResponse(res, 'Something went wrong '+error.message, 500)
		}
	}
	static async verify(req, res) {
		try {
			const { id } = req.query
			const { token } = req.query
			const user = await cp.getCpById(id)
			if (!user) return response.errorResponse(res, 404, 'User not found ')
			jwt.jwtVerify(token, process.env.SECRET)
			const newUser = {
				isVerified: true
			}
			await tokenService.destroyToken(token)
			const updatedUser = await cp.updateCp(id, newUser)
			const emailTosend = {
				to: user.email,
				from: process.env.EMAIL_USER,
				subject: 'CINETIE email verification',
				text: 'Dear ' + user.name + ' Your Email has been verified successfully '
			}
			await mdw.mailer(emailTosend)
			delete updatedUser.password
			res.redirect('https://www.google.com')
		} catch (error) {
			util.setErrorResponse(res, 'Something went wrong '+error.message, 500)
		}
	}
	static async loginUser(req, res) {
		try {
            
			const user = await cp.getCpByMail(req.body.email)
			const status = bcrypt.compare(req.body.password, user.password)
			if (!status || !user) util.setErrorResponse(res, 'Invalid email or password!', 400)
			if (!user.isVerified) util.setErrorResponse(res, 'Verify your account first!', 401)
			const token = jwt.jwtSign({key:cry.crypto(),email:user.email,clientId:user.clientId}, process.env.SECRET,'1d')
			user.token = token
			delete user.password
			const date = new Date()
			const session = {
				email:user.email,
				date:date.toDateString(),
				timeIn:date.toTimeString(),
				timeOut:null,
				state:'in'
			}
			const addedSession = await sessionService.addSession(session)
			if(!addedSession)util.setErrorResponse(res,'Can\'t register session',500)
			util.setSuccessResponse(res, 'Logged in successfully!', 200,token)
		} catch (error) {
			util.setErrorResponse(res,'Something Went wrong logging in '+error.message,500)
		}
	}
	static async forgotPassword(req, res) {
		try {
			const user = await cp.getCpByMail(req.body.email)
			if (!user) return response.errorResponse(res, 404, 'User not found! '+JSON.stringify(user))
			const token = jwt.jwtSign(`${cry.crypto()}${user.firstName}`, process.env.SECRET,'1d')
			const emailTosend = {
				to: req.body.email,
				from: process.env.EMAIL_USER,
				template: 'forgot-password',
				subject: 'Password help has arrived!',
				text: 'Dear ' + user.name + ' please follow this link to reset your password http://localhost:5000/auth/reset_password/?id=' + user.id + '&&token=' + token + '',
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
			const user_ = cp.getCpById(id)
			if (!user_) response.errorResponse(res, 404, 'User not found!', 'NotFoundError')
			const hash = bcrypt.encrypt(req.body.password)
			const newPass = {
				password: hash
			}
			await cp.updateCp(id, newPass)
			response.successResponse(res, 200, 'Password reset successfully!')
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong!', error)
		}
	}
	static async socialLogin(req, res) {
		try {
			let user = await cp.getCpByMail(req.user.email)
			if (!user) user = await cp.createNewCp(req.user, req.user.email)
			let token =  jwt.jwtSign(user.email, process.env.SECRET,'1d')
			user.token = token
			response.successResponse(res, 200, 'Logged in successfully', user)
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong!', error.message)
		}
	}
	static async deleteAccount(req, res) {
		try {
            
			const token = req.headers.authorization.slice(7)
			const { email } = jwt.jwtVerify(token, process.env.SECRET)
			const status = await cp.deleteCp(email)
			status !=0 ? util.setSuccessResponse(res,'deleted successfully',200,status) : util.setErrorResponse(res,'An error occured',422)
		} catch (error) {
			util.setErrorResponse(res,'An error occured : ' + error,522)
		}
	}
	static async updateAccount(req,res){
		try {
			const token = req.headers.authorization.slice(7)
			const { email } = jwt.jwtVerify(token, process.env.SECRET)
			const  newInfo = req.body
			const updated =  await cp.updateCp(email,newInfo)
			updated !=0  ? util.setSuccessResponse(res,'updated successfully',200,updated) : util.setErrorResponse(res,'An error occured',422)
		} catch (error) {
			util.setErrorResponse(res,error,522)
		}
	}
	static async getAllAccounts(req,res){
        
		try {
			const users = await cp.getAllCps()
			response.successResponse(res,200,'List of users',users)
		} catch (error) {
			util.setErrorResponse(res,error,503)
		}
	}

}

export default cpController