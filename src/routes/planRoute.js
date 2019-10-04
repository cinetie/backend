import {Router} from 'express';
import planController from '../controllers/planController';
import validation from '../middlewares/validators/planValidation';
const router = new Router();

router.get('/',planController.getAllPlans);
router.get('/:id',planController.getParticularPlan);
router.post('/new',validation.plan,planController.addPlan);
router.delete('/:id',planController.deleteAplan);
router.put('/:id',validation.updatePlan,planController.updatePlan);

export default router;