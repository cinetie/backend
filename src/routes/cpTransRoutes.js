//Routes  for Content providers transactions
import { Router } from 'express';
import controller from '../controllers/cpTransController';

const router = new Router();

router.get('/all',controller.getAllTransactions);
router.get('/',controller.getAllTransById);
router.get('/stats',controller.loadStats);
router.put('/checkout',controller.checkout);

export default router;