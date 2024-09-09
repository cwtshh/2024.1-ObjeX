const mongoose = require('mongoose');
const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_URL = process.env.DB_CONNECTION_URL;

const connectDb = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}

module.exports = connectDb;