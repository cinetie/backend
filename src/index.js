import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import signup from './routes/usersRoute';
const app = express();

app.get('/', (req, res) => {
  const result = doorman.isTokenValid(req,res);
  res.status(200).json({
    status: 200,
    message: 'Welcome to Cinetie API  ' + result
  });
});
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users',signup);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Up and running'));