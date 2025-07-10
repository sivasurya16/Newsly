import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'news'
    });

    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;

