/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

const attachThumbnails = (key, bucket) => {
  return `https://${bucket}.s3.amazonaws.com/${key}`;
};

const getAttachedThumbsMultiple = (videos) => {
  for (let i = 0; i < videos.length; i++) {
    videos[i].videoThumbnailLink = attachThumbnails(
      videos[i].videoThumbnailLink,
      process.env.THUMBNAIL_BUCKET
    );
    videos[i].tallThumbNailLink = attachThumbnails(
      videos[i].tallThumbNailLink,
      process.env.THUMBNAIL_BUCKET
    );
    videos[i].nameTagThumbNailLink = attachThumbnails(
      videos[i].nameTagThumbNailLink,
      process.env.THUMBNAIL_BUCKET
    );
  }
};

export { getAttachedThumbsMultiple, attachThumbnails };
