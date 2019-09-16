import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoute from './routes/usersRoute';
import profileRoute from './routes/profileRoute';
import planRoute from './routes/planRoute';
const app = express();

app.enable('trust proxy');

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Cinetie API'
  });
});
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    const newUrl = `https://${req.get('host') + req.originalUrl}`;
    res.redirect(newUrl);
  }
  next();
});
app.use('/auth', usersRoute);
app.use('/plan',planRoute);
app.use('/profile',profileRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Up and running'));