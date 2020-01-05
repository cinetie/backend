import { Storage } from '@google-cloud/storage'
import { join } from 'path'
import mime from 'mime-types'
import uuid from './uuid'
const uploadToGoogleCloud = async (bucketName, file) => {
	const storage = new Storage({
		keyFilename: join(__dirname, '../../storage-cinetie-1ccfe2a73bd4.json'),
		projectId: 'storage-cinetie'
	})
	const type = mime.lookup(file.name)
	const bucket = storage.bucket(bucketName)
	const fileData = {
		uuid: uuid.generator(),
		type: mime.extensions[type][0],
	}
	bucket.upload(file.tempFilePath, {
		gzip: true,
		metadata: {
			cacheControl: 'public, max-age=31536000',
		}
	}).then(()=>{
		bucket.file(file.tempFilePath.slice(5)).move(`${fileData.uuid}.${fileData.type}`)
	})
	return `https://storage.googleapis.com/${bucketName}/${fileData.uuid}.${fileData.type}`

}
export default { uploadToGoogleCloud }