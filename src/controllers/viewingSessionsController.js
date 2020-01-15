import viewingSessions from '../services/viewingSessionsServices'
import response from '../helpers/response'
import Util from '../helpers/utilities'
const util = new Util()
class viewingSessionController {

	static async getSpecificSessions(req, res) {
		try {
			const {
				videoId
			} = req.query
			const raw = await viewingSessions.getSessionsPerVideo(videoId)
			const data = [{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Mexico',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'New York',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Kigali',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Kigali',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Kigali',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Kigali',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Vancouver',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Vancouver',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			},
			{
				'id': 7,
				'videoId': '848f1864-2161-414b-bc5a-06dc9cacf317',
				'clientId': '91e3ff0e-c8c3-455c-bdec-dad91883061a',
				'time': '1578988452709',
				'sessionState': 'Active',
				'userId': 'janethdoe@gmail.com',
				'location': 'Vancouver',
				'ip': '187.243.2.74',
				'createdAt': '2020-01-14T07:54:12.711Z',
				'updatedAt': '2020-01-14T07:54:12.711Z'
			}
			]
			let cities = []
			for (let i = 0; i < raw.length; i++) {
				let count = 0
				for (let j = 0; j < raw.length; j++) {
					var location = raw[i].location
					if (raw[i].location == raw[j].location) {
						count += 1
					}
				}
				var obj = {
					city: location,
					count: count
				}
				cities.push(obj)

			}
			let formattedArray = util.getUnique(cities,'city')
			
			if (Object.values(raw).length > 0) {
				return response.successResponse(res, 200, 'Found details', formattedArray)
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