import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon'
import sinonStubPromise from 'sinon-stub-promise';
import httpMocks from 'node-mocks-http';
import admin from '../controllers/admin';
import earningService from '../services/earningServices';
import videoService from '../services/videoServices';
import JWT from '../helpers/jwt';



chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);


describe('ADMIN CONTROLLER', (req, res, status) => {
    it('Test getEarningsPerClient should be Okay', async () => {
        var req = httpMocks.createRequest({
            query : {
                'clientId' : 'f9a02384-d04a-4ef6-aaee-afb745630474'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        const data = await admin.getEarningsPerClient(req, res);
        expect(data.statusCode).to.equal(200)
    });

    it('Test getEarningsPerClient should be 404', async () => {
        const stub = sinon.stub(earningService, 'getEarningsByClientId').callsFake(() => {
            return []})
        var req = httpMocks.createRequest({
            query : {
                'clientId' : 'f9a02384-d04a-4ef6-aaee-afb745630474'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getEarningsPerClient(req, res);
        expect(res.statusCode).to.equal(404)
        stub.restore()
    });

    it('Test getEarningsPerClient should return 500 when there is a server error', async () => {
        const stub = sinon.stub(earningService, 'getEarningsByClientId').throws(new Error())
        var req = httpMocks.createRequest({
            query : {
                'clientId' : 'f9a02384-d04a-4ef6-aaee-afb745630474'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getEarningsPerClient(req, res);
        expect(res.statusCode).to.equal(500)
        stub.restore()
    });

    it('Test getVideosPerCp should be Okay', async () => {
        var req = httpMocks.createRequest({
            query : {
                'clientId' : '67b6c3a8-884f-48af-8e8f-1a60b15824de'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getVideosPerCp(req, res);
        expect(res.statusCode).to.equal(200)
    });

    it('Test getVideosPerCp should be 400', async () => {
        const stub = sinon.stub(videoService, 'getAllVideos').callsFake(() => {
            return undefined})
        var req = httpMocks.createRequest({
            query : {
                'clientId' : '67b6c3a8-884f-48af-8e8f-1a60b15824de'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getVideosPerCp(req, res);
        expect(res.statusCode).to.equal(400)
        stub.restore()
    });


    it('Test getAllVideos should be Okay', async () => {
        var req = httpMocks.createRequest({
            query : {
                'clientId' : 'f9a02384-d04a-4ef6-aaee-afb745630474'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getAllVideos(req, res);
        expect(res.statusCode).to.equal(200)
    });

    it('Test getVideosPerCp should be 400', async () => {
        const stub = sinon.stub(videoService, 'getAllVideosForAdmin').callsFake(() => {
            return undefined})
        var req = httpMocks.createRequest({
            query : {
                'clientId' : '67b6c3a8-884f-48af-8e8f-1a60b15824de'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        await admin.getAllVideos(req, res);
        expect(res.statusCode).to.equal(400)
        stub.restore()
    });

    it('Test getAllEarningsPerVideo should be Okay', async () => {
        var req = httpMocks.createRequest({
            query : {
                'videoId' : '67404feb-f743-481c-bb19-9841324188a3'
            }
        });
        var res = httpMocks.createResponse();
        await admin.getAllEarningsPerVideo(req, res);
        expect(res.statusCode).to.equal(200)
    });

    it('Test getAllEarningsPerVideo should be 404', async () => {
        const stub = sinon.stub(earningService, 'getEarningsByVideo').callsFake(() => {
            return []})
        var req = httpMocks.createRequest({
            query : {
                'videoId' : '67404feb-f743-481c-bb19-9841324188a3'
            }
        });
        var res = httpMocks.createResponse();
        await admin.getAllEarningsPerVideo(req, res);
        expect(res.statusCode).to.equal(404)
        stub.restore()
    });

    it('Test getAllEarningsPerVideo should return 500 when there is a server error', async () => {
        const stub = sinon.stub(earningService, 'getEarningsByVideo').throws(new Error())
        var req = httpMocks.createRequest({
            query : {
                'videoId' : '67404feb-f743-481c-bb19-9841324188a3'
            }
        });
        var res = httpMocks.createResponse();
        await admin.getAllEarningsPerVideo(req, res);
        expect(res.statusCode).to.equal(500)
        stub.restore()
    });

    it('Test gainAccess should be Okay', async () => {
        var req = httpMocks.createRequest({
            body : {
                'clientId' : '67404feb-f743-481c-bb19-9841324188a3',
                'email': "test@gmail.com"
            }
        });
        var res = httpMocks.createResponse();
        await admin.gainAccess(req, res);
        expect(res.statusCode).to.equal(200)
    });

    it('Test gainAccess should return 500 when there is a server error', async () => {
        const stub = sinon.stub(JWT, 'jwtSign').throws(new Error())
        var req = httpMocks.createRequest({
            
        });
        var res = httpMocks.createResponse();
        await admin.gainAccess(req, res);
        expect(res.statusCode).to.equal(500)
        stub.restore()
    });

    it('Test gainAccess should return 400', async () => {
        const stub = sinon.stub(JWT, 'jwtSign').callsFake(() => {
            return null})
        var req = httpMocks.createRequest({
            
        });
        var res = httpMocks.createResponse();
        await admin.gainAccess(req, res);
        expect(res.statusCode).to.equal(400)
        stub.restore()
    });
})