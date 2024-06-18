"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _dotenv = require("dotenv");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _sinon = _interopRequireDefault(require("sinon"));
var _mocha = require("mocha");
var _index = _interopRequireDefault(require("../index"));
var _cpServices = _interopRequireDefault(require("../services/cpServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].use(_chaiHttp["default"]);

// describe('DELETE CP ACCOUNT TEST', () => {
//     it('should return 200 status code when the cp has been deleted', async () => {
//         const loginRes = await chai
//             .request(app)
//             .post('/cp/login')
//             .send({
//                 email: 'cp0004@example.com',
//                 password: 'izzeddin'
//             });
//         const res = await chai
//             .request(app)
//             .delete('/cp/delete_acc')
//             .set('authorization', `bearer ${loginRes.body.data}`)
//         expect(res.statusCode).to.equal(200)
//         expect(res.body).to.have.property('message', 'deleted successfully');

//     });
//     it('should return 500 if there is a server error', async () => {
//         const stub = sinon.stub(cp, 'deleteCp').throws(new Error('something went wrong'))
//         const loginRes = await chai
//             .request(app)
//             .post('/cp/login')
//             .send({
//                 email: 'cp0005@example.com',
//                 password: 'izzeddin'
//             });
//         const res = await chai
//             .request(app)
//             .delete('/cp/delete_acc')
//             .set('authorization', `bearer ${loginRes.body.data}`)
//         stub.restore()
//         expect(res.statusCode).to.equal(522)
//         expect(res.body.message.includes('An error occured')).to.be.true

//     });
// })