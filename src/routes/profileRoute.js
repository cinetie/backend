import { Router } from 'express';
import profileController from '../controllers/profileController';
import validator from '../validators/profileValidator'

const router = new Router();

router.post('/new', validator.profile, profileController.addProfile);
router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.put('/:id', validator.profile, profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

export default router;