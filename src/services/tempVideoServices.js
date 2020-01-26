/* eslint-disable no-useless-catch */
import database from '../database/models'

class tempVideoServices {

	static async createNewVideos(newVideos) {
		try {
			const newVideo = await database.tempVideos.create(newVideos)
			if (newVideo) {
				return newVideo
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getParticularVideo(id){
		try {
			const video = await database.tempVideos.findOne({
				where : {id}
			})
			if(video){
				return video
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getAllVideos(){
		try {
			const videos = await database.tempVideos.findAll({
				order: [
					['id','DESC']
				]
			})
			if(videos){
				return videos
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async deleteVideos(id) {
		try {
			const result = await database.tempVideos.destroy({
				returning: true,
				where: {id}
			})
			if(result){
				return result
			}else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async updateVideos(id,data) {
		try {
			const result = await database.tempVideos.update(data,{
				where: {id}
			})
			if(result){
				return result
			}else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
}
export default tempVideoServices
