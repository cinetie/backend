import mocks from 'node-mocks-http';

const response = mocks.createResponse();

export const FlutterMocksEmpty = {
  response,
  request: {

  }
};

export const FlutterMocks = {
  response,
  request: {
    body: {
      id: 126122,
      txRef: 'rave-pos-121775237991',
      flwRef: 'FLW-MOCK-72d0b2d66273fad0bb32fdea9f0fa298',
      orderRef: 'URF_1523185223111_833935',
      paymentPlan: null,
      createdAt: '2018-04-08T11:00:23.000Z',
      amount: 1000,
      charged_amount: 1000,
      status: 'successful',
      IP: '197.149.95.62',
      currency: 'NGN',
      customer: {
        id: 22836,
        phone: null,
        fullName: 'Anonymous customer',
        customertoken: null,
        email: 'blaise1@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        AccountId: 134
      },
      entity: {
        card6: '539983',
        card_last4: '8381'
      },
      'event.type': 'CARD_TRANSACTION'
    }
  }
};
