import viewingSessions from '../services/viewingSessionsServices'
import videoService from '../services/videoServices'
import response from '../helpers/response'
import fetch from 'node-fetch'
import jwt from '../helpers/jwt'

class viewingSession {
	static async createNewWatchCount(req, res, next) {
		try {
			const ip = req.headers.ip
			const clientId = req.query.clientId
			const videoId = req.query.videoId
			const token = req.headers.authorization.slice(7)
			const decoded = jwt.jwtVerify(token, process.env.SECRET)
			let data = req.body
			data.sessionState = 'Active'
			data.userId = decoded.email
			data.time = new Date().getTime()
			const locationServiceData = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`)
			const JsonlocationData = await locationServiceData.json()
			const status = await viewingSessions.getSesssionPerVideoUser(data.userId, videoId)
			if (Object.values(status).length > 0) {
				return next()
			} else {
				const results = await viewingSessions.registerViewingSessions({
					sessionState:'Active',
					userId : decoded.email,
					time : new Date().getTime(),
					location : JsonlocationData.country_name,
					ip :ip,
					clientId: clientId,
					videoId: videoId
				})
				const updates = await videoService.incrementWatchCountService(videoId);
				(results && updates) ? next(): response.errorResponse(res, 400, 'something went wrong', 'Can\'t get location')
			}
		} catch (error) {
			throw error
		}
	}
}
export default viewingSession