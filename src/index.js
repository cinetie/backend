import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import response from './helpers/response';
import routes from './routes';

const app = express();

app.enable('trust proxy');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    const newUrl = `https://${req.get('host') + req.originalUrl}`;
    res.redirect(newUrl);
  }
  next();
});
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.get('/', (req, res) => {
  response.successResponse(res, 200, 'Welcome to Cinetie');
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', routes);

app.use((req, res, next) => {
  response.errorResponse(res, 404, 'Not found', 'Undefined URL');
});
app.set('views', path.join(__dirname, '/public/templates'));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
