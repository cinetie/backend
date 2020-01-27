/* eslint-disable no-useless-catch */
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
	static async getNewVideos(limitValue, offsetValue) {
		try {
			
			const videos = await database.videos.findAll({
				offset: Number(offsetValue),
				limit: Number(limitValue),
				where: {
					creationTime: {
						[op.gte]: date.removeDays(60)
					}
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
	static async getTrendingVideos(offsetValue, limit) {
		try {
			
			const videos = await database.videos.findAll({
				offset: Number(offsetValue),
				limit: Number(limit),
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
	static async search(query, offSetValue) {
		try {
			const data = await database.videos.findAll({
				order :[
					['id','DESC']
				],
				offset: Number(offSetValue),
				limit: 20,
				where: {
					[op.or]: [
						{ videoName: { [op.like]: `%${query}%` } },
						{ category: { [op.like]: `%${query}%` } }
					]
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
	static async incrementWatchCountService(videoId) {
		try {
			const data = await database.videos.increment('videoWatchCount', {
				where: { videoId }
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
	static async getPopularVideos(offSetValue, limitValue) {
		try {
			
			const data = await database.videos.findAll({
				offset: Number(offSetValue),
				limit: Number(limitValue),
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
	static async getAllVideos(videoClientId) {
		try {
			return await database.videos.findAll({
				attributes: {
					exclude: ['videoLink','createdAt','updatedAt','videoCast','videoSynopsis','nameTagThumbNailLink','isFeatured','tallThumbNailLink','videoIdVimeo','videoClientId','featureType','category']
				},
				where : { videoClientId },
				order:[
					['id','DESC']
				]
			})
		} catch (error) {
			throw error
		}
	}
	static async getAllVideosForAdmin() {
		try {
			return await database.videos.findAll({
				attributes: {
					exclude: ['videoLink','createdAt','updatedAt','videoCast','videoSynopsis','nameTagThumbNailLink','isFeatured','tallThumbNailLink','videoIdVimeo','videoClientId','featureType','category']
				},
				order :[
					['id','DESC']
				]
			})
		} catch (error) {
			throw error
		}
	}
	static async getMainFeaturedVideo() {
		try {
			const videos = await database.videos.findAll({
				order:[
					['id','DESC']
				],
				limit:1,
				attributes:{
					exclude: ['videoLink','creationTime','videoWatchCount','videoSuspensionState','createdAt','updatedAt','isFeatured','tallThumbNailLink','videoIdVimeo','videoClientId','featureType',]
				},
				where: {
					[op.and]: [
						{ isFeatured: true },
						{ featureType: 1 }
					]
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
	static async getSecondFeaturedVideo() {
		try {
			const videos = await database.videos.findAll({
				order:[
					['id','DESC']
				],
				limit:1,
				attributes:{
					exclude: ['videoLink','creationTime','videoWatchCount','videoSuspensionState','createdAt','updatedAt','isFeatured','tallThumbNailLink','videoIdVimeo','videoClientId','featureType',]
				},
				where: {
					[op.and]: [
						{ isFeatured: true },
						{ featureType: 2 }
					]
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
}
export default videoService
