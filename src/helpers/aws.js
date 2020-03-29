import AWS from 'aws-sdk';
import fs from 'fs';
import { promisify } from 'util';
import { v4 as V4 } from 'uuid';


const { AWS_REGION, AWS_ID, AWS_SECRET } = process.env;

AWS.config.update({
  region: AWS_REGION,
  signatureVersion: 'v4',
  credentials: {
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
  }
});
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
const readFileAsync = promisify(fs.readFile);
const upload = async (bucket, file) => {
  const extension = file.name.split('.').pop();
  const fileToUpload = await readFileAsync(file.tempFilePath);
  const params = {
    Bucket: bucket,
    Key: `${V4()}.${extension}`,
    Body: fileToUpload
  };
  const data = await S3.upload(params).promise();
  return {
    file: fileToUpload,
    data
  };
};

const getObject = async (Bucket, Key, Expires) => {
  const uri = S3.getSignedUrl('getObject', { Bucket, Key, Expires });
  return uri;
};
export { upload, getObject };
