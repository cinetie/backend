/* eslint-disable quotes */
import response from '../helpers/response'
import videoService from '../services/videoServices'
import Util from '../helpers/utilities'
import uuid from '../helpers/uuid'
import axios from '../helpers/axios'
import fetch from 'node-fetch'
import cloudinary from '../helpers/cloudinary'
import jwt from '../helpers/jwt'
import vimeoHelper from '../helpers/vimeo'
const util = new Util()
// const Vimeo = require('vimeo').Vimeo
class videoController {
	static async addVideo(req, res) {
		try {
			console.log("fwlenwl")
			const authToken = req.headers.authorization.slice(7)
			const decoded = jwt.jwtVerify(authToken, process.env.SECRET)
			if (decoded.user === process.env.ADMIN_USER) {
				const image = req.files.image
				const thumbnail = await cloudinary(image.tempFilePath,'image')
				const data = req.body
				const decodedVideoHash = jwt.jwtVerify(data.videoUrl,process.env.SECRET)
				data.videoUrl = decodedVideoHash.videoUri
				data.videoClientId = decodedVideoHash.clientId
				data.videoThumbnailLink = thumbnail.url
				data.creationTime = new Date().getTime()
				data.videoId = uuid.generator()
				data.size = data.size * 1e+6
				const uri = await vimeoHelper.viemoUpload(data)
				if(uri){
					data.videoLink = uri
					data.videoIdVimeo = uri.slice(8)
					const newVideo = await videoService.createNewVideo(data)
					if (newVideo) util.setSuccessResponse(res, 'Video uploaded', 201, newVideo)
				}else{
					util.setErrorResponse(res, 'something went wrong while uploading', 503)
				}
			}
		} catch (error) {
			util.setErrorResponse(res, 'Something went wrong : ' + error.message, 503)
		}
	}
	static async deleteAvideo(req, res) {
		try {
			const returned = await videoService.getVideoById(req.query.id)
			if (!returned) response.errorResponse(res, 404, 'Video not found')
			const deletedVideo = await videoService.deleteVideo(req.params.id)
			response.successResponse(res, 200, 'Video successfully deleted!', deletedVideo)
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong', error)
		}
	}

	static async getParticularVideo(req, res) {
		try {
			const id = req.query.videoId
			// eslint-disable-next-line quotes
			// eslint-disable-next-line no-undef
			const data = fetch(`https://api.vimeo.com/videos/${id}`, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Authorization': 'Bearer ' + process.env.VIMEO_ACCESS_TOKEN
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(response => {
					if (response.error_code) {
						util.setErrorResponse(res, response.developer_message, 400)
					} else {
						util.setSuccessResponse(res, "Data", 200, response.uri)
					}
				})

		} catch (error) {
			return response.errorResponse(res, 500, 'Something went wrong ' + error, error)
		}
	}

	static async getAllVideo(req, res) {
		try {
			const headers = {
				Authorization: 'Bearer' + process.env.VIMEO_ACCESS_TOKEN
			}
			const data = await fetch(`https://api.vimeo.com/users/${process.env.VIMEO_USER_ID}/videos`, headers)
			const JsonData = await data.json()
			if (JsonData) {
				util.setSuccessResponse(res, 'Data found', 200, data)
			} else {
				util.setErrorResponse(res, 'Data not found', 404)
			}
			
		} catch (error) {
			return response.errorResponse(res, 500, 'Something went wrong', error)
		}
	}
	static async getVideosByPopularity(req, res) {
		try {
			const videos = await videoService.getPopularVideos()
			if (videos) util.setSuccessResponse(res, 'videos found', 200, videos)
			util.setErrorResponse(res, 'Data not found', 404)
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
	static async getVideosByTrend(req, res) {
		try {
			const videos = await videoService.getTrendingVideos()
			if (videos) util.setSuccessResponse(res, 'videos found', 200, videos)
			util.setErrorResponse(res, 'Data not found', 404)
		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
	static async getVideosByCategory(req, res) {
		try {
			const videos = await videoService.getVideosByCategory(req.query.q)
			if (videos) {
				util.setSuccessResponse(res, `${req.query.q} videos found`, 200, videos)
			} else {
				util.setErrorResponse(res, 'Data not found', 404)
			}

		} catch (error) {
			util.setErrorResponse(res, error.message, 500)
		}
	}
	static async getAllVideoByUser(req, res) {
		try {
			const query = req.query.userId
			const data = axios.get(`https://api.vimeo.com/videos/${query}`)
			if (data) util.setSuccessResponse(res, 'Data found', 200, data)
			util.setErrorResponse(res, 'Data not found', 404)
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong', error)
		}
	}
	static async search(req, res) {
		try {
			const q = req.query.q
			const offset = req.query.offset
			const videos = await videoService.search(q,offset)
			if (Object.values(videos).length > 0) {
				util.setSuccessResponse(res, 'Videos found', 200, videos)
			} else {
				util.setErrorResponse(res, 'Data not found', 404)
			}
		} catch (error) {
			util.setErrorResponse(res, `somethin went wrong : ${error.message}`, 503)
		}
	}
	static async getVideoById(req, res) {
		try {
			const video = await videoService.getVideoById(req.query.videoId)
			if (video) {
				util.setSuccessResponse(res, 'videos Found', 200, video)
			} else {
				util.setErrorResponse(res, 'Video can\'t be found', 404)
			}
		} catch (error) {
			util.setErrorResponse(res, `something went wrong ${error.message}`, 503)
		}
	}
	static async updateVideos(req, res) {
		try {
			const returned = await videoService.getVideoById(req.query.id)
			if (!returned) response.errorResponse(res, 404, 'Video not found')
			const toUpdate = req.body
			const updated = await videoService.updateVideo(req.query.id, toUpdate)
			response.successResponse(res, 200, 'Video successfully updated!', updated[1][0])
		} catch (error) {
			response.errorResponse(res, 500, 'Something went wrong', error)
		}
	}
}

export default videoController