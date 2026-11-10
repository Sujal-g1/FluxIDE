
import mongoose from "mongoose";

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from the project service .env");
  }

  await mongoose.connect(uri);

  console.log(
    `MongoDB connected successfully: ${mongoose.connection.name}`
  );
};
