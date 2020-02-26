import { Router } from 'express';
import controller from '../controllers/trailerController';
import access from '../middlewares/access';

const router = new Router();

router.post('/new', access.isProducer, controller.createNewTrailer);
router.get('/sort/video', controller.getAllTrailersPerVideo);
router.get('/particular', controller.getParticularTrailerController);
router.get('/all', access.isAdmin, controller.getAllTrailerController);
router.put('/update', access.isProducer, controller.updateParticularTrailerController);
router.delete('/delete', access.isProducer, controller.deleteParticularTrailerController);

export default router;
