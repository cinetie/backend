import mocks from 'node-mocks-http';
import jwt from '../../helpers/jwt';

const response = mocks.createResponse();
const email = 'blaise1@gmail.com';
const clientId = '0';

const token = jwt.jwtSign({ email, clientId }, process.env.SECRET, '1d');
// const authorization = authHeaderValue.replace('Bearer ', token)

const videoMock = {
  response,
  request: {
    query: {
      videoId: '17e63e02-3b95-46bc-9db7-c1cc0b3369cb'
    },
    user: '0',
    headers: {
      authorization: `Bearer ${token}`

    }
  }
};

export default videoMock;
