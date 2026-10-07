import mongoose from 'mongoose';
const s = new mongoose.Schema({
  queryId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Web Development', 'Cyber Security', 'Machine Learning', 'Data Science', 'Computer Operator'] },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  response: { type: String, default: '' },
}, { timestamps: true });
s.pre('validate', function (next) { if (!this.queryId) this.queryId = 'TMQ-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase(); next(); });
export default mongoose.model('Query', s);
