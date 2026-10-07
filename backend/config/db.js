import mongoose from "mongoose";
import ensureAdmin from "../utils/ensureAdmin.js";

export default async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing in server/.env");
  }

  await mongoose.connect(uri);

  console.log("MongoDB connected");

  await ensureAdmin();
};