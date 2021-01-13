import chai, { expect } from 'chai';
import sinon from 'sinon';
import httpMock from "node-mocks-http";
import TempSerieController from '../controllers/tempSerie';
import services from '../services/tempSerieService';
import * as aws from '../helpers/aws';

describe('TEMP SERIE TESTS', () => {
    describe('CREATE SERIE TEST', () => {
        it('should add a new serie', async () => {
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                        "video": 'ferkgergerg.mp4',
                        "episodeName": "part 1",
                        "season": 1,
                        "videoId": "b467da83-4f0d-4421-8818-c0f364cty9de1",
                        "synopsis": "The begining of everything as we excepect",
                        "thumb": "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                        "episodeNumber": 2
                }
            })
            const res = httpMock.createResponse();
            await TempSerieController.createSerie(req, res);
            expect(res.statusCode).to.equal(201)
        })
        it('should return 401 error if the serie wasn\'t saved', async () => {
            const stub = sinon.stub(services, 'createNewSeries').callsFake(() => {
                return null;
              })
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                        "video": 'erfergergergerg.mp4',
                        "episodeName": "part 1",
                        "season": 1,
                        "videoId": "b467da83-4f0d-4421-8818-c0f364cty9de",
                        "synopsis": "The begining of everything as we excepect",
                        "thumb": "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                        "episodeNumber": 2
                }
            })
            const res = httpMock.createResponse();
            await TempSerieController.createSerie(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(422)
        })
        it('should return 500 status when there is a server error', async () => {
            const stub = sinon.stub(services, 'createNewSeries').throws(new Error('Something went wrong'));
            const req = httpMock.createRequest({
                body: {
                        "video": 'erfergergergerg.mp4',
                        "episodeName": "part 1",
                        "season": 1,
                        "videoId": "b467da83-4f0d-4421-8818-c0f364cty9de",
                        "synopsis": "The begining of everything as we excepect",
                        "thumb": "6bbdb89d-2455-4440-b9ea-7ba412f9c914.png",
                        "episodeNumber": 2
                }
            })
            const res = httpMock.createResponse();
            await TempSerieController.createSerie(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(500)
        })
    })
    describe('GET ALL SERIES', () => {
        it('gets all series', async () => {
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempSerieController.getAllSeries(req, res);
            expect(res.statusCode).to.equal(200);
        });
        it('returns 404 status when there is not series', async () => {
            const stub = sinon.stub(services, 'getAllSeries').callsFake(() => {
                return [];
              })
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempSerieController.getAllSeries(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(404);
            
        });
        it('returns 503 status when there is a server errror', async () => {
            const stub = sinon.stub(services, 'getAllSeries').throws(new Error('something is wrong'))
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempSerieController.getAllSeries(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(500); 
        });
    });
    describe('GET SIGNED URL TempSeries TEST', () => {
        it('should return 200 status when getting when the req and res body are given', async () => {
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempSerieController.getSignedUrlTempSeries(req, res);
            expect(res.statusCode).to.equal(200);
        });
        it('should return a 500 status error if there is a server error', async () => {
            const stub = sinon.stub(aws, 'getSignedUrl').throws(new Error('something is wrong'))
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempSerieController.getSignedUrlTempSeries(req, res);
            stub.restore()  
            expect(res.statusCode).to.equal(500);
        });
    });
describe('GENERATE SIGNED URL', () => {
    it('should return 404 status when the video is not found', async () => {
        const req = httpMock.createRequest({
            query: {
                id: 578686979
            }
        });
        const res = httpMock.createResponse();
        await TempSerieController.generateSignedUrl(req, res);
        expect(res.statusCode).to.equal(404);
    });
    it('should return 200 when the video is found', async () => {
        const req = httpMock.createRequest({
            query: {
                id: 156
            }
        });
        const res = httpMock.createResponse();
        await TempSerieController.generateSignedUrl(req, res);
        expect(res.statusCode).to.equal(200);
    });
    it('should return 500 when there is a server error', async () => {
        const stub = sinon.stub(services, 'getParticularVideo').throws(new Error('something is wrong'))
        const req = httpMock.createRequest({
            query: {
                id: 34
            }
        });
        const res = httpMock.createResponse();
        await TempSerieController.generateSignedUrl(req, res);
        stub.restore()
        expect(res.statusCode).to.equal(500);
    });
})
});