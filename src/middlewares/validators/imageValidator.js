import properties from '../../helpers/imageProperties'
import Util from '../../helpers/utilities'
const util = new Util()
class validatePictures {
	static async validateSmall(req, res, next) {
		const results = await properties(req.files.small.tempFilePath, {
			resolution: {
				width: 1920,
				height: 1080
			},
			aspectRatio: 1.7
        })
		if (results === 2) {
			util.setErrorResponse(res, 'Wrong dimensions', 409)
		} else if(results === 3) {
			util.setErrorResponse(res, 'Wrong aspect ratio', 409)
		} else{
			next()
		}
	}
	static async validateTall(req, res, next) {
		const results = await properties(req.files.tall.tempFilePath, {
			resolution: {
				width: 1080,
				height: 1620
			},
			aspectRatio: 0.6
		})
		if (results === 2) {
			util.setErrorResponse(res, 'Wrong dimensions', 409)
		} else if(results === 3) {
			util.setErrorResponse(res, 'Wrong aspect ratio', 409)
		} else{
			next()
		}
	}
	static async validateNameTag(req, res, next) {
		const results = await properties(req.files.name.tempFilePath, {
			resolution: {
				width: 360,
				height: 360
			},
			aspectRatio: 1
		})
		if (results === 2) {
			util.setErrorResponse(res, 'Wrong dimensions', 409)
		} else if(results === 3) {
			util.setErrorResponse(res, 'Wrong aspect ratio', 409)
		} else{
			next()
		}
	}
}
export default validatePictures
