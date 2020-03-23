import { Router } from 'express';
import profileController from '../controllers/profile';
import * as validation from '../middlewares/validation/profile';

const router = new Router();

router.post('/new', validation.addProfile, profileController.addProfile);
router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

export default router;
