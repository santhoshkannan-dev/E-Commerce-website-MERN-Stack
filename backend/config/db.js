import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (e) {
      // ignore if not supported in environment
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    console.log(`Please verify your MongoDB credentials in .env to connect to database.`);
  }
};

export default connectDB;
