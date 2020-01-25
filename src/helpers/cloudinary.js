/* eslint-disable quotes */
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'


dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

const upload = async (file, type) => {
	const uploadedFile = await cloudinary.uploader.upload(file, {
		resource_type: type,
		overwrite: true,
	},(err,result)=>{
		if(err) throw err
	})
	return uploadedFile
}
const uploadCustom = async (file, width, height, cropType) => {
	const modifiedFile = cloudinary.url(file, {
		aspect_ratio: "4:3",
		crop: 'scale'
	})
	const originalFile = await upload(file, 'image')
	return { modifiedFile, originalFile }
}
const videoUpload = (file) => {
	let newFile = ''
	cloudinary.uploader.upload(file,
		{ resource_type: "video" },
		function (error, result) { newFile = result });
	console.log(JSON.stringify(newFile))
	return newFile
}
export default { upload, uploadCustom,videoUpload }