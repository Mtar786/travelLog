const mongoose = require('mongoose');

/**
 * Establish a connection to MongoDB.
 *
 * The connection string is read from the `MONGO_URI` environment variable.
 * The function will log a success message when the connection is established
 * and exit the process on failure.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;