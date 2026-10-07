import User from '../models/User.js';
import { sign, safe } from '../utils/token.js';
const fail = (m, status = 400) => Object.assign(new Error(m), { status });
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !password || password.length < 6) throw fail('Name, valid email and 6+ char password required');
    if (await User.findOne({ email })) throw fail('Email already registered', 409);
    const u = await User.create({ name, email, password });
    res.status(201).json({ token: sign(u._id), user: safe(u) });
  } catch (e) { next(e); }
};
export const login = async (req, res, next) => {
  try {
    const u = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+password');
    if (!u || !(await u.matches(req.body.password || ''))) throw fail('Invalid email or password', 401);
    res.json({ token: sign(u._id), user: safe(u) });
  } catch (e) { next(e); }
};
