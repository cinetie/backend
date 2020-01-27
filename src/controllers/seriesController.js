/* eslint-disable quotes */
import services from '../services/serieServices'
import Util from '../helpers/utilities'
import temp from '../services/tempSerieService'
import jwt from '../helpers/jwt'
import vimeo from '../helpers/vimeo'
const util = new Util()

class serieController{
	static async create(req,res){
		try {
			//get id for temp video
			const id = req.query.id
			const tempVideo = await temp.getParticularVideo(id)
			console.log(JSON.stringify(tempVideo))
			const decoded = jwt.jwtVerify(tempVideo.uri,process.env.SECRET)
			//set details for vimeo upload
			const data = {
				size: tempVideo.size,
				videoUrl:decoded.uri

			}
			//get url after a successful upload to vimeo
			const url = await vimeo.viemoUpload(data)
			//patch serie object to fit suspensionSate and video url
			const createdSerie = await services.update(decoded.id,{
				suspensionState:false,
				episode:url
			})
			if(createdSerie) {
				util.setErrorResponse(res,'Created successfully',201)
			} else{
				util.setErrorResponse(res,'Can\'t upload',400)
			} 
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
	static async getSingleEpisode(req,res){
		try {
			const episode = await services.getSingleEpisode(req.query.id);
			(episode) ? util.setSuccessResponse(res,'Retrieved successfully',200,episode) : util.setErrorResponse(res,`Can't find what you requested`,400)
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
	static async getSingleSeason(req,res){
		try {
			const season = await services.getSingleSeason(req.query.videoId,req.query.s);
			(season) ? util.setSuccessResponse(res,'Retrieved successfully',200,season) : util.setErrorResponse(res,`Can't find what you requested`,400)
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
	static async getAllSeasons(req,res){
		try {
			const seasons = await services.getAllSeasons(req.query.videoId);
			(seasons) ? util.setSuccessResponse(res,'Retrieved successfully',200,seasons): util.setErrorResponse(res,`Can't find what you requested`,400)
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
	static async updateSerie(req,res){
		try {
			const updated = await services.update(req.body.id,req.body);
			(updated) ? util.setSuccessResponse(res,'Updated easily',201,updated) : util.setErrorResponse(res,`Can't updated what you requested`,400)
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
	static  async delete(req,res){
		try {
			const deleted = await services.deleteEpisode(req.body.id);
			(deleted) ? util.setSuccessResponse(res,`deleted easily`,200,deleted) : util.setErrorResponse(res,`Can't find what you requested`,400)
		} catch (error) {
			util.setErrorResponse(res,`Something happened ${error.message}`,500)   
		}
	}
    
}
export default serieController