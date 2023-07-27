const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL || 'mongodb://mongo:27017/docker-node-mongo';

const connectDb = async () => {
    try {
        mongoose.connect(url, () => {
            console.log('Connected to MongoDB!');
        });
    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
    }

};

module.exports = connectDb;
