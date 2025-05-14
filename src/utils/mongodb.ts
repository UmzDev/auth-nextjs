import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

const ConnectToDatabase = async () => {
  if (!MONGODB_URL) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }
    const opts = {
      bufferCommands: false,
    };

    await mongoose.connect(MONGODB_URL!, opts);
    return mongoose;
  } catch (err) {
    console.error(`Failed to connect to database -> ${err}`);
  }
};

export default ConnectToDatabase;
