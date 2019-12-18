import fetch from 'node-fetch'
import uuid from '../helpers/uuid'
class opay {
	static async payment(details){
		const date = new Date()
		if (details.endDate == date.toDateString()) {
			const data = {
				'telephoneNumber': details.phoneNumber,
				'amount': details.price,
				'organizationId': '8a7482c36d8679f4016daa3a81050000',
				'description': 'Payment for Cinetie',
				'callbackUrl': 'http://localhost:5000/trans/new',
				'transactionId': uuid.generator()
			}

			const url = 'https://opay-api.oltranz.com/opay/paymentrequest' 
			const response = await fetch(url,{
				headers: {
					'Content-Type': 'application/json'
				},
				body :JSON.stringify(data),
				method : 'POST'
			})
			const responseToJson =  await response.json()
			console.log(JSON.stringify(responseToJson))
			return 1
		} else {
			return 1
		}
	}
}
export default  opay 