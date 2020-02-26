import AWS from 'aws-sdk';
import fs from 'fs';

const AWS_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRECT_ACCESS_KEY;
const { AWS_BUCKET_NAME } = process.env;

class awsSdk {
  static async generateAwsInstance() {
    const aws = AWS.S3({
      accessKeyId: AWS_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    return aws;
  }

  static async uploadSingleFile(file) {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer
    };
    const aws = this.generateAwsInstance();
    aws.upload(params, (err, data) => {
      if (err) console.log(err);
      console.log(`uploaded to ${data.location}`);
    });
  }
}

export default awsSdk;
