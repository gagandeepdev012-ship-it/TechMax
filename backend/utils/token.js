import jwt from 'jsonwebtoken';
export const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
export const safe = (u) => ({ _id: u._id, name: u.name, email: u.email, role: u.role });
