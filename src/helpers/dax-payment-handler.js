// handler for dax payment services

import fetch from 'node-fetch'
import uuid from '../helpers/uuid'


class paymentHandler {
	static async creditCards(details) {
		const data = {
			"keys": {
				"PUBLIC": `${process.env.FLUTTERWAVE_PUBLIC_KEY}`,
				"SECRET": `${process.env.FLUTTERWAVE_SECRET_KEY}`
			},
			"payload": {
				"cardno": details.card.crNumber,
				"cvv": details.card.crCVC,
				"expirymonth": details.card.expMonth,
				"expiryyear": details.card.expYear,
				"currency": "USD",
				"country": "RW",
				"amount": details.transaction.amount,
				"email": details.user.email,
				"phonenumber": details.user.phoneNumber,
				"firstname": details.user.cardFirstName,
				"lastname": details.user.cardLastName,
				"txRef": uuid.generator()
			}
		}
		const response = await fetch(`${process.env.DAX_PAY_URL}`, {
			method: `POST`,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		const results = await response.json()
		if (response) return results
		return 0
	}
	static async momo(details){
		const data = {
			"keys": {
				"PUBLIC": `${process.env.FLUTTERWAVE_PUBLIC_KEY}`,
				"SECRET": `${process.env.FLUTTERWAVE_SECRET_KEY}`
			},
			"payload": {
				"amount": details.transaction.amount,
				"email": details.user.email,
				"phonenumber": details.user.phoneNumber,
				"firstname": details.user.firstName,
				"lastname": details.user.lastName,
				"txRef": uuid.generator()
			}
		}
		const response = await fetch(`${process.env.DAX_PAY_URL}`,{
			method: `POST`,
			headers :{
				"Content-Type":"application/json"
			},
			body: JSON.stringify(data)
		})
		const results = await response.json()
		if(response) return results
		return 0
		
	}
}

export default paymentHandler