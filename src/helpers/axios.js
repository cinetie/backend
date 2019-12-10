/* eslint-disable no-console */
import axios from 'axios'
const post = async (url,data) =>{
	axios.post(url,data)
		.then((response)=>{
			return response
		})
		.catch((error)=>{
			throw error
		})
}
const get = (url,options) =>{
	console.log(JSON.stringify(options))
	axios.get(url,options)
		.then((response)=>{
			return response
		})
		.catch((error) =>{
			throw error
		})
}
export default { post, get }