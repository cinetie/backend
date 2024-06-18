"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTransResponseFailed = exports.verifyTransResponse = exports.FlutterMocksError = exports.FlutterMocksEmpty = exports.FlutterMocks = void 0;
var _nodeMocksHttp = _interopRequireDefault(require("node-mocks-http"));
var response = _nodeMocksHttp["default"].createResponse();
var FlutterMocksEmpty = exports.FlutterMocksEmpty = {
  response: response,
  request: {}
};
var FlutterMocks = exports.FlutterMocks = {
  response: response,
  request: {
    body: {
      status: "success",
      message: "Transaction fetched successfully",
      data: {
        id: 2407675,
        tx_ref: "c3fd02e4-9123-4535-a0de-a1e2473f3373",
        flw_ref: "FLW-MOCK-dcc62deb51933466c988a5e847380f44",
        device_fingerprint: "6d0e4f42bd8325e9eb68e4587143a2c9",
        amount: 1,
        currency: "USD",
        charged_amount: 1,
        app_fee: 0.04,
        merchant_fee: 0,
        processor_response: "Approved. Successful",
        auth_model: "VBVSECURECODE",
        ip: "52.209.154.143",
        narration: "CARD Transaction ",
        status: "successful",
        payment_type: "card",
        created_at: "2021-08-13T15:01:05.000Z",
        account_id: 667035,
        card: {
          first_6digits: "418742",
          last_4digits: "4246",
          issuer: "ACCESS BANK PLC DEBIT CLASSIC",
          country: "NIGERIA NG",
          type: "VISA",
          token: "flw-t1nf-473f214de4c5bdd0f82c1721790535bc-m03k",
          expiry: "09/32"
        },
        meta: {
          __CheckoutInitAddress: "https://ravemodal-dev.herokuapp.com/v3/hosted/pay/96dfe3a461656c52c2bc"
        },
        amount_settled: 0.96,
        customer: {
          id: 1364947,
          name: "null null",
          phone_number: "N/A",
          email: "yyufmq@workingtall.com",
          created_at: "2021-08-13T15:01:05.000Z"
        }
      }
    }
  }
};
var verifyTransResponse = exports.verifyTransResponse = {
  status: "success",
  message: "Transaction fetched successfully",
  data: {
    id: 2407675,
    tx_ref: "c3fd02e4-9123-4535-a0de-a1e2473f3373",
    flw_ref: "FLW-MOCK-dcc62deb51933466c988a5e847380f44",
    device_fingerprint: "6d0e4f42bd8325e9eb68e4587143a2c9",
    amount: 1,
    currency: "USD",
    charged_amount: 1,
    app_fee: 0.04,
    merchant_fee: 0,
    processor_response: "Approved. Successful",
    auth_model: "VBVSECURECODE",
    ip: "52.209.154.143",
    narration: "CARD Transaction ",
    status: "successful",
    payment_type: "card",
    created_at: "2021-08-13T15:01:05.000Z",
    account_id: 667035,
    card: {
      first_6digits: "418742",
      last_4digits: "4246",
      issuer: "ACCESS BANK PLC DEBIT CLASSIC",
      country: "NIGERIA NG",
      type: "VISA",
      token: "flw-t1nf-473f214de4c5bdd0f82c1721790535bc-m03k",
      expiry: "09/32"
    },
    meta: {
      __CheckoutInitAddress: "https://ravemodal-dev.herokuapp.com/v3/hosted/pay/96dfe3a461656c52c2bc"
    },
    amount_settled: 0.96,
    customer: {
      id: 1364947,
      name: "null null",
      phone_number: "N/A",
      email: "yyufmq@workingtall.com",
      created_at: "2021-08-13T15:01:05.000Z"
    }
  }
};
var verifyTransResponseFailed = exports.verifyTransResponseFailed = {
  status: "failed",
  message: "Transaction fetched successfully",
  data: {
    id: 2407675,
    tx_ref: "c3fd02e4-9123-4535-a0de-a1e2473f3373",
    flw_ref: "FLW-MOCK-dcc62deb51933466c988a5e847380f44",
    device_fingerprint: "6d0e4f42bd8325e9eb68e4587143a2c9",
    amount: 1,
    currency: "USD",
    charged_amount: 1,
    app_fee: 0.04,
    merchant_fee: 0,
    processor_response: "Approved. Successful",
    auth_model: "VBVSECURECODE",
    ip: "52.209.154.143",
    narration: "CARD Transaction ",
    status: "successful",
    payment_type: "card",
    created_at: "2021-08-13T15:01:05.000Z",
    account_id: 667035,
    card: {
      first_6digits: "418742",
      last_4digits: "4246",
      issuer: "ACCESS BANK PLC DEBIT CLASSIC",
      country: "NIGERIA NG",
      type: "VISA",
      token: "flw-t1nf-473f214de4c5bdd0f82c1721790535bc-m03k",
      expiry: "09/32"
    },
    meta: {
      __CheckoutInitAddress: "https://ravemodal-dev.herokuapp.com/v3/hosted/pay/96dfe3a461656c52c2bc"
    },
    amount_settled: 0.96,
    customer: {
      id: 1364947,
      name: "null null",
      phone_number: "N/A",
      email: "yyufmq@workingtall.com",
      created_at: "2021-08-13T15:01:05.000Z"
    }
  }
};
var FlutterMocksError = exports.FlutterMocksError = {
  response: response,
  request: {
    body: {
      id: 126123,
      tx_ref: "1115a95e-973d-4abe-9b80-bde4acf74619",
      flwRef: "FLW-MOCK-72d0b2d66273fad0bb32fdea9f0fa298",
      orderRef: "URF_1523185223111_833935",
      paymentPlan: null,
      createdAt: "2018-04-08T11:00:23.000Z",
      amount: 1000,
      charged_amount: 1000,
      status: "successful",
      IP: "197.149.95.62",
      currency: "USD",
      customer: {
        id: 22836,
        phone: null,
        fullName: "Anonymous customer",
        customertoken: null,
        email: "user345679xde7@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        AccountId: 134
      },
      entity: {
        card6: "539983",
        card_last4: "8381"
      },
      "event.type": "CARD_TRANSACTION"
    }
  }
};