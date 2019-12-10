import database from '../database/models'
import sequelize from 'sequelize'
import date from '../helpers/date'
const op = sequelize.Op

//will be changed to adapt a very good search algorithm 
// videos are also called movies
class videoService {
	static async getVideoById(videoId) {
		try {
			const video = await database.videos.findOne({
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				},
				where: {
					videoId
				}
			})
			if (video) {
				return video
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getTrendingVideos() {
		try {
			const videos = await database.videos.findAll({

				where: {
					[op.and]: [{
						videoWatchCount: {
							[op.gte]: process.env.TRENDING_WATCH_COUNT
						},
						creationTime: {
							[op.gte]: date.removeDays(180)
						}
					}]
				}
			})
			if (videos) {
				return videos
			} else {
				return null
			}

		} catch (error) {
			throw error
		}
	}
	static async search(query,offSetValue) {
		try {
			const data = await database.videos.findAll({
				offset : Number(offSetValue),
				limit : 1,
				where : {
					[op.or] : [
						{ videoName : {[op.like]: `%${query}%` } },
						{ category :  {[op.like]: `%${query}%`  } }
					]
				}
			})
			if(data){
				return data
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async incrementWatchCountService(videoId){
		try {
			const data = await database.videos.increment('videoWatchCount',{
				where : { videoId }
			})
			if(data){
				return data
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getPopularVideos() {
		try {
			const data = await database.videos.findAll({
				where: {
					videoWatchCount: {
						[op.gte]: process.env.TRENDING_WATCH_COUNT
					}
				}
			})
			if (data) {
				return data
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getVideosByCategory(category) {
		try {
			const data = await database.videos.findAll({
				where: {
					category: category
				}
			})
			if (data) {
				return data
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}

	static async createNewVideo(video) {
		try {
			return await database.videos.create(video)
		} catch (error) {
			throw error
		}
	}
	static async updateVideo(videoId, newVideo) {
		try {
			return await database.videos.update(newVideo, {
				where: {
					videoId
				}
			})
		} catch (error) {
			throw error
		}
	}
	static async deleteVideo(videoId) {
		try {
			return await database.videos.destroy({
				returning: true,
				where: {
					videoId
				}
			})
		} catch (error) {
			throw error
		}
	}
	static async getAllVideos() {
		try {
			return await database.videos.findAll()
		} catch (error) {
			throw error
		}
	}
}
export default videoService