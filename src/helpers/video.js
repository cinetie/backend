/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const attachThumbnails = (key, bucket) => {
  try {
    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    throw error;
  }
};

const getAttachedThumbsMultiple = (videos) => {
  for (let i = 0; i < videos.length; i++) {
    videos[i].videoThumbnailLink = attachThumbnails(videos[i].videoThumbnailLink, 'cinetie-thumbnails');
    videos[i].tallThumbNailLink = attachThumbnails(videos[i].tallThumbNailLink, 'cinetie-thumbnails');
    videos[i].nameTagThumbNailLink = attachThumbnails(videos[i].nameTagThumbNailLink, 'cinetie-thumbnails');
  }
};

export { getAttachedThumbsMultiple };
