/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
import fetch from 'node-fetch';
import uuid from "./uuid";

class opay {
  static payment(details) {
    return new Promise(async (resolve) => {
      const data = {
        telephoneNumber: details.phoneNumber,
        amount: details.price,
        organizationId: '8a7482c36d8679f4016daa3a81050000',
        description: 'Payment for Cinetie',
        callbackUrl: 'http://localhost:5000/trans/new',
        transactionId: uuid.generator()
      };

      const url = 'https://opay-api.oltranz.com/opay/paymentrequest';
      const headers = { "Content-type": "application/json", Accept: "application/json" };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      resolve(response);
    });

    // try {
    // 	const date = new Date()
    // 	if (details.endDate == date.toDateString()) {
    // 		const data = {
    // 			'telephoneNumber': '25'+details.phoneNumber,
    // 			'amount': details.price,
    // 			'organizationId': '8a7482c36d8679f4016daa3a81050000',
    // 			'description': 'Payment for Cinetie',
    // 			'callbackUrl': 'http://localhost:5000/trans/new',
    // 			'transactionId': uuid.generator()
    // 		}
    // 		const url = 'https://opay-api.oltranz.com/opay/paymentrequest'
    // 		const headers={"Content-type":"application/json"}

    // 		// const response = await fetch(url,{
    // 		// 	headers: {
    // 		// 		'Content-Type': 'application/json',
    // 		// 		'Accept':'application/json'
    // 		// 	},
    // 		// 	body :JSON.stringify(data),
    // 		// 	method : 'POST'
    // 		// })

    // 		request.post(({url, headers, json:true, body:data}, (err, res, body)=>{
    // 			if(err){
    // 				return 0
    // 			}
    // 			else{
    // 				return 1
    // 			}
    // 		}))
    // 		// const responseToJson =  await response.json()
    // 		return 1
    // 	} else {
    // 		return 0
    // 	}
    // } catch (error) {
    // 	throw error
    // }
  }
}
export default opay;
