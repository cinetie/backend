import { Router } from 'express';
import sales from '../controllers/sales';
import access from '../middlewares/access';

const router = Router();
router.get('/all', access.isAdmin, sales.getSales);
export default router;
