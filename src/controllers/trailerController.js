import Util from '../helpers/utilities'
import trailerServices from '../services/trailerService'
import googleCloud from '../helpers/google.cloud.normal'
// import aws from '../helpers/aws'
// import multer from 'multer'
// const upload = multer({dest: '../../uploads'})
const util = new Util()

class trailerController {

	static async createNewTrailer(req, res) {
		try {
			const data = req.body
			const file = req.files.trailer
			console.log(JSON.stringify(file))
			await googleCloud.uploadToGoogleCloud('cinetie', file)
				.then(async(uri) => {
					if(!uri) util.setErrorResponse(res,'An error occured updating the trailer trailer',422)
					data.trailerLink = uri
					const uploadedTrailer = await trailerServices.createNewTrailers(data)
					if(!uploadedTrailer) util.setErrorResponse(res,'An error occured saving the trailer',422)
					util.setSuccessResponse(res,'successfully saved the trailer',201,uploadedTrailer) 
				})

			await aws.uploadSingleFile()


		} catch (error) {
			util.setErrorResponse(res, 'Something wrong happened' + error.message, 500)
		}
	}
	static async getAllTrailersPerVideo(req, res) {
		try {
			const { id } = req.query
			const trailer = await trailerServices.getAllTrailers(id)
			if (!trailer) util.setErrorResponse(res, 'An error occured getting desired trailer', 404)
			util.setSuccessResponse(res, 'Found', 200, trailer)
		} catch (error) {
			util.setErrorResponse(res, 'Something wrong happened' + error.message, 500)
		}
	}
	static async getAllTrailerController(req, res) {
		try {
			const trailers = await trailerServices.getAllTrailers()
			if (trailers) {
				util.setSuccessResponse(res, 'Found', 200, trailers)
			} else {
				util.setErrorResponse(res, 'No trailers available', 404)
			}
		} catch (error) {
			util.setErrorResponse(res, `something happened ${error.message}`, 503)
		}
	}
	static async getParticularTrailerController(req, res) {
		try {
			const trailers = await trailerServices.getAllTrailers(req.query.videoId)
			if (trailers) {
				util.setSuccessResponse(res, 'Found', 200, trailers)
			} else {
				util.setErrorResponse(res, 'No trailer available', 401)
			}
		} catch (error) {
			util.setErrorResponse(res, `something happened ${error.message}`, 503)
		}
	}
	static async deleteParticularTrailerController(req, res) {
		try {
			const trailers = await trailerServices.deleteTrailers(req.query.id)
			if (trailers) {
				util.setSuccessResponse(res, 'Trailer deleted', 200, trailers)
			} else {
				util.setErrorResponse(res, 'No trailer found', 401)
			}
		} catch (error) {
			util.setErrorResponse(res, `something happened ${error.message}`, 503)
		}
	}
	static async updateParticularTrailerController(req, res) {
		try {
			const trailers = await trailerServices.updateTrailers(req.query.id, req.body)
			if (trailers) {
				util.setSuccessResponse(res, 'Trailer updated', 201, trailers)
			} else {
				util.setErrorResponse(res, 'No trailer found', 401)
			}
		} catch (error) {
			util.setErrorResponse(res, `something happened ${error.message}`, 503)
		}
	}
}

export default trailerController
