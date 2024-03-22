import mongoose from 'mongoose';
import 'dotenv/config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.SECRET_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
};

export default connectToDatabase;
