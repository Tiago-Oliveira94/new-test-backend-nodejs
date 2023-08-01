const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { consumer } = require('./application/queue/sqsConsumer')
const connectDb = require('./config/db');
const routes = require('./infrastructure/webserver/routes');

const app = express();

connectDb();
const port = process.env.NODE_LOCAL_PORT || 9000;
const host = process.env.NODE_HOST || 'localhost'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
consumer.start()

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', routes)

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});