import mocks from 'node-mocks-http';
import jwt from '../../helpers/jwt';
import cry from '../../helpers/crypto';

const response = mocks.createResponse();
const email = 'blaise1@gmail.com';
const clientId = '10201';

const token = jwt.jwtSign({ email, clientId }, process.env.SECRET, '1d');
// const authorization = authHeaderValue.replace('Bearer ', token)

const earningsMock = {
  response,
  request: {
    query: {
      videoId: '17e63e02-3b95-46bc-9db7-c1cc0b3369cb'
    },
    headers: {
      authorization: `Bearer ${token}`

    }
  }
};

export default earningsMock;
