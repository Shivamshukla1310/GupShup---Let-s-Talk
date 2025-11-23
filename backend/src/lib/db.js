// import mongoose from "mongoose";
// import { ENV } from "./env.js";

// export const connectDB = async () => {
//   try {
//     const { MONGO_URI } = ENV;
//     if (!MONGO_URI) throw new Error("MONGO_URI is not set");

//     const conn = await mongoose.connect(ENV.MONGO_URI);
//     console.log("MONGODB CONNECTED:", conn.connection.host);
//   } catch (error) {
//     console.error("Error connection to MONGODB:", error);
//     process.exit(1); // 1 status code means fail, 0 means success
//   }
// };

import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;

    if (!MONGO_URI) throw new Error("MONGO_URI is not set in ENV");

    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // wait 10s
      socketTimeoutMS: 45000, // render needs this
    });

    console.log("✅ MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    console.error(error);
    process.exit(1);
  }
};
