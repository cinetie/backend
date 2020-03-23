import { Router } from 'express';
import planController from '../controllers/plan';
import * as validation from '../middlewares/validation/plan';
import access from '../middlewares/access';

const router = new Router();

router.get('/', planController.getAllPlans);
router.get('/:id', planController.getParticularPlan);
router.post('/new', access.isAdmin, validation.addPlan, planController.addPlan);
router.delete('/:id', access.isAdmin, planController.deleteAplan);
router.put('/:id', access.isAdmin, planController.updatePlan);

export default router;
