import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { adminQueries } from '../controllers/queries.js';
const r = Router(); r.get('/queries', protect, adminOnly, adminQueries); export default r;
