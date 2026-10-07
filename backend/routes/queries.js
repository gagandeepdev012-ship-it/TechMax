import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import * as c from '../controllers/queries.js';
const r = Router(); r.use(protect);
r.route('/').post(c.create).get(c.myQueries);
r.route('/:id').get(c.getOne).put(adminOnly, c.update).delete(adminOnly, c.remove);
r.post('/:id/reply', adminOnly, c.reply);
export default r;
