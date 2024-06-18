"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _uuid = _interopRequireDefault(require("./uuid"));
/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
var opay = /*#__PURE__*/function () {
  function opay() {
    (0, _classCallCheck2["default"])(this, opay);
  }
  (0, _createClass2["default"])(opay, null, [{
    key: "payment",
    value: function payment(details) {
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
          var data, url, headers, response;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                data = {
                  telephoneNumber: details.phoneNumber,
                  amount: details.price,
                  organizationId: "8a7482c36d8679f4016daa3a81050000",
                  description: "Payment for Cinetie",
                  callbackUrl: "http://localhost:5000/trans/new",
                  transactionId: _uuid["default"].generator()
                };
                url = "https://opay-api.oltranz.com/opay/paymentrequest";
                headers = {
                  "Content-type": "application/json",
                  Accept: "application/json"
                };
                _context.next = 5;
                return (0, _nodeFetch["default"])(url, {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(data)
                });
              case 5:
                response = _context.sent;
                resolve(response);
              case 7:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

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
  }]);
  return opay;
}();
var _default = exports["default"] = opay;