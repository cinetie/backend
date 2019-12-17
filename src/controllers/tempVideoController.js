import helpers from '../helpers/utilities'
import services from '../services/tempVideoServices'
import jwt from '../helpers/jwt'
import cloudinary from '../helpers/cloudinary'
const util = new helpers()

class tempVideoController {
	static async createVideoController(req,res){
		try {
            
			const data = req.body
			const video = req.files.video
			const videoUri =  await cloudinary(video.tempFilePath,'video')
			data.videoUri =  jwt.jwtSign({videoUri :videoUri.url,clientId:data.clientId},process.env.SECRET)
			// const decoded = jwt.jwtVerify(videoUri,process.env.SECRET)
			// console.log(JSON.stringify(videoUri.url))
			const uploadedVideo = await services.createNewVideos(data)
			if(uploadedVideo){
				util.setSuccessResponse(res,'video uploaded successfully',201,uploadedVideo)
			}else{
				util.setErrorResponse(res,'Video can\'t be saved',401)
			}

		} catch (error) {
			util.setErrorResponse(res,`something happened ${error.message}`,503)
		}
	}
	static async getAllVideosController(req,res){
		try {
			const videos = await services.getAllVideos()
			if(videos){
				util.setSuccessResponse(res,'Videos found',200,videos)
			}else{
				util.setErrorResponse(res,'No videos available',401)
			}
		} catch (error) {
			util.setErrorResponse(res,`something happened ${error.message}`,503)
		}
	}
	static async getParticularVideoController(req,res){
		try {
			const videos = await services.getParticularVideo(req.query.id)
			const decoded = jwt.jwtVerify(videos.videoUri,process.env.SECRET)
			videos.videoUri = decoded.videoUri
			if(videos){
				util.setSuccessResponse(res,'Video found',200,videos)
			}else{
				util.setErrorResponse(res,'No video available',401)
			}
		} catch (error) {
			util.setErrorResponse(res,`something happened ${error.message}`,503)
		}
	}
	static async deleteParticularVideoController(req,res){
		try {
			const videos = await services.deleteVideos(req.query.id)
			if(videos){
				util.setSuccessResponse(res,'Video deleted',200,videos)
			}else{
				util.setErrorResponse(res,'No video found',401)
			}
		} catch (error) {
			util.setErrorResponse(res,`something happened ${error.message}`,503)
		}
	}
	static async updateParticularVideoController(req,res){
		try {
			const videos = await services.updateVideos(req.query.id,req.body)
			if(videos){
				util.setSuccessResponse(res,'Video updated',200,videos)
			}else{
				util.setErrorResponse(res,'No video found',401)
			}
		} catch (error) {
			util.setErrorResponse(res,`something happened ${error.message}`,503)
		}
	}
}
export default tempVideoController