/* eslint-disable camelcase */
import Fetch from 'node-fetch';
import Crypto from 'crypto';

export default class Square {
  static async createCustomer(data) {
    const response = await Fetch(`${process.env.SQUARE_API_URL}/v2/customers`, {
      method: 'POST',
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: data.email }),
    });
    const responseToJson = await response.json();
    console.log(responseToJson);
    return responseToJson;
  }

  static async attachCard(data) {
    const response = await Fetch(`${process.env.SQUARE_API_URL}/v2/customers/${data.customerId}/cards`, {
      method: 'POST',
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ card_nonce: data.nonce }),
    });
    const responseToJson = await response.json();

    console.log(responseToJson);
    return responseToJson.card.id;
  }

  static async billCard(data) {
    const response = await Fetch(`${process.env.SQUARE_API_URL}/v2/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: data.customerId,
        source_id: data.source_id,
        amount_money: data.amount_money,
        idempotency_key: Crypto.randomBytes(22).toString('hex')
      }),
    });
    const jsonResponse = await response.json();
    const { status } = jsonResponse.payment;
    const { card_brand } = jsonResponse.payment.card_details.card;

    console.log(jsonResponse);
    return {
      status, cardBrand: card_brand
    };
  }

  // static async
}
