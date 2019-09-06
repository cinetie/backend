import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Cinetie API'
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Up and running'));
