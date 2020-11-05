import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import earningController from '../controllers/earning';
import emptyMock from './mock/empty.mock';
import videoMock from './mock/video.mock';
import earningsMock from './mock/earnings.mock';

import jwt from '../helpers/jwt';
import app from '../index';

chai.use(chaiHttp);

const email = 'email@gmail.com';

describe('EARNING CONTROLLER', () => {
  it('should return null if email subprised have no registed user', async () => {
    const data = await earningController.getCurrentSubscriptionDetails(email);
    expect(data).to.be.null;
  });

  it('should return an object getting subscription details', async () => {
    const data = await earningController.getCurrentSubscriptionDetails(
      'blaise1@gmail.com'
    );
    expect(data.email).to.be.equal('blaise1@gmail.com');
  });

  it('should return true while tryin to get assign Rate', async () => {
    const data = await earningController.assignRateToEachVideo(
      'blaise1@gmail.com'
    );
    expect(data).to.be.equal(true);
  });

  it('should return 200/OK getting all earnings', async () => {
    const data = await earningController.getAllEarnings(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 200/OK getting all Active earnings', async () => {
    const data = await earningController.getAllActiveEarnings(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 200/OK getting earnings per video', async () => {
    const data = await earningController.getAllEarningsPerVideo(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 500 getting earnings per video with no vidoe id', async () => {
    const data = await earningController.getAllEarningsPerVideo(
      emptyMock.request,
      emptyMock.response
    );
    expect(data.statusCode).to.be.equal(500);
  });

  it('should return 200/OK getting earnings per video', async () => {
    const data = await earningController.getActiveEarningsPerVideo(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 200/ok if the clientId had earnings', async () => {
    const data = await earningController.getActiveEarningsPerClient(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 500 if the token is not supplied', async () => {
    const data = await earningController.getActiveEarningsPerClient(
      emptyMock.request,
      emptyMock.response
    );
    expect(data.statusCode).to.be.equal(500);
  });

  it('should return 404 if the clientId in the toke is has no earnings', async () => {
    const data = await earningController.getActiveEarningsPerClient(
      earningsMock.request,
      earningsMock.response
    );
    expect(data.statusCode).to.be.equal(404);
  });

  it('should return 200/ok if the clientId had active earnings', async () => {
    const data = await earningController.getEarningsPerClient(
      videoMock.request,
      videoMock.response
    );
    expect(data.statusCode).to.be.equal(200);
  });

  it('should return 404 if the clientId in the toke is has no active earnings', async () => {
    const data = await earningController.getEarningsPerClient(
      earningsMock.request,
      earningsMock.response
    );
    expect(data.statusCode).to.be.equal(404);
  });

  it('should return 500 if the token is not supplied', async () => {
    const data = await earningController.getEarningsPerClient(
      emptyMock.request,
      emptyMock.response
    );
    expect(data.statusCode).to.be.equal(500);
  });
});
