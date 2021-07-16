import chai, { expect } from "chai";
import sinon from "sinon";
import fs from "fs";
import httpMock from "node-mocks-http";
import dotenv from "dotenv";
import nock from "nock";
import fetch from "node-fetch";
import path from "path";
import trailerServices from "../services/trailerService";
import videoController from "../controllers/video";
import { deleteObject } from "../helpers/aws";
import uploader from "../helpers/videoUploader";
import services from "../services/tempVideoServices";
import videoService from "../services/videoServices";
import * as videoHelper from "../helpers/video";
import jwt from "../helpers/jwt";
import * as aws from "../helpers/aws";
import videoUploader from "../helpers/videoUploader";
dotenv.config();
describe("VIDEO TEST", () => {
  describe("ADD VIDEO", () => {
    // it('Should save the video and return 201 status code(serie)', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 159
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.addVideo(req, res);
    //     expect(res.statusCode).to.equal(201);
    // });
    // it("Should save the video and return 201 status code(movie)", async () => {
    //   const stub = sinon.stub(aws, "copyObjects").callsFake(() => {
    //     return [{ status: "success" }];
    //   });
    //   const stub2 = sinon.stub(aws, "deleteObject").callsFake(() => {
    //     return [{ status: "success" }];
    //   });
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 162,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await videoController.addVideo(req, res);
    //   stub.restore();
    //   stub2.restore();
    //   expect(res.statusCode).to.equal(201);
    // });
    // it("Should return 503 status code(movie) when the video wasn't saved in movie-cinetie", async () => {
    //   const stub = sinon.stub(aws, "copyObjects").callsFake(() => {
    //     return null;
    //   });
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 161,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await videoController.addVideo(req, res);
    //   stub.restore();
    //   expect(res.statusCode).to.equal(503);
    // });
    // it("Should return 503 when the video is not updated or deleted(serie)", async () => {
    //   const stub = sinon.stub(videoService, "updateVideo").callsFake(() => {
    //     return [0];
    //   });
    //   const req = httpMock.createRequest({
    //     query: {
    //       id: 160,
    //     },
    //   });
    //   const res = httpMock.createResponse();
    //   await videoController.addVideo(req, res);
    //   stub.restore();
    //   expect(res.statusCode).to.equal(503);
    // });
    it("should get a 500 statu code when there is a server error", async () => {
      const req = httpMock.createRequest({
        query: {
          id: 1600000000000,
        },
      });
      const res = httpMock.createResponse();
      await videoController.addVideo(req, res);
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("DELETE VIDEO", () => {
    it("should return 400 status code when the the video is not found", async () => {
      const req = httpMock.createRequest({
        query: {
          id: 123999,
        },
      });
      const res = httpMock.createResponse();
      await videoController.deleteAvideo(req, res);
      expect(res.statusCode).to.equal(400);
    });
    it("should return 200 when the video is successfully deleted(movie)", async () => {
      const stub = sinon.stub(aws, "deleteObject").callsFake(() => {
        return {};
      });
      const req = httpMock.createRequest({
        query: {
          id: "b4677dsw3-4f34d-9921-8418-c0f364dfrty9de1",
        },
      });
      const res = httpMock.createResponse();
      await videoController.deleteAvideo(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(200);
    });
    it("should return 200 when the video is successfully deleted(serie)", async () => {
      // const stub = sinon.stub(aws, 'deleteObject').callsFake(() => {
      //     return {};
      //   })
      const req = httpMock.createRequest({
        query: {
          id: "b4677fy7w3-4f378i-9921-8418-c0f364dfrty9de1",
        },
      });
      const res = httpMock.createResponse();
      await videoController.deleteAvideo(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return 500 when the video wasn't saved(movie)", async () => {
      const stub = sinon.stub(aws, "deleteObject").callsFake(() => {
        return { status: "fail" };
      });
      const stub2 = sinon.stub(videoService, "deleteVideo").callsFake(() => {
        return null;
      });
      const req = httpMock.createRequest({
        query: {
          id: "b4677fy7w3-4f34d-9921-8418-c0f364dfrty9de1",
        },
      });
      const res = httpMock.createResponse();
      await videoController.deleteAvideo(req, res);
      stub.restore();
      stub2.restore();
      expect(res.statusCode).to.equal(500);
    });
    it("should return 500 when the video wasn't saved(serie)", async () => {
      const stub = sinon.stub(videoService, "deleteVideo").callsFake(() => {
        return null;
      });
      const req = httpMock.createRequest({
        query: {
          id: "b4677fy7w3-4f378i-kk21-8418-c0f364dfrty9de1",
        },
      });
      const res = httpMock.createResponse();
      await videoController.deleteAvideo(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("GET VIDEOS BY POPULARITY", () => {
    it("should return all the popular videos(movies)", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 0,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByPopularity(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return 404 if no popular video(movies) is found", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 50000,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByPopularity(req, res);
      expect(res.statusCode).to.equal(404);
    });
    it("should return 500 if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getPopularVideos")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 50000,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByPopularity(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("GET VIDEO BY TREND TEST", () => {
    it("should return all the trending videos", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 0,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByTrend(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return 404 status code if no trending video is found", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 100000,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByTrend(req, res);
      expect(res.statusCode).to.equal(404);
    });
    it("should returb a 500 status code if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getTrendingVideos")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          type: "movie",
          offset: 100000,
          limit: 5,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByTrend(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("GET VIDEO BY CATEGORY", () => {
    it("should return all the videos in the category", async () => {
      const req = httpMock.createRequest({
        query: {
          q: "Documentary",
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByCategory(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return 404 if no video is found", async () => {
      const req = httpMock.createRequest({
        query: {
          q: "SCifiterg",
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByCategory(req, res);
      expect(res.statusCode).to.equal(404);
    });
    it("should return 500 if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getVideosByCategory")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          q: "Documentary",
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideosByCategory(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("GET VIDEOS BY SEARCH TEST", () => {
    it("should return the videos searched", async () => {
      const req = httpMock.createRequest({
        query: {
          q: "vid",
          offset: 0,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.search(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should 404 if no video is found", async () => {
      const req = httpMock.createRequest({
        query: {
          q: "vidsqerr hea",
          offset: 400000,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.search(req, res);
      expect(res.statusCode).to.equal(404);
    });
    it("should 503 if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "search")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          q: "vid",
          offset: 0,
        },
        headers: {
          country: "Rwanda",
        },
      });
      const res = httpMock.createResponse();
      await videoController.search(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("GET ALL VIDEOS LOCAL TEST", () => {
    it("should return all videos", async () => {
      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      await videoController.getAllVideosLocal(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should 404 if no video is found", async () => {
      const stub = sinon
        .stub(videoService, "getAllVideosForAdmin")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      await videoController.getAllVideosLocal(req, res);
      expect(res.statusCode).to.equal(404);
    });
  });
  describe("GET MAIN FEATURED FILM", () => {
    it("should return the featured video", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getMainFeaturedFilm(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should 404 status code when no video is found", async () => {
      const stub = sinon
        .stub(videoService, "getMainFeaturedVideo")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getMainFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should 404 status code when no video trailer is found", async () => {
      const stub = sinon
        .stub(trailerServices, "getAllTrailers")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getMainFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should 500 if there is a server error", async () => {
      const stub = sinon
        .stub(trailerServices, "getAllTrailers")
        .throws(new Error("something went wrong"));
      const req = httpMock.createResponse({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getMainFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("GET SECOND FEATURED FILM TEST", () => {
    it("should return the second featured film", async () => {
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getSecondFeaturedFilm(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return 404 status code if no video is found", async () => {
      const stub = sinon
        .stub(videoService, "getSecondFeaturedVideo")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getSecondFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should return 404 status code if no video trailer is found", async () => {
      const stub = sinon
        .stub(trailerServices, "getAllTrailers")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getSecondFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should 500 if there is a server error", async () => {
      const stub = sinon
        .stub(trailerServices, "getAllTrailers")
        .throws(new Error("something went wrong"));
      const req = httpMock.createResponse({
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getSecondFeaturedFilm(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("GET NEW VIDEO TEST", () => {
    it("should return the new video", async () => {
      const req = httpMock.createRequest({
        query: {
          limit: 2,
          offset: 0,
          type: "serie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllNewVideos(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should 404 if video is not found", async () => {
      const stub = sinon.stub(videoService, "getNewVideos").callsFake(() => {
        return [];
      });
      const req = httpMock.createRequest({
        query: {
          limit: 2,
          offset: 0,
          type: "serie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllNewVideos(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should return 503 when there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getNewVideos")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          limit: 2,
          offset: 0,
          type: "serie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllNewVideos(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("GET VIDEOS BY TYPE", () => {
    it("should return videos", async () => {
      const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
        return { clientId: "31978540-8bdf-41cc-81d7-26200b847c0a" };
      });
      const req = httpMock.createRequest({
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ",
        },
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllVideosByType(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(200);
    });
    it("should return 404 if no video is found", async () => {
      const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
        return { clientId: "31978540-8bdf-41cc-81d7-26200b847c0a" };
      });
      const stub3 = sinon
        .stub(videoService, "getVideosByType")
        .callsFake(() => {
          return [];
        });
      const req = httpMock.createRequest({
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ",
        },
        query: {
          type: "movie",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllVideosByType(req, res);
      stub.restore();
      stub3.restore();
      expect(res.statusCode).to.equal(404);
    });
    it("should return 503 if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getVideosByType")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMxOTc4NTQwLThiZGYtNDFjYy04MWQ3LTI2MjAwYjg0N2MwYSIsImlhdCI6MTYwODEyNDIyN30.Ngvirxcl8ho9gFve8Hcks35ogXfN6a47TjyUppKw-aQ",
        },
        query: {
          type: "movie",
          limit: 5,
          offset: 0,
        },
      });
      const res = httpMock.createResponse();
      await videoController.getAllVideosByType(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("GET VIDEO BY ID TEST", () => {
    it("should return the video(movie)", async () => {
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfrty5tyh",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideoById(req, res);
      expect(res.statusCode).to.equal(200);
    });
    it("should return the video(serie)", async () => {
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f345t-kk21-0878-c0f364dfrty5tyh",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideoById(req, res);
      expect(res.statusCode).to.equal(200);
    });
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'fr474rtt7w3-4f37'
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.getVideoById(req, res);
    //     expect(res.statusCode).to.equal(404);
    // });
    it("should return 503 if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getVideoById")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfrty5tyh",
        },
      });
      const res = httpMock.createResponse();
      await videoController.getVideoById(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(503);
    });
  });
  describe("UPDATE VIDEO TEST", () => {
    it("should update the video and return 200 status code", async () => {
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f345t-kk21-5679-c0f364dfrty5tyh",
        },
        body: {
          videoName: "The hyena",
        },
      });
      const res = httpMock.createResponse();
      await videoController.updateVideos(req, res);
      expect(res.statusCode).to.equal(200);
    });
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'fr474rtt7w3-4f345t-kk21'
    //         },
    //         body: {
    //             videoName: 'The hyena'
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.updateVideos(req, res);
    //     expect(res.statusCode).to.equal(404)
    // });
    it("should return 500  if there i a server", async () => {
      const stub = sinon
        .stub(videoService, "getVideoById")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f345t-kk21-5679-c0f364dfrty5tyh",
        },
        body: {
          videoName: "The hyena",
        },
      });
      const res = httpMock.createResponse();
      await videoController.updateVideos(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
  describe("FEATURE VIDEO TEST", () => {
    it("should return 404 if video is not found", async () => {
      const req = httpMock.createRequest({
        query: {
          id: "dfergrg",
        },
        body: {
          isFeatured: true,
          type: "movie",
          featureType: 1,
        },
      });
      const res = httpMock.createResponse();
      await videoController.featureVideo(req, res);
      expect(res.statusCode).to.equal(404);
    });
    it("should return 500 status code if there is a server error", async () => {
      const stub = sinon
        .stub(videoService, "getVideoById")
        .throws(new Error("something went wrong"));
      const req = httpMock.createRequest({
        query: {
          id: "dfergrg",
        },
        body: {
          isFeatured: true,
          type: "movie",
          featureType: 1,
        },
      });
      const res = httpMock.createResponse();
      await videoController.featureVideo(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
    it("should return 200 after the vide has been updated", async () => {
      const req = httpMock.createRequest({
        query: {
          id: "fr474rttx34-4f345t-kk21-5679-c0f364dfrtyv7ui",
        },
        body: {
          isFeatured: true,
          type: "movie",
          featureType: 1,
        },
      });
      const res = httpMock.createResponse();
      await videoController.featureVideo(req, res);
      expect(res.statusCode).to.equal(200);
    });
  });
  describe("getAttachedThumbsMultiple TEST", () => {
    it("should update the video arrays and thumbnailsLink", () => {
      const videos = [
        {
          id: 32,
          videoLink: "14acd40f-54e6-4d41fg-88a1-2efbdf49dfgcac59.mp4",
          videoId: "fr474rttx34-4f345t-kk21-5679-c0f364dfrtyv7ui",
          videoName: "video 10",
          videoCast: "basmah ,reyhab , rasha",
          videoSynopsis:
            " a women who have given an oath to help women deliver their babies safely, even in times of conflict in Azraq Refugee Camp, Jordan",
          videoWatchCount: 0,
          videoThumbnailLink: "71254d4dft5-5127-4036-be54-782721b5t5327.jpg",
          videoIdVimeo: "0000",
          videoClientId: "31978540-8bdf-41cc-81d7-26200b847c0a",
          rate: "1599144054255",
          isFeatured: true,
          category: "Documentary",
          type: "movie",
          featureType: 0,
          resCountries: "Uganda, Kenya",
          videoSuspensionState: false,
          nameTagThumbNailLink: "742bfa3b68-1fb14-418e-ak84-82ce251103de.jpg",
          tallThumbNailLink: "6bfdb5tw3-2455-4578-b9D4a-7abfd412f9c814.png",
          creationTime: new Date().getTime(),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      videoController.getAttachedThumbsMultiple(videos);
      expect(videos[0].videoThumbnailLink).to.be.a("string");
      expect(videos[0].tallThumbNailLink).to.be.a("string");
      expect(videos[0].nameTagThumbNailLink).to.be.a("string");
    });
  });
  describe("CREATE NEW WATCH COUNT TESTS", () => {
    it("should return 400 status code if the ip or videoId is not provided", async () => {
      const req = httpMock.createRequest({
        query: {
          id: null,
        },
        headers: {
          authorization: "dfrrrrrrrrrrrrrrrrrrrrrrr",
          ip: null,
        },
      });
      const res = httpMock.createResponse();
      await videoController.createNewWatchCount(req, res);
      expect(res.statusCode).to.equal(400);
    });
    // it('should return 404 if the video is not found', async () => {
    //     const req = httpMock.createRequest({
    //         query: {
    //             id: 'frefergtrgtrgrt'
    //         },
    //         headers: {
    //             authorization: 'ferferffffffffffffffffffffffffffffffff',
    //             ip: '168.212.226.204',
    //         }
    //     });
    //     const res = httpMock.createResponse();
    //     await videoController.createNewWatchCount(req, res);
    //     expect(res.statusCode).to.equal(404);
    // });
    it("should return 201 when a view session is registered", async () => {
      const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
        return { email: "user3456@example.com" };
      });
      nock("http://api.ipstack.com")
        .get(`/168.212.226.204?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`)
        .reply(200, { country_name: "Rwanda" });
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh",
        },
        headers: {
          authorization: "ferferffffffffffffffffffffffffffffffff",
          ip: "168.212.226.204",
        },
      });
      const res = httpMock.createResponse();
      await videoController.createNewWatchCount(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(201);
    });
    it("should return 400 if the user is on trial", async () => {
      const stub = sinon.stub(jwt, "jwtVerify").callsFake(() => {
        return { email: "user34567@example.com" };
      });
      nock("http://api.ipstack.com")
        .get(`/168.212.226.204?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`)
        .reply(200, { country_name: "Rwanda" });
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh",
        },
        headers: {
          authorization: "ferferffffffffffffffffffffffffffffffff",
          ip: "168.212.226.204",
        },
      });
      const res = httpMock.createResponse();
      await videoController.createNewWatchCount(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(400);
    });
    it("should return 500 if there is a server error", async () => {
      const stub = sinon
        .stub(jwt, "jwtVerify")
        .throws(new Error("something went wrong"));
      nock("http://api.ipstack.com")
        .get(`/168.212.226.204?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`)
        .reply(200, { country_name: "Rwanda" });
      const req = httpMock.createRequest({
        query: {
          id: "fr474rtt7w3-4f378i-kk21-0878-c0f364dfgts5tyh",
        },
        headers: {
          authorization: "ferferffffffffffffffffffffffffffffffff",
          ip: "168.212.226.204",
        },
      });
      const res = httpMock.createResponse();
      await videoController.createNewWatchCount(req, res);
      stub.restore();
      expect(res.statusCode).to.equal(500);
    });
  });
});
