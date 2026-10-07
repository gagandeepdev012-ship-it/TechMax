import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const s = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: { createdAt: true, updatedAt: false } });
s.pre('save', async function (next) { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10); next(); });
s.methods.matches = function (p) { return bcrypt.compare(p, this.password); };
export default mongoose.model('User', s);
