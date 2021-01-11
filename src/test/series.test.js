import chai, { expect } from 'chai';
import sinon from 'sinon';
import httpMock from "node-mocks-http";
import dotenv from 'dotenv'
import serieController from '../controllers/series';
import tempSerieService from '../services/tempSerieService';
import services from '../services/serieServices';
import temp from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import * as aws from '../helpers/aws';
dotenv.config()

describe('SERIES TEST', () => {
    describe('CREATE SERIE TEST', () => {
        it('should create a new serie', async () => {
            const stub = sinon.stub(aws, 'copyObjects').callsFake(() => {
                return [{ status: 'success' }];
            })
            const stub2 = sinon.stub(aws, 'deleteObject').callsFake(() => {
                return [{ status: 'success' }];
            })
            const req = httpMock.createRequest({
                query: {
                    id: 157
                }
            });
            const res = httpMock.createResponse();
            await serieController.create(req, res);
            stub.restore();
            stub2.restore();
            expect(res.statusCode).to.equal(201);

        });
        it('should return 400 if there is an error saving the video', async () => {
            const stub = sinon.stub(aws, 'copyObjects').callsFake(() => {
                return [{ status: 'success' }];
            })
            const stub3 = sinon.stub(aws, 'deleteObject').callsFake(() => {
                return [{ status: 'success' }];
            })
            const stub2 = sinon.stub(tempSerieService, 'deleteSeries').callsFake(() => {
                return null;
            })
            const req = httpMock.createRequest({
                query: {
                    id: 158
                }
            });
            const res = httpMock.createResponse();
            await serieController.create(req, res);
            stub.restore();
            stub2.restore();
            stub3.restore();
            expect(res.statusCode).to.equal(400);

        });
        it('should return 500 if there is a server error', async () => {
            const stub = sinon.stub(temp, 'getParticularVideo').throws(new Error('Something went wrong'))
            const stub2 = sinon.stub(aws, 'deleteObject').callsFake(() => {
                return [{ status: 'success' }];
            })
            const req = httpMock.createRequest({
                query: {
                    id: 157
                }
            });
            const res = httpMock.createResponse();
            await serieController.create(req, res);
            stub.restore();
            stub2.restore();
            expect(res.statusCode).to.equal(500);

        });
    });
    describe('GET A EPISODE SERIE TEST', () => {
        it('should get a single episode and return 200 status code', async () => {
            const stub = sinon.stub(aws, 'getObject').callsFake(() => {
                return [{ uri: 'erfejbkegjerjgbemsd,m.com/efeferf.mp4' }];
            });

            const req = httpMock.createRequest({
                query: {
                    ep: 140
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleEpisode(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(200);

        });
        it('return 400 status code if the episode is not found', async () => {
            const stub = sinon.stub(aws, 'getObject').callsFake(() => {
                return [{ uri: 'erfejbkegjerjgbemsd,m.com/efeferf.mp4' }];
            });

            const req = httpMock.createRequest({
                query: {
                    ep: 14000000
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleEpisode(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(400);

        });
        it('return 500 status code if there is a server error', async () => {
            const stub = sinon.stub(services, 'getSingleEpisode').throws(new Error('something went wrong'));

            const req = httpMock.createRequest({
                query: {
                    ep: 140
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleEpisode(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(500);

        });
    });
    describe('GET A SINGLE SEASON TEST', () => {
        it('should return a single season', async () => {
            const req = httpMock.createRequest({
                query: {
                    limit: 5,
                    offset: 0,
                    s: '6',
                    id: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleSeason(req, res);
            expect(res.statusCode).to.equal(200);
        });
        it('should return 400 if the season is not found', async () => {
            const req = httpMock.createRequest({
                query: {
                    limit: 5,
                    offset: 0,
                    s: '200000000',
                    id: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleSeason(req, res);
            expect(res.statusCode).to.equal(400);
        });
        it('should return 500 if there is a server error', async () => {
            const stub = sinon.stub(services, 'getSingleSeason').throws(new Error('something went wrong'));
            const req = httpMock.createRequest({
                query: {
                    limit: 5,
                    offset: 0,
                    s: '200000000',
                    id: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getSingleSeason(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(500);
        });
    });
    describe('GET ALL SEASONS', () => {
        it('should return all seasons\' episodes', async () => {
            const req = httpMock.createRequest({
                query: {
                    videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getAllSeasons(req, res);
            expect(res.statusCode).to.equal(200);
        });
        it('should return 400 if no season is found', async () => {
            const req = httpMock.createRequest({
                query: {
                    videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh1234567890qw'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getAllSeasons(req, res);
            expect(res.statusCode).to.equal(400);
        });
        it('should return 500 if there is a server error', async () => {
            const stub = sinon.stub(services, 'getAllSeasons').throws(new Error('something went wrong'));
            const req = httpMock.createRequest({
                query: {
                    videoId: 'fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tyh'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getAllSeasons(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(500);
        });
    });
    describe('UPDATE SERIE TEST', () => {
        it('should update a serie', async () => {
            const req = httpMock.createRequest({
                body: {
                    id: 144,
                    episodeName: 'changed name'
                }
            });
            const res = httpMock.createResponse();
            await serieController.updateSerie(req, res);
            expect(res.statusCode).to.equal(201);
        });
        it('should return 400 if the serie is not updated', async () => {
            const req = httpMock.createRequest({
                body: {
                    id: 14456677889,
                    episodeName: 'changed name'
                }
            });
            const res = httpMock.createResponse();
            await serieController.updateSerie(req, res);
            expect(res.statusCode).to.equal(400);
        });
        it('should return 500 if there is a server error', async () => {
            const stub = sinon.stub(services, 'update').throws(new Error('something went wrong'));
            const req = httpMock.createRequest({
                body: {
                    id: 144,
                    episodeName: 'changed name'
                }
            });
            const res = httpMock.createResponse();
            await serieController.updateSerie(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(500);
        });
    });
    describe('DELETE EPISODE TEST', () => {
        it('should delete the episode and return 200 status code', async () => {
            const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
                return [];
            });
            const req = httpMock.createRequest({
                params: {
                    id: 145
                }
            });
            const res = httpMock.createResponse();
            await serieController.delete(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(200);
        });
        it('should return 400 status code if the serie is not found', async () => {
            const req = httpMock.createRequest({
                params: {
                    id: 1450000
                }
            });
            const res = httpMock.createResponse();
            await serieController.delete(req, res);
            expect(res.statusCode).to.equal(400);
        });
        it('should return 400 status code if the serie is not deleted', async () => {
            const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
                return [{ status: 'error' }];
            });
            const req = httpMock.createRequest({
                params: {
                    id: 146
                }
            });
            const res = httpMock.createResponse();
            await serieController.delete(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(400);
        });
        it('return 500 status code if there is a server error', async () => {
            const stub = sinon.stub(services, 'getSingleEpisode').throws(new Error('something went wrong'));
            const req = httpMock.createRequest({
                params: {
                    id: 145
                }
            });
            const res = httpMock.createResponse();
            await serieController.delete(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(500);
        });
    });
    describe('GET EPISODES BY CLIENT ID', () => {
        it('should return the episode and 200 status code', async () => {
            const stub = sinon.stub(jwt, 'jwtVerify').callsFake(() => {
                return {
                    clientId: '31978540-8bdf-41cc-81d7-26200b847c0a'
                }
            })
            const req = httpMock.createRequest({
                headers: {
                    authorization: 'erfergrgregergergergregerger'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getVideosByClientId(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(200);
        });
        it('should return 400 status code if the client doesn\'t have any episode', async () => {
            const stub = sinon.stub(jwt, 'jwtVerify').callsFake(() => {
                return {
                    clientId: '31978540-8bdf-41cc-81d7-26200b847c0a12356778'
                }
            })
            const req = httpMock.createRequest({
                headers: {
                    authorization: 'erfergrgregergergergregerger'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getVideosByClientId(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(400);
        });
        it('should return 500 status code if there is a server error', async () => {
            const stub = sinon.stub(jwt, 'jwtVerify').throws(new Error('something went wrong'))
            const req = httpMock.createRequest({
                headers: {
                    authorization: 'erfergrgregergergergregerger'
                }
            });
            const res = httpMock.createResponse();
            await serieController.getVideosByClientId(req, res);
            stub.restore()
            expect(res.statusCode).to.equal(500);
        });
    })
})