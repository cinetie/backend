import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon  from 'sinon'
import sinonStubPromise from 'sinon-stub-promise';
import httpMocks from 'node-mocks-http';
import admin from '../controllers/admin';
import viewingSessionController  from '../controllers/viewingSessions';



chai.use(chaiHttp);
chai.should();
sinonStubPromise(sinon);


describe('ADMIN CONTROLLER', (req, res, status) => {
    it('Test getEarningsPerClient should be Okay', async () => {
        var req = httpMocks.createRequest({
            query : {
                'videoId' : 'b467da83-4f0d-4421-8818-c0f364ca9de1'
            },
            body: {
                "start": "2020-11-31",
                "end": "2021-12-14"
            }
        });
        var res = httpMocks.createResponse();
        const data = await viewingSessionController.getSpecificSessions(req, res);
        expect(data.statusCode).to.equal(200)
    });
})