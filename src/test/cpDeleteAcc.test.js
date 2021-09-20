import chai, { expect } from "chai";
import { config } from "dotenv";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import app from "../index";
import cp from "../services/cpServices";

chai.use(chaiHttp);

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
