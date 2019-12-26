/* eslint-disable quotes */
import fetch from 'node-fetch'
import uuid from '../helpers/uuid'
import https from 'https'
class opay {
	static async payment(req,res,details){
		try {
			const date = new Date()
			if (details.endDate == date.toDateString()) {
				const data = {
					'telephoneNumber': '25'+details.phoneNumber,
					'amount': details.price,
					'organizationId': '8a7482c36d8679f4016daa3a81050000',
					'description': 'Payment for Cinetie',
					'callbackUrl': 'http://localhost:5000/trans/new',
					'transactionId': uuid.generator()
				}
				let jsonData = JSON.stringify(data)
				const url = 'https://opay-api.oltranz.com/opay/paymentrequest' 
				// const response = await fetch(url,{
				// 	headers: {
				// 		'Access-Control-Allow-Origin': '*',
				// 		'Content-Type': 'application/json',
				// 		'Accept':'*/*'
				// 	},
				// 	body :JSON.stringify(data),
				// 	method : 'POST'
				// })
				// const responseToJson =  await response.json()
				// console.log(JSON.stringify(responseToJson))
				const options ={
					host : "opay-api.oltranz.com",
					path: "/opay/paymentrequest",
					method: "POST",
					headers :{
						"Content-Type":"application/json",
						"Accept":"application/json",
						"Content-length": jsonData.length
					}
					
				}
				const res = https.request(options, res =>{
					console.log(`${res.statusCode}`)
					res.on('data', d => {
						process.stdout.write(d)
					})
				})
				req.on('error', error => {
					console.error(error)
				})
				req.write(jsonData)
				req.end()
				return 1
			} else {
				return 0
			}
		} catch (error) {
			console.log(error)
		}
	}
}
export default  opay 