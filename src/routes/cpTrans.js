// Routes  for Content providers transactions
import { Router } from 'express';
import controller from '../controllers/cpTrans';
import access from '../middlewares/access';

const router = new Router();

router.get('/all', access.isAdmin, controller.getAllTransactions);
router.get('/', access.isProducer, controller.getAllTransById);
// router.get('/admin',access.isAdmin,controller.getAllTransById);
router.get('/stats', controller.loadStats);
router.put('/checkout', controller.checkout);
router.put('/approve', access.isAdmin, controller.patchNonApprovedTrans);

export default router;
