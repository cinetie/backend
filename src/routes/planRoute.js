import {Router} from 'express';
import planController from '../controllers/planController';

const router = new Router();

router.get('/',planController.getAllPlans);
router.get('/:id',planController.getParticularPlan);
router.post('/new',planController.addPlan);
router.delete('/:id',planController.deleteAplan);
router.put('/:id',planController.updatePlan);

export default router