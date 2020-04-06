/* eslint-disable camelcase */
import Fetch from 'node-fetch';

export default class Square {
  static async createCustomer(data) {
    const response = await Fetch(process.env.SQUARE_API_URL, {
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { customer } = response.json();
    return customer;
  }

  static async attachCard(data) {
    const response = await Fetch(process.env.SQUARE_API_URL, {
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.user),
    });
    const { id } = response.json();
    return id;
  }

  static async billCard(data) {
    const response = await Fetch(process.env.SQUARE_API_URL, {
      headers: {
        'Square-Version': '2020-03-25',
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = response.json();
    const { id } = jsonResponse.payments;
    const { status } = jsonResponse;
    const { reciept_number } = jsonResponse;
    const { card_brand } = jsonResponse.card_details.card;
    return {
      id, status, recieptNumber: reciept_number, cardBrand: card_brand,
    };
  }
}
