import viewingSessions from '../services/viewingSessionsServices'
import response from '../helpers/response'

class viewingSessionController {

	static async getSpecificSessions(req, res) {
		try {
			const { videoId } = req.query
			const data = await viewingSessions.getSessionsPerVideo(videoId)
			console.log(JSON.stringify(data))
			if (Object.values(data).length >0) {
				return response.successResponse(res, 200, 'Found details', data)
			} else {

				return response.errorResponse(res, 404, 'something went wrong', 'NotFoundError ')
			}
		} catch (error) {
			return response.errorResponse(res, 503, 'something went wrong', 'ServerError')
		}
	}
	static async getAllSessionsPerUser(req, res) {
		try {
			const {
				userId
			} = req.query
			const data = await viewingSessions.getSessionsPerUser(userId)
			if (data) {
				return response.successResponse(res, 200, 'Found Data', data)
			} else {
				return response.errorResponse(res, 404, 'Data was not found', 'NotFoundError')
			}
		} catch (error) {
			return response.errorResponse(res, 404, 'Data was not found', 'NotFoundError')
		}
	}
}
export default viewingSessionController