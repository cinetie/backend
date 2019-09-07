import express from 'express';
import mongoose from 'mongoose';
import config from './config'
const app = express();

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Cinetie API'
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Up and running'));