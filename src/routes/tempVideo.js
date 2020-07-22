import { Router } from 'express';
import controllers from '../controllers/tempVideo';
import access from '../middlewares/access';
import { addVideo } from '../middlewares/validation/video';

const router = new Router();
router.get('/all', access.isAdmin, controllers.getAllVideosController);
router.get('/', access.isAdmin, controllers.getParticularVideoController);
router.get('/signed-urls', access.isProducer, controllers.getSignedUrlTempVideos);
router.delete('/', access.isAdmin, controllers.deleteParticularVideoController);
router.post('/new', access.isProducer, addVideo, controllers.createVideoController);
router.put('/update', access.isAdmin, controllers.updateParticularVideoController);

export default router;
