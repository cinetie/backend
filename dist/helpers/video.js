"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttachedThumbsMultiple = exports.attachThumbnails = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

var attachThumbnails = exports.attachThumbnails = function attachThumbnails(key, bucket) {
  return "https://".concat(bucket, ".s3.amazonaws.com/").concat(key);
};
var getAttachedThumbsMultiple = exports.getAttachedThumbsMultiple = function getAttachedThumbsMultiple(videos) {
  for (var i = 0; i < videos.length; i++) {
    videos[i].videoThumbnailLink = attachThumbnails(videos[i].videoThumbnailLink, process.env.THUMBNAIL_BUCKET);
    videos[i].tallThumbNailLink = attachThumbnails(videos[i].tallThumbNailLink, process.env.THUMBNAIL_BUCKET);
    videos[i].nameTagThumbNailLink = attachThumbnails(videos[i].nameTagThumbNailLink, process.env.THUMBNAIL_BUCKET);
  }
};