import Query from '../models/Query.js';
const fail = (m, status = 400) => Object.assign(new Error(m), { status });
const build = (q, own) => {
  const f = own ? { user: own } : {};
  ['status', 'category', 'priority'].forEach((k) => { if (q[k]) f[k] = q[k]; });
  if (q.search) { const r = new RegExp(q.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); f.$or = [{ title: r }, { queryId: r }]; }
  return f;
};
const list = (own) => async (req, res, next) => {
  try {
    const page = +req.query.page || 1, limit = 9, f = build(req.query, own && req.user.role !== 'admin' ? req.user._id : null);
    const [items, total] = await Promise.all([Query.find(f).populate('user', 'name email').sort('-createdAt').skip((page - 1) * limit).limit(limit), Query.countDocuments(f)]);
    const stats = {};
    if (!own) for (const s of ['Pending', 'In Progress', 'Resolved']) stats[s] = await Query.countDocuments({ status: s });
    res.json({ items, total, pages: Math.ceil(total / limit), stats });
  } catch (e) { next(e); }
};
export const myQueries = list(true);
export const adminQueries = list(false);
export const create = async (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || !description || !category) throw fail('Title, category and description are required');
    res.status(201).json(await Query.create({ title, description, category, priority, user: req.user._id }));
  } catch (e) { next(e); }
};
const find = async (req) => {
  const q = await Query.findById(req.params.id).populate('user', 'name email');
  if (!q) throw fail('Query not found', 404);
  if (req.user.role !== 'admin' && String(q.user._id) !== String(req.user._id)) throw fail('Forbidden', 403);
  return q;
};
export const getOne = async (req, res, next) => { try { res.json(await find(req)); } catch (e) { next(e); } };
export const update = async (req, res, next) => {
  try { const q = await find(req); if (req.body.status) q.status = req.body.status; await q.save(); res.json(q); } catch (e) { next(e); }
};
export const reply = async (req, res, next) => {
  try {
    const q = await find(req);
    if (!req.body.response?.trim()) throw fail('Reply cannot be empty');
    q.response = req.body.response; if (q.status === 'Pending') q.status = 'In Progress';
    await q.save(); res.json(q);
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => { try { await (await find(req)).deleteOne(); res.json({ message: 'Deleted' }); } catch (e) { next(e); } };
