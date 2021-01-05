import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import {tempVideo, tempVideoErr, featureData, tempVideoUpdate, tempVideoUpdate1} from './mock/temp.video.mock'
import app from '../index';


chai.use(chaiHttp);

const prefix = '/temp';
const prefixVideo = '/video'
const prefixVideo1 = '/temp'
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE2MDQzOTQyMjZ9.MAOf5F9jeptwB4IAAXo13HUi1_tMXXRdoem75Nv1XGQ`
const tokenUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlzMTk5OTk5OTk5NzhAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA5ODk3fQ.xZwna-9ZwmzoeMnR9sF9fUluxct237eRcqrmmHxLB8w`
const tokenUser1 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODMwODI4NDF9.HoiOou1gminOlWp_v1YKuVALbSyDilh0kAibrLUZJUY`
const tokenCp = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiY2xpZW50SWQiOiIzMTk3ODU0MC04YmRmLTQxY2MtODFkNy0yNjIwMGI4NDdjMGEiLCJpYXQiOjE2MDk0MTYwNzh9.jf5erLXrfnKLtESaCc2ZKVoEmmqwwMzmJNitRt7cZFs`
const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiIiwidXNlciI6InNkZmxzZGpmbGpAY2luZXRpZS5jb20iLCJpYXQiOjE1ODYzNDQzMDh9.TmNDgZDr6UkYst00G6G8Pk8HuGgcwrVcPVrzmPaunLM`
const token3 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIiLCJlbWFpbCI6ImJsYWlhczE5NzU2NzVAZ21haWwuY29tIiwiaWF0IjoxNjA5ODM3NTc5fQ.AQVYqg4aOIbhSCq3Ng-5EbSvfS1dzIG5ApQB7RKMLRk`

