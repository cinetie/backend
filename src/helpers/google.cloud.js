/* eslint-disable quotes */
import { Storage } from '@google-cloud/storage';
import { join } from 'path';
import mime from 'mime-types';
import { createReadStream } from 'fs';
import uuid from './uuid';

const uploadToGoogleCloud = async (bucketName, file) => {
  // try {
  const storage = new Storage({
    keyFilename: join(__dirname, '../../storage-cinetie-1ccfe2a73bd4.json'),
    projectId: 'storage-cinetie'
  });
  const type = mime.lookup(file.name);
  const bucket = storage.bucket(bucketName);
  const fileData = {
    uuid: uuid.generator(),
    type: mime.extensions[type][0],
  };
  const blob = bucket.file(`${fileData.uuid}.${fileData.type}`);
  await new Promise((resolve, reject) => {
    const readStream = createReadStream(file.tempFilePath, { highWaterMark: Math.pow(2, 16) });
    readStream.pipe(blob.createWriteStream({
      resumable: true,
      gzip: true,
      // predefinedAcl: "publicRead"
    }))
      .on("finish", resolve);
  })
    .catch((error) => {
      console.log(error);
    });
  return `https://storage.googleapis.com/${bucketName}/${fileData.uuid}.${fileData.type}`;
};

export default { uploadToGoogleCloud };
