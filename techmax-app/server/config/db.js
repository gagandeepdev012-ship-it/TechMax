import mongoose from 'mongoose';
import ensureAdmin from '../utils/ensureAdmin.js';
export default async () => {
  let uri = process.env.MONGO_URI;
  const memory = !uri || uri === 'memory';
  if (memory) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    uri = (await MongoMemoryServer.create()).getUri();
    console.log('Using temporary in-memory MongoDB (data resets on restart)');
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
  if (memory) await ensureAdmin();
};
