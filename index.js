const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');
const routes = require('./infrastructure/webserver/routes');

const app = express();

connectDb();
const port = process.env.NODE_LOCAL_PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});