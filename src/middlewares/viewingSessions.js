/* eslint-disable no-useless-catch */
import viewingSessions from '../services/viewingSessionsServices'
import videoService from '../services/videoServices'
import response from '../helpers/response'
import fetch from 'node-fetch'
import jwt from '../helpers/jwt'

class viewingSession {
	static async createNewWatchCount(req, res, next) {
		try {
			const ip = req.headers.ip
			const { id } = req.query
			const videoId = id
			const videoData = await videoService.getVideoById(videoId)
			console.log(JSON.stringify(videoData.videoClientId))
			const token = req.headers.authorization.slice(7)
			const decoded = jwt.jwtVerify(token, process.env.SECRET)
			let data = req.body
			data.sessionState = 'Active'
			data.userId = decoded.email
			data.time = new Date().getTime()
			const locationServiceData = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`)
			const JsonlocationData = await locationServiceData.json()
			const results = await viewingSessions.registerViewingSessions({
				sessionState: 'Active',
				userId: decoded.email,
				time: new Date().getTime(),
				location: JsonlocationData.country_name,
				ip: ip,
				clientId: videoData.videoClientId,
				videoId: videoId
			})
			const updates = await videoService.incrementWatchCountService(videoId);
			(results && updates) ? next() : response.errorResponse(res, 400, 'something went wrong', 'Can\'t get location')

		} catch (error) {
			throw error
		}
	}
}
export default viewingSession