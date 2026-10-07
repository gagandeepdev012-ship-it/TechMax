import User from '../models/User.js';
export default async function ensureAdmin() {
  if (await User.findOne({ email: 'admin@techmax.com' })) return;
  await User.create({ name: 'TechMax Admin', email: 'admin@techmax.com', password: 'Admin@123', role: 'admin' });
  console.log('Admin ready: admin@techmax.com / Admin@123');
}
