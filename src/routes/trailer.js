import { Router } from 'express';
import controller from '../controllers/trailer';
import access from '../middlewares/access';
import * as validation from '../middlewares/validation/trailer';

const router = new Router();

router.post('/new', access.isProducer, validation.addTrailer, controller.createNewTrailer);
router.get('/sort/video', controller.getAllTrailersPerVideo);
router.get('/particular', controller.getParticularTrailerController);
router.get('/all', access.isAdmin, controller.getAllTrailerController);
router.put('/update', access.isProducer, controller.updateParticularTrailerController);
router.delete('/delete', access.isProducer, controller.deleteParticularTrailerController);

export default router;
