import mocks from "node-mocks-http";

const response = mocks.createResponse();

const emptyMock = {
  response,
  request: {},
};

export default emptyMock;
