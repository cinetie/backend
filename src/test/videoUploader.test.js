// import uploader from '../helpers/videoUploader';
// import fs from 'fs';
// import httpMock from "node-mocks-http";
// import path from 'path';
// import TempVideoController from '../controllers/tempVideo';

// const req = httpMock.createRequest({

// })
// const res = httpMock.createResponse()
// it.only('Test video', async () => {
//     const video = fs.readFileSync(path.join(__dirname, 'mock/test.mp4'));
//     const tagname = fs.readFileSync(path.join(__dirname, 'mock/tagname.jpg'));
//     const landScape = fs.readFileSync(path.join(__dirname, 'mock/landscape.jpg'));
//     const portrait = fs.readFileSync(path.join(__dirname, 'mock/portrait.jpg'));

//     const result = await uploader(video,landScape,portrait, tagname, 'movie', 'mp4');
//     const req = httpMock.createRequest({
//         body: {
//             portrait: result.portraitUrl,
//             tagname: result.nameTagUrl.Key,
//             landScape: result.landscapeUrl.Key,
//             type: 'mp4',
//             cpid:  'rgrg12-dfegrtgrthty0bfgbghtyjyju'
//         }
//     })
//     await TempVideoController.createVideoController(req, res);

// })
