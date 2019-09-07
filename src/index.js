import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
mongoose
  .connect("mongodb+srv://n3m3sis:nAdia123@kftv-cinetie-rqa0s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
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
