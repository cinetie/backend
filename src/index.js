/* eslint-disable no-console */
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import { config } from 'dotenv';
import path from 'path';
import fileUpload from 'express-fileupload';
import response from './helpers/response';
import stopLoginSessions from "./helpers/stopLoginSessions";
import routes from './routes';
import morgan from 'morgan'

config();
cron.schedule('0 0 0 * * *', stopLoginSessions);
const app = express();

app.enable('trust proxy');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 5000 * 1024 * 1024 }
}));
app.use(morgan('dev'))
// app.use(morgan(':id :method :url :response-time'))

app.get('/', (req, res) => response.successResponse(res, 200, 'Welcome to Cinetie'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', routes);

app.use((req, res) => response.errorResponse(res, 404, 'Not found', 'Undefined URL'));
app.set('views', path.join(__dirname, '/public/templates'));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3001;
if (!module.parent) {
  app.listen(PORT, () => console.log(`Up and running on port ${PORT} ${process.env.HOST}`));
}
module.exports = app;
