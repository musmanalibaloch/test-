const mongoose = require('mongoose');
const logger = require('../utility/logger.util');

// Set strictQuery option based on your preference
mongoose.set('strictQuery', true); // or true, depending on your preference


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.success('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = dbConnect;
