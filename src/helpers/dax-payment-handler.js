// handler for dax payment services

import fetch from 'node-fetch';
import uuid from './uuid';

class paymentHandler {
  static async creditCards(details) {
    const data = {
      keys: {
        PUBLIC: `${process.env.FLUTTERWAVE_PUBLIC_KEY}`,
        SECRET: `${process.env.FLUTTERWAVE_SECRET_KEY}`
      },
      payload: {
        cardno: details.card.crNumber,
        cvv: details.card.crCVC,
        expirymonth: details.card.expMonth,
        expiryyear: details.card.expYear,
        currency: 'RWF',
        country: 'RW',
        amount: details.transaction.amount.toString(),
        email: details.user.email,
        phonenumber: details.user.phoneNumber,
        firstname: details.user.cardFirstName,
        lastname: details.user.cardLastName,
        txRef: uuid.generator()
      }
    };
    const response = await fetch(`${process.env.DAX_PAY_URL}/credit-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const results = await response.json();
    if (response) {
      console.log(results);
      if (results.error) {
        return 0;
      }
      return 1;
    }
    return { state: 'Fetch error' };
  }

  static async momo(details) {
    const data = {
      keys: {
        PUBLIC: `${process.env.FLUTTERWAVE_PUBLIC_KEY}`,
        SECRET: `${process.env.FLUTTERWAVE_SECRET_KEY}`
      },
      payload: {
        amount: details.amount.toString(),
        email: details.email,
        phonenumber: details.phonenumber,
        firstname: details.firstName,
        lastname: details.lastName,
        txRef: uuid.generator()
      }
    };
    const response = await fetch(`${process.env.DAX_PAY_URL}/mobile-money`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const results = await response.json();
    if (response) {
      console.log(results);
      if (results.error) {
        return 0;
      }
      return 1;
    }
    return { state: 'Fetch error' };
  }
}

export default paymentHandler;
