import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Lost connected on mongoDB...")
    console.log(error);
  }
};

export default connectMongoDB;