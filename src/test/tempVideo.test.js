import chai, { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import httpMock from "node-mocks-http";
import path from 'path';
import TempVideoController from '../controllers/tempVideo';
import { deleteObject } from '../helpers/aws';
import uploader from '../helpers/videoUploader';
import services from '../services/tempVideoServices';
import jwt from '../helpers/jwt';
import * as aws from '../helpers/aws';

// let urls;
// const video = fs.readFileSync(path.join(__dirname, 'mock/test.mp4'));
// const tagname = fs.readFileSync(path.join(__dirname, 'mock/tagname.jpg'));
// const landScape = fs.readFileSync(path.join(__dirname, 'mock/landscape.jpg'));
// const portrait = fs.readFileSync(path.join(__dirname, 'mock/portrait.jpg'));
describe('TEMP VIDEO TESTS', () => {
    // before(async () => {
    //     urls = await uploader(video,landScape,portrait, tagname, 'movie', 'mp4');
    // })
    // after(async () => {
    //     await deleteObject('cinetie-temp-movies', urls.videoUrl.Key);
    //     await deleteObject('cinetie-thumbnails', urls.portraitUrl.Key);
    //     await deleteObject('cinetie-thumbnails', urls.landscapeUrl.Key);
    //     await deleteObject('cinetie-thumbnails', urls.nameTagUrl.Key);
    // })
    describe('CREATE VIDEO CONTROLLER TEST', () => {
        it('should return a 201 status after the video have been saved and the video is type movie', async () => {
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                    portrait: 'e34b5187-4dd8-49a9-86b1-087eb8476172.jpg',
                    tagname: 'e34b5187-4dd8-49a9-86b1-087eb8476173.jpg',
                    landScape: 'e34b5187-4dd8-49a9-86b1-087eb8476174.jpg',
                    video: 'e34b5187-4dd8-49a9-86b1-097eb8476171.mp4',
                    type: 'movie',
                }
            })
            const res = httpMock.createResponse();
            const result = await TempVideoController.createVideoController(req, res);
            expect(res.statusCode).to.equal(201);
        })
        it('should return a 201 status after the video have been saved and the video is type serie', async () => {
            const req = httpMock.createRequest({
                body: {
                    portrait: 'e34b5187-4dd8-49a9-86b1-087eb8576172.jpg',
                    tagname: 'e34b5187-4dd8-49a9-86b1-088eb8476173.jpg',
                    landScape: 'e34b5187-4dd8-49a9-86b1-089eb8476174.jpg',
                    video: 'e34b5187-4dd8-49a9-86b1-097ec8476171.mp4',
                    type: 'serie',
                }
            })
            const res = httpMock.createResponse();
            const result = await TempVideoController.createVideoController(req, res);
            expect(res.statusCode).to.equal(201);
        })
        it('should return 503 status message if they is an error while saving the temp video', async () => {
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                    portrait: { item: 'six teen'},
                    tagname: 'e34b5187-4dd9-49a9-86b1-087eb8476173.jpg',
                    landScape: 'e34b5127-4dd8-49a9-86b1-087eb8476174.jpg',
                    video: 'e34b5181-4dd8-49a9-86b1-097eb8476171.mp4',
                    type: 'movie',
                }
            })
            const res = httpMock.createResponse();
            const result = await TempVideoController.createVideoController(req, res);
            expect(res.statusCode).to.equal(503);
        })
        it('should return 401 if the video was not saved', async () => {
            const stub = sinon.stub(services, 'createNewVideos').callsFake(() => {
                return null;
              })
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                    portrait: 'e34b5187-4dd8-49a9-86b1-077ef8476172.jpg',
                    tagname: 'e34b5187-4dd8-49a9-86b1-087eb8576173.jpg',
                    landScape: 'e34b5187-4dd8-40a9-86b1-08beb8476174.jpg',
                    video: 'e34b5087-4dd80-49a9-86b1-097eb8476171.mp4',
                    type: 'movie',
                }
            })
            const res = httpMock.createResponse();
            const result = await TempVideoController.createVideoController(req, res);
            // console.log(res);
            stub.restore();
            expect(res.statusCode).to.equal(401);
        })
        it('should return 401 if the video(serie) was not saved', async () => {
            const stub = sinon.stub(services, 'createNewVideos').callsFake(() => {
                return null;
              })
            const req = httpMock.createRequest({
                headers: {
                    cpid:  '31978540-8bdf-41cc-81d7-26200b847c0a'
                },
                body: {
                    portrait: 'e67b5187-4dd8-49a9-86b1-087eb8476172.jpg',
                    tagname: 'e34g5187-4dd8-49a9-86b1-087eb8476173.jpg',
                    landScape: 'e45b5187-4dd8-49a9-86b1-087eb8476174.jpg',
                    video: 'e345r187-4dd8-49a9-86b1-097eb8476171.mp4',
                    type: 'serie',
                }
            })
            const res = httpMock.createResponse();
            const result = await TempVideoController.createVideoController(req, res);
            // console.log(res);
            stub.restore();
            expect(res.statusCode).to.equal(401);
        })
    })
    
    describe('CREATE VIDEO CONTROLLER TEST', () => {
        it('should return all video from a cp', async () => {
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            const result = await TempVideoController.getAllVideosController(req, res);
            expect(res.statusCode).to.equal(200);
            // console.log(res);
    
        })
        it('should return a 404 error if no video is found', async () => {
            const stub = sinon.stub(services, 'getAllVideos').callsFake(() => {
                return [];
              })
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            const result = await TempVideoController.getAllVideosController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(404);
            // console.log(res);
    
        })
        it('should return 503 if there is an error while getting all video', async () => {
            const stub = sinon.stub(services, 'getAllVideos').throwsException()
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            const result = await TempVideoController.getAllVideosController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(503);
        })
    })
    describe('GET PARTICULAR VIDEOS CONTROLLER', () => {
        it('should return a 404 status code if the video is not found', async () => {
            const req = httpMock.createRequest({
                query: {
                    id: '2334gt'
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.getParticularVideoController(req, res);
            // console.log(res);
            expect(res.statusCode).to.equal(404);
        })
        it('should return a 200 status code if the video is found', async () => {
            const req = httpMock.createRequest({
                query: {
                    id: 157
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.getParticularVideoController(req, res);
            console.log(res);
            expect(res.statusCode).to.equal(200);
        })
        it('should return a 401 status code if the video uri is not found', async () => {
            const stub = sinon.stub(aws, 'getObject').callsFake(() => {
                return null;
              })
            const req = httpMock.createRequest({
                query: {
                    id: 156
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.getParticularVideoController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(401);
        })
        it('should return a 503 status code if there is a server error', async () => {
            const stub = sinon.stub(jwt, 'jwtVerify').callsFake(() => {
                return null;
              })
            const req = httpMock.createRequest({
                query: {
                    id: 156
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.getParticularVideoController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(503);
        })
    
    })
    describe('DELETE PARTICULAR VIDEO', () => {
        it('should return 404 when the video is not found', async () => {
            const req = httpMock.createRequest({
                query: {
                    id: 10000
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.deleteParticularVideoController(req, res);
            // console.log(res);
            expect(res.statusCode).to.equal(401);
        })
        it('should return 200 when the video is found And delete', async () => {
            
            const req = httpMock.createRequest({
                query: {
                    id: 158
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.deleteParticularVideoController(req, res);
            // console.log(res);
            expect(res.statusCode).to.equal(200);
        })
        it('should return 503 when there is a server error', async () => {
            const stub = sinon.stub(services, 'getParticularVideo').throws(new Error('Something went wrong'));
            const req = httpMock.createRequest({
                query: {
                    id: 3
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.deleteParticularVideoController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(503);
        })
    })
    describe('UPDATE VIDEO CONTROLLER', () => {
        it('should return 401 status when the video is not found', async () => {
            const req = httpMock.createRequest({
                query: {
                    id: 1000000
                }, 
                body: {
                    videoName: 'james'
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.updateParticularVideoController(req, res);
            // console.log(res);
            expect(res.statusCode).to.equal(401);
        })
        it('should return 200 status when the video is found and update', async () => {
            const req = httpMock.createRequest({
                query: {
                    id: 156
                }, 
                body: {
                    videoName: 'james'
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.updateParticularVideoController(req, res);
            expect(res.statusCode).to.equal(200);
        })
        it('should return 501 when there is a server error', async () => {
            const stub = sinon.stub(services, 'updateVideos').throws(new Error('Something went wrong'));
            const req = httpMock.createRequest({
                query: {
                    id: 156
                }, 
                body: {
                    videoName: 'james'
                }
            });
            const res = httpMock.createResponse();
            await TempVideoController.updateParticularVideoController(req, res);
            stub.restore();
            expect(res.statusCode).to.equal(503);
        })
    })
    describe('GET SIGNED URL TEMP VIDEOS TEST', () => {
        it('should return 200 status when the link are created', async () => {
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempVideoController.getSignedUrlTempVideos(req, res);
            expect(res.statusCode).to.equal(200);
        })
        it('should return 500 status when the link aren\'t created', async () => {
            const stub = sinon.stub(aws, 'getSignedUrl').throws(new Error('Something went wrong'));
            const req = httpMock.createRequest();
            const res = httpMock.createResponse();
            await TempVideoController.getSignedUrlTempVideos(req, res);
            expect(res.statusCode).to.equal(500);
        })
    })
})

