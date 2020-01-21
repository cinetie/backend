/* eslint-disable no-useless-catch */
import image from 'image-size'
const properties = async (file, dimensions) => {
	try {
		const dim = image(file)
		const aspectRatio = (dim.width / dim.height).toFixed(1)
		if (Number(aspectRatio) === Number(dimensions.aspectRatio)) {
			if (dim.width === dimensions.resolution.width && dim.height === dimensions.resolution.height) {
				console.log( 'True')
				return 1
			} else {
				// console.log(`${dim.width} by ${dim.height}`)
				return 2
			}
		} else {
			console.log(`expecting ${dimensions.aspectRatio} but got ${aspectRatio}`)
			return 3
		}
	} catch (error) {
		throw error	
	}
}

export default properties