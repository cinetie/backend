/* eslint-disable no-useless-catch */
import database from '../database/models'

class tempVideoServices {

	static async createNewSeries(newSeries) {
		try {
			const newVideo = await database.tempSeries.create(newSeries)
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
			const video = await database.tempSeries.findOne({
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
	static async getAllSeries(){
		try {
			const videos = await database.tempSeries.findAll({
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
	static async deleteSeries(id) {
		try {
			const result = await database.tempSeries.destroy({
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
	static async updateSeries(id,data) {
		try {
			const result = await database.tempSeries.update(data,{
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
