/* eslint-disable no-useless-catch */
import image from 'image-size'
const properties = async (file, dimensions) => {
	try {
		const dim = image(file)
		const aspectRatio = (dim.width / dim.height).toFixed(1)
		if (aspectRatio === dimensions.aspectRatio) {
			if (dim.width === dimensions.resolution.width && dim.height === dimensions.resolution.height) {
				console.log( 'True')
				return 1
			} else {
				console.log('resolution')
				return 2
			}
		} else {
			console.log('aspect ratio')
			return 3
		}
	} catch (error) {
		throw error	
	}
}

export default properties