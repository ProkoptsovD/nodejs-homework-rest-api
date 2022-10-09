const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
  
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('Database connection successful...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB
}
