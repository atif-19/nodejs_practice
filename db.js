// import mongoose module
const mongoose = require('mongoose');
// define mongoDB connection string
const mongoURI = 'mongodb://localhost:27017/AtifDB';
// connect to MongoDB using mongoose
mongoose.connect(mongoURI)

// mongoose connection instance
const db = mongoose.connection;
// event listeners for mongoose connection
db.on('error', () => console.log('Error in DB connection'));
db.on('connected', () => console.log('DB connected successfully'));
db.on('disconnected', () => console.log('DB disconnected'));
// export the db connection
module.exports = db;

