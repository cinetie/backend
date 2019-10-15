import {Router} from 'express';
import planController from '../controllers/planController';
import validation from '../middlewares/validators/planValidation';
import access from '../middlewares/access';
const router = new Router();

router.get('/',planController.getAllPlans);
router.get('/:id',planController.getParticularPlan);
router.post('/new',access.isAdmin,validation.plan,planController.addPlan);
router.delete('/:id',access.isAdmin,planController.deleteAplan);
router.put('/:id',access.isAdmin,validation.updatePlan,planController.updatePlan);

export default router;