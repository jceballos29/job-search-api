/** @format */

const mongoose = require('mongoose');

/**
 * It connects to the MongoDB database using the Mongoose library
 */
const mongoDBConnection = () => {
  mongoose.connect(
    process.env.MONOGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log('Error connecting to MongoDB');
      } else {
        console.log('Connected to MongoDB');
      }
    }
  );
};

module.exports = mongoDBConnection;
