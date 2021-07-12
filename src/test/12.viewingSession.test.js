import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon'
import sinonStubPromise from 'sinon-stub-promise';
import httpMocks from 'node-mocks-http';
import viewingSession from '../middlewares/viewingSessions';
import viewingSessions from '../services/viewingSessionsServices';
import videoService from '../services/videoServices';





// chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);


describe('VIEWING SESSION MIDDLEWARE', (req, res, status) => {
    it('Test createNewWatchCount wihout IP,  videoId should return 400 status', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            query: {
                id: null
            },
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
                ip: null
            },
            body: {
                "email": "blaise1200@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        const data = await viewingSession.createNewWatchCount(req, res, nextSpy);
        expect(data.statusCode).to.equal(400)
        expect(nextSpy.calledOnce).to.be.false;
    });

    it('Test createNewWatchCount with invalid VideoId should restun 404 status', async () => {
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            query: {
                id: 'b467da83-4f0d-4421-8818-c0f364ca9109'
            },
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
                ip: `197.243.52.82`
            },
            body: {
                "email": "blaise1200@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        const data = await viewingSession.createNewWatchCount(req, res, nextSpy);
        expect(data.statusCode).to.equal(404)
        expect(nextSpy.calledOnce).to.be.false;
    });

//     it('Test createNewWatchCount to check if there is an exact session before same like the provided one should be 200', async () => {
//         var nextSpy = sinon.spy();
//         var req = httpMocks.createRequest({
//             query: {
//                 id: 'b467da83-4f0d-4421-8818-c0f364ca9de1'
//             },
//             headers: {
//                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
//                 ip: `197.243.52.82`
//             },
//             body: {
//                 "email": "blaise1200@gmail.com",
//                 "password": "nAdia123"
//             }
//         });
//         var res = httpMocks.createResponse();
//         await viewingSession.createNewWatchCount(req, res, nextSpy);
//         expect(res.statusCode).to.equal(200)
//         expect(nextSpy.calledOnce).to.be.true;
//     });

//     it(`Test createNewWatchCount to create session when there isn't `, async () => {
//         const stub = sinon.stub(viewingSessions, 'getSesssionPerVideoUser').callsFake(() =>  [])

//         var nextSpy = sinon.spy();
//         var req = httpMocks.createRequest({
//             query: {
//                 id: `b467da83-4f0d-4421-8818-c0f364ca9de1`
//             },
//             headers: {
//                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`,
//                 ip: `197.243.52.82`
//             },
//             body: {
//                 "email": "blaise1200@gmail.com",
//                 "password": "nAdia123"
//             }
//         });
//         var res = httpMocks.createResponse();
//         await viewingSession.createNewWatchCount(req, res, nextSpy);
//         stub.restore()
//         expect(res.statusCode).to.equal(200)
//         expect(nextSpy.calledOnce).to.be.true;
//     });

//     it(`Test createNewWatchCount to create session when there isn't throw error because Can't get location`, async () => {
//         const stub = sinon.stub(viewingSessions, 'registerViewingSessions').callsFake(() =>  null)

//         var nextSpy = sinon.spy();
//         var req = httpMocks.createRequest({
//             query: {
//                 id: `b467da83-4f0d-4421-8818-c0f364ca9de1`
//             },
//             headers: {
//                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`,
//                 ip: `197.243.52.82`
//             },
//             body: {
//                 "email": "blaise1200@gmail.com",
//                 "password": "nAdia123"
//             }
//         });
//         var res = httpMocks.createResponse();
//         await viewingSession.createNewWatchCount(req, res, nextSpy);
//         stub.restore()
//         expect(res.statusCode).to.equal(400)
//         expect(nextSpy.calledOnce).to.be.false;
//     });

    it('Test createNewWatchCount', async () => {
        const stub = sinon.stub(videoService, 'getVideoById').throws(new Error())
        var nextSpy = sinon.spy();
        var req = httpMocks.createRequest({
            query: {
                id: `b467da83-4f0d-4421-8818-c0f364ca9de1`
            },
            headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzZTEyNjk5MTA3Nzg3ODc4QGdtYWlsLmNvbSIsImlhdCI6MTYwNzUwODA3NH0.OHqK11xqdhIm2Y6GpJ0mdIVsQ0sXNyAjwIqux1c3DnI`,
                ip: `197.243.52.82`
            },
            body: {
                "email": "blaise1200@gmail.com",
                "password": "nAdia123"
            }
        });
        var res = httpMocks.createResponse();
        await viewingSession.createNewWatchCount(req, res, nextSpy);
        stub.restore()
        expect(res.statusCode).to.equal(500);
    });

})
