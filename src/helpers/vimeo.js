/* eslint-disable no-console */
import Util from './utilities'
const Vimeo = require('vimeo').Vimeo
const util = new Util()
let realUri = ''
class vimeo {
	static uriGenerator(uri) {
		console.log(`uploaded successfully ${uri}`)
	}
	static getURI(uri, client) {
		// eslint-disable-next-line no-unused-vars
		client.request(`${uri}?fields=link`, (error, body, statusCode, headers) => {
			if (error) {
				util.setErrorResponse(res, `something went wrong, server says ${error}`, 503)
			}
			realUri = uri
			util.setSuccessResponse(res, 'Path of upload is', 200, body.link)
		})
		return realUri
	}
	static async viemoUpload(req, res) {
		const client = new Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_API_SECRET, process.env.VIMEO_ACCESS_TOKEN)
		const newVideo = req.body
		const file = req.files.video
		const path = file.tempFilePath
		let realUri = ''
		const params = {
			'name': newVideo.title,
			'description': newVideo.description
		}

		client.upload(
			path,
			params,
			vimeo.getURI(uri, client)
		)
		console.log('uploading -----')
		return realUri
	}
	static async vimeoSearch(query){
		const client = new Vimeo(process.env.VIMEO_CLIENT_ID,process.env.VIMEO_API_SECRET,process.env.VIMEO_ACCESS_TOKEN);
		client.request({
			path: '/videos',
			query :{
				page:1,
				per_page:10,
				query: query,
				sort : 'relevant',
				direaction: 'asc'
			},
			function (error,body,statusCode,headers){
				(error) ? console.log(error) : console.log(body) 
			}
		})
	}


}
export default vimeo