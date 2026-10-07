import 'dotenv/config';
import mongoose from 'mongoose';
import ensureAdmin from './ensureAdmin.js';
await mongoose.connect(process.env.MONGO_URI);
await ensureAdmin(); process.exit();
