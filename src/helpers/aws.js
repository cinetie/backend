import AWS from 'aws-sdk';
import fs from 'fs';
import { v4 as V4 } from 'uuid';
import { promisify } from 'util';

const {
  AWS_REGION, AWS_ID, AWS_SECRET
} = process.env;

function config(credentials) {
  AWS.config.update({
    region: AWS_REGION,
    signatureVersion: 'v4',
    credentials: {
      accessKeyId: credentials.AWS_ID,
      secretAccessKey: credentials.AWS_SECRET
    }
  });
}
config({ AWS_ID, AWS_SECRET });
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

const getObject = async (Bucket, Key, Expires) => {
  const uri = S3.getSignedUrl('getObject', { Bucket, Key, Expires });
  return uri;
};

const upload = async (bucket, file) => {
  config({
    AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
    AWS_ID: process.env.AWS_UPLOAD_ID
  });
  const readFileAsync = promisify(fs.readFile);
  const S3Upload = new AWS.S3({ apiVersion: '2006-03-01' });
  const extension = file.name.split('.').pop();
  const fileToUpload = await readFileAsync(file.tempFilePath);
  const params = {
    Bucket: bucket,
    Key: `${V4()}.${extension}`,
    Body: fileToUpload
  };
  const data = await S3Upload.upload(params).promise();
  return {
    file: fileToUpload,
    data
  };
};

const deleteObject = async (Bucket, Key) => {
  config({
    AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
    AWS_ID: process.env.AWS_UPLOAD_ID
  });
  const S3Delete = new AWS.S3({ apiVersion: '2006-03-01' });
  const result = await S3Delete.deleteObject({ Bucket, Key }).promise();
  return result;
};

const copyObjects = async (source, destination, Key) => {
  config({
    AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
    AWS_ID: process.env.AWS_UPLOAD_ID
  });
  const params = {
    Bucket: destination,
    CopySource: `https://${source}.s3.${AWS_REGION}.amazonaws.com/${Key}`,
    Key
  };
  const S3Copy = new AWS.S3({ apiVersion: '2006-03-01' });
  const copy = await S3Copy.copyObject(params).promise();
  return copy;
};

const getSignedUrl = async (Bucket, ContentType, extension) => {
  config({
    AWS_SECRET: process.env.AWS_UPLOAD_ACCESS_KEY,
    AWS_ID: process.env.AWS_UPLOAD_ID
  });
  const Key = `${V4()}.${extension}`;
  const params = {
    Bucket,
    Key,
    ContentType,
    Expires: 21600
  };
  const S3SignedUrls = new AWS.S3({ apiVersion: '2006-03-01' });
  const signedUrl = await S3SignedUrls.getSignedUrlPromise('putObject', params);
  return {
    url: signedUrl,
    Key
  };
};

export {
  getObject, deleteObject, copyObjects, getSignedUrl, upload
};
