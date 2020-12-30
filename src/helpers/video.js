/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { config } from 'dotenv'
const attachThumbnails = (key, bucket) => {
  try {
    return `https://${bucket}.s3.eu-west-1.amazonaws.com/${key}`;
  } catch (error) {
    throw error;
  }
};

const getAttachedThumbsMultiple = (videos) => {
  for (let i = 0; i < videos.length; i++) {
    console.log(videos[i]);
    videos[i].videoThumbnailLink = attachThumbnails(videos[i].videoThumbnailLink, process.env.THUMBNAIL_BUCKET);
    videos[i].tallThumbNailLink = attachThumbnails(videos[i].tallThumbNailLink, process.env.THUMBNAIL_BUCKET);
    videos[i].nameTagThumbNailLink = attachThumbnails(videos[i].nameTagThumbNailLink, process.env.THUMBNAIL_BUCKET);
  }
};

export { getAttachedThumbsMultiple, attachThumbnails };
