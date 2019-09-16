import { Router } from 'express';
import profileController from '../controllers/profileController';

const router = new Router();

router.post('/new',profileController.addProfile);
router.get('/',profileController.getAllProfiles);
router.get('/:id',profileController.getProfile);
router.put('/:id',profileController.updateProfile);
router.delete('/:id',profileController.deleteProfile);
export default router;