describe('INTEGRATION TEST FOR VIDEO', () => {
    it('Test for upload temp video should be okay', (done) => {
      chai
        .request(app)
        .post(`${prefix}/new`)
        .set({ Authorization: `Bearer ${token}` })
        .send(tempVideo)
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property(
                'message',
                "video uploaded successfully",
            );
            done();
        });
    });
    it('Test for upload temp video should be 422', (done) => {
        chai
          .request(app)
          .post(`${prefix}/new`)
          .set({ Authorization: `Bearer ${token}` })
          .send(tempVideoErr)
          .end((err, res) => {
              expect(res).to.have.status(422);
              expect(res.body).to.have.property(
                  'message',
                  `You have to enter age rating`,
              );
              done();
          });
      });

      it('Test for get all temp video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefix}/all`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                  'message',
                  `Videos found`,
              );
              done();
          });
      });

      it('Test for delete temp video should be okay', (done) => {
        chai
          .request(app)
          .delete(`${prefix}?id=1669`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                  'message',
                  "Video deleted",
              );
              done();
          });
      });

      it('Test for delete temp video should be 401', (done) => {
        chai
          .request(app)
          .delete(`${prefix}?id=1669`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
              expect(res).to.have.status(401);
              expect(res.body).to.have.property(
                  'message',
                  "No video found",
              );
              done();
          });
      });

      it('Test for update temp video should be 200', (done) => {
        chai
          .request(app)
          .put(`${prefix}/update?id=156`)
          .set({ Authorization: `Bearer ${token}` })
          .send(tempVideoUpdate)
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                  'message',
                  "Video updated",
              );
              done();
          });
      });
      it('Test for update temp video should be 401', (done) => {
        chai
          .request(app)
          .put(`${prefix}/update?id=16`)
          .set({ Authorization: `Bearer ${token}` })
          .send(tempVideoUpdate)
          .end((err, res) => {
              expect(res).to.have.status(401);
              expect(res.body).to.have.property(
                  'message',
                  "No video found",
              );
              done();
          });
      });

      it('Test for get video by popularity video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/pop?offset=0&limit=200&type=serie`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                  'message',
                  "videos found"
              );
              done();
          });
      });
      it('Test for get video by popularity video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/pop?offset=0&limit=200&type=serie2`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.have.property(
                  'message',
                  "Data not found"
              );
              done();
          });
      });

      it('Test for get video by video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/trend?offset=0&limit=20&type=movie`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property(
                  'message',
                  "videos found"
              );
              done();
          });
      });
      it('Test for get video by trend  video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/trend?offset=0&limit=20&type=movie2`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Data not found"
            );
              done();
          });
      });

      it('Test for get video by id video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/unique?id=b467da83-4f0d-4421-8818-c0f364ca9de1`)
          .set({ Authorization: `Bearer ${token3}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "videos Found"
            );
              done();
          });
      });

      it('Test for get video by id video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/unique?id=4b4de3ed-3935-4a6b-a13c-a6a55e534538`)
          .set({ Authorization: `Bearer ${token3}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video can't be found"
            );
              done();
          });
      });

      it('Test for get feature video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/main/ft?type=movie`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Video Found"
            );
              done();
          });
      });
      it('Test for get feature video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/main/ft?type=movie2`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video can't be found"
            );
              done();
          });
      });

      it('Test for get feature second video should be 200', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/second/ft?type=movie`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "videos Found"
            );
              done();
          });
      });
      it('Test for get feature second video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/second/ft?type=movie2`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video can't be found"
            );
              done();
          });
      });

      it('Test for get feature second video should be okay', (done) => {
        chai
          .request(app)
          .put(`${prefixVideo}?id=fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5top`)
          .set({ Authorization: `Bearer ${token}` })
          .send(tempVideoUpdate1)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Video successfully updated!"
            );
              done();
          });
      });

      it('Test for get feature second video should be 404', (done) => {
        chai
          .request(app)
          .put(`${prefixVideo}?id=fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5toptr`)
          .set({ Authorization: `Bearer ${token}` })
          .send(tempVideoUpdate1)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video not updated"
            );
              done();
          });
      });

      it('Test for delete video should be okay', (done) => {
        chai
          .request(app)
          .delete(`${prefixVideo}?id=fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tdf`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Video successfully deleted!"
            );
              done();
          });
      });

      it('Test for delete video should be 404', (done) => {
        chai
          .request(app)
          .delete(`${prefixVideo}?id=fr474rtt7w3-4f378i-vv4w-7865-c0f364dfgts5tdferwe`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property(
                'message',
                "Video was not found or access to it was denied"
            );
              done();
          });
      });

      it('Test for get new video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/arrivals?offset=0&limit=2&type=movie`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "videos Found"
            );
              done();
          });
      });

      it('Test for get new video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/arrivals?offset=0&limit=2&type=movie2`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video can't be found"
            );
              done();
          });
      });

      it('Test for get all video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/all/local`)
          .set({ Authorization: `Bearer ${tokenUser1}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Data found"
            );
              done();
          });
      });

      it('Test for get searched video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/search?q=ba&offset=0`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Data not found"
            );
              done();
          });
      });

      it('Test for get searched video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/search?q=Oath&offset=0`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Videos found"
            );
              done();
          });
      });

      it('Test for get single video should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/unique?id=b467da83-4f0d-4421-8818-c0f364ca9de1`)
          .set({ Authorization: `Bearer ${token3}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "videos Found"
            );
              done();
          });
      });
      it('Test for get single video should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/unique?id=b467da83-4f0d-4421-8818-c0f364ca9de`)
          .set({ Authorization: `Bearer ${token3}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video can't be found"
            );
              done();
          });
      });

       it('Test for get video earning should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/earnings?videoId=b467da83-4f0d-4421-8818-c0f364ca9de1`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Data Not found"
            );
              done();
          });
      });

      it('Test for get video earning should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/earnings?videoId=d0fe2561-2164-4eb0-8113-f1a7dd4cfa73`)
          .set({ Authorization: `Bearer ${tokenUser}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Earnings found "
            );
              done();
          });
      });

      it('Test for Get signed urls for temporary series should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo1}/signed-urls?type=serie&extension=mp4`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Temporary urls"
            );
              done();
          });
      });

      it('Test for Get active earnings per video should be okay', (done) => {
        chai
          .request(app)
          .get(`/cp/earnings/active/video?videoId=0d6e7a8c-e4e6-4d11-ab5d-82f536298d24`)
          .set({ Authorization: `Bearer ${tokenCp}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Earnings found "
            );
              done();
          });
      });

      it('Test for Get active earnings per video should be 404', (done) => {
        chai
          .request(app)
          .get(`/cp/earnings/active/video?videoId=0d6e7a8c-e4e6-4d11-ab5d-82f536298d2`)
          .set({ Authorization: `Bearer ${tokenCp}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Data Not found"
            );
              done();
          });
      });

      it('Test for Get videos by type should be okay', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/type?type=serie`)
          .set({ Authorization: `Bearer ${tokenCp}` })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property(
                'message',
                "Videos Found"
            );
              done();
          });
      });

      it('Test for Get videos by type should be 404', (done) => {
        chai
          .request(app)
          .get(`${prefixVideo}/sort/type?type=serie7`)
          .set({ Authorization: `Bearer ${tokenCp}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "videos can't be found"
            );
              done();
          });
      });

      // it('Test for set video as featured should be okay', (done) => {
      //   chai
      //     .request(app)
      //     .put(`${prefixVideo}/set-featured?id=fr474rtt7w3-4f3rtertr8i-vv4w-7865-c0f364df21341yutts5tdf`)
      //     .set({ Authorization: `Bearer ${token2}` })
      //     .send(featureData)
      //     .end((err, res) => {
      //       expect(res).to.have.status(200);
      //       expect(res.body).to.have.property(
      //           'message',
      //           "Video successfully updated!",
      //       );
      //         done();
      //     });
      // });

      it('Test for set video as featured should be 404', (done) => {
        chai
          .request(app)
          .put(`${prefixVideo}/set-featured?id=b467da83-4f0d-4421-8818-c0f364ca9d`)
          .set({ Authorization: `Bearer ${token2}` })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property(
                'message',
                "Video not updated"
            );
              done();
          });
      });


})